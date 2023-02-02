import { createHttpResponse } from "@coca-cola/kos-test-utils";

export const dispenserData = {
  name: "Demo Dispenser",
};

export const mockIngredients = {
  "/api/dispenser": (requestId: string) => {
    const body = dispenserData;
    const response = createHttpResponse({
      body,
      headers: { "response-id": requestId },
    });
    return response;
  },
};
