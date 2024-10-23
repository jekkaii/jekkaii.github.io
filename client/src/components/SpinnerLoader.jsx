/* eslint-disable no-unused-vars */
import React from "react";
import preloader from "../components/resources/preloader-logov2.svg"; // Update the path to your logo image

export default function SpinnerLoader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Slightly transparent white background
        zIndex: 9999, // Ensure it covers other content
      }}
    >
      <div className="text-center">
        <img className="mw-100" src={preloader} alt="preloader-logo" />
        <h4 className="fw-normal">Loading...</h4>
      </div>
    </div>
  );
}
