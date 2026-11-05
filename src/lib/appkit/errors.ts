import { getErrorCode, InputError } from "@circle-fin/app-kit";

import type { FxToken } from "@/lib/fx";

// App Kit raises INPUT_UNSUPPORTED_ROUTE when the swap service has no route
// for a token pair (e.g. EURC → USDC on Arc Testnet today). Checking the SDK
// error instead of hardcoding a direction means a route works as soon as
// Circle ships it.
export function isUnsupportedRouteError(err: unknown): boolean {
  return getErrorCode(err) === InputError.UNSUPPORTED_ROUTE.code;
}

export function unsupportedSwapRouteMessage(from: FxToken, to: FxToken): string {
  return `${from} → ${to} swaps are not available on Arc Testnet yet.`;
}
