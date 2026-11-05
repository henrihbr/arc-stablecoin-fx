import assert from "node:assert/strict";
import test from "node:test";

import { InputError, KitError } from "@circle-fin/app-kit";

import { isUnsupportedRouteError, unsupportedSwapRouteMessage } from "./errors";

test("App Kit's unsupported route error is detected", () => {
  const err = new KitError({
    ...InputError.UNSUPPORTED_ROUTE,
    recoverability: "FATAL",
    message: "Swap estimate failed: Route or resource not found",
  });
  assert.equal(isUnsupportedRouteError(err), true);
});

test("other errors are not treated as an unsupported route", () => {
  const err = new KitError({
    ...InputError.INVALID_AMOUNT,
    recoverability: "FATAL",
    message: "Amount must be greater than zero",
  });
  assert.equal(isUnsupportedRouteError(err), false);
  assert.equal(isUnsupportedRouteError(new Error("INPUT_UNSUPPORTED_ROUTE")), false);
  assert.equal(isUnsupportedRouteError("boom"), false);
});

test("unsupported route message explains the unavailable direction", () => {
  assert.match(unsupportedSwapRouteMessage("EURC", "USDC"), /EURC .* USDC/);
  assert.match(unsupportedSwapRouteMessage("EURC", "USDC"), /not available/i);
});
