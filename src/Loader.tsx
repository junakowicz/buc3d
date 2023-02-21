import { Html, useProgress } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import React, { useState } from "react";
import { useCallback } from "react";
import { AppContext } from "./App";
import { useThreeLoader } from "./useThreeLoader";
import { useEffect, useReducer } from "react";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "Set":
      return action.payload;
    case "Increment":
      return state + 1;
    default:
      return state;
  }
};

export function Loader({ children }: any) {
  //   const { progress } = useProgress();
  const appContext: any = React.useContext(AppContext);

  //   const [totalPercentDelayed, dispatch] = useReducer(reducer, 0);

  //   console.log("progress", progress);
  const { totalPercent, hasError } = useThreeLoader();
  const [int, setInt] = useState<any>(null);
  const [totalPercentDelayed, setTotalPercentDelayed] = useState<any>(null);

  console.log("totalPercentDelayed", totalPercentDelayed);

  //   useEffect(() => {
  //     const int = setInterval(() => {
  //       dispatch({ type: "Increment" });
  //     }, 300);
  //     setInt(int);
  //     // return () => clearInterval(int);
  //   }, []);

  useEffect(() => {
    // setTotalPercentDelayed(totalPercent - 4);
    // @ts-ignore
    //   if ((totalPercent as any) !== NaN) {
    //     dispatch({ type: "Set", payload: totalPercent - 14 });
    //   }

    setTotalPercentDelayed(totalPercent);
  }, [totalPercent]);

  console.log("totalPercent", totalPercent);
  if (totalPercentDelayed >= 100) {
    // clearInterval(int);
    // return <>{children}</>;
    return null;
  }

  //   return null;

  const percentToDisplay = Math.round(
    // @ts-ignore
    totalPercentDelayed === NaN ? 0 : totalPercentDelayed
  );
  return (
    <div
      style={{
        background: "transparent",
        color: "white",
        width: "100vw",
        height: "100vh",
        transform: "none",
      }}
    >
      <div
        style={{
          color: "white",
          /* margin-left: auto; */
          /* margin-right: auto; */
          textAlign: "center",
          width: "200px",
          position: "absolute",
          left: "calc(50% - 100px)",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "Foregen",
        }}
      >
        {" "}
        <img src="/images/pn.png" style={{ width: "200px" }} />
        <p style={{ paddingLeft: "25px" }}>{percentToDisplay} % loaded </p>
      </div>
    </div>
    // <Html
    //   style={{
    //     background: "black",
    //     color: "white",
    //     width: "100vw",
    //     height: "100vh",
    //     transform: "none",
    //   }}
    // >
    //   {totalPercent} % loaded
    // </Html>
  );
}
