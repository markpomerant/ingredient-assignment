import "./App.css";
import { Registry } from "./registration";
import {
  ErrorBoundaryWithFallback,
  initKosProvider,
  KosModelCollectionProvider,
  LoadingMessage,
} from "@coca-cola/kos-ui-components";
import { KosLog } from "@coca-cola/kos-ui-core";
import React, { Suspense } from "react";
import { IngredientContainerView } from "./components/ingredient-container";

KosLog.setLevel("DEBUG");

const { KosCoreContextProvider } = initKosProvider(Registry);

function App() {
  return (
    <ErrorBoundaryWithFallback>
      <Suspense fallback={<LoadingMessage></LoadingMessage>}>
        <KosCoreContextProvider>
          <KosModelCollectionProvider>
            <IngredientContainerView></IngredientContainerView>
          </KosModelCollectionProvider>
        </KosCoreContextProvider>
      </Suspense>
    </ErrorBoundaryWithFallback>
  );
}

export default App;
