import React from "react";
import { useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { AppContext } from "./App";

const TOTAL = 10;

export function useThreeLoader() {
  //   const [totalPercent, setTotalPercent] = useState(0);
  const appContext: any = React.useContext(AppContext);
  const [hasError, setHasError] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const [itemsLoaded, setItemsLoaded] = useState(0);

  const totalPercent = (itemsLoaded / itemsCount) * 100;
  appContext.setTotalPercent(totalPercent);
  //   const addItem = useCallback(() => {
  //     setItemsCount(itemsCount + 1);
  //     setTotalPercent((itemsCount + 1 / TOTAL) * 100);
  //   }, [itemsCount]);

  console.log("itemsCount-------------", itemsCount);

  THREE.DefaultLoadingManager.onStart = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
    setItemsLoaded(itemsLoaded);
    setItemsCount(itemsTotal);
  };

  THREE.DefaultLoadingManager.onLoad = function () {
    console.log("Loading Complete!");
    // addItem();
    // appContext.setTotalPercent(100);
    // setItemsLoaded(101);
    // setItemsCount(100);
  };

  THREE.DefaultLoadingManager.onProgress = function (
    url,
    itemsLoaded,
    itemsTotal
  ) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
    setItemsLoaded(itemsLoaded);
    setItemsCount(itemsTotal);
    // const percent = (itemsLoaded / itemsTotal) * 100;
  };

  THREE.DefaultLoadingManager.onError = function (url) {
    console.log("There was an error loading " + url);
    setHasError(true);
  };

  return { totalPercent, hasError };
}
