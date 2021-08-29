import React, { useRef } from "react";
import { useOutsideClick } from "./useOutsideClick";

export default function App() {
  const pRef = useRef();
  function outsidePClick() {
    console.log("click outside");
  }
  useOutsideClick(pRef, outsidePClick, true);

  return (
    <div>
      <p style={{ background: "red", color: "white" }} ref={pRef}>
        Click outside me, or click on an iframe, and check the log in the
        console
      </p>
      <hr />
      <h1>I'm an iframe</h1>
      <iframe title="example" src="https://example.com/" />
    </div>
  );
}
