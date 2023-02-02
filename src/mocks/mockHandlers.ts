import { initHandlers } from "@coca-cola/kos-test-utils";
import { mockIngredients } from "./mockIngredients";
const handlers = {
  ...mockIngredients,
};

// Set this to true to force mocking if there is no running backend.
initHandlers(handlers, true);

// starts random availability update at an interval of every 10 seconds
// kosRandomAvailability({interval: 1000});
