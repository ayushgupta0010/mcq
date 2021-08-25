import React from "react";

const PageNotFound404 = () => (
  <div
    className='d-flex flex-column align-items-center justify-content-center text-light'
    style={{ height: "60vh" }}>
    <div>
      <h1
        className='d-inline-block align-top'
        style={{
          borderRight: "1px solid rgba(255, 255, 255, 0.3)",
          margin: "0px 20px 0px 0px",
          padding: "10px 23px 10px 0px",
          fontSize: "24px",
          fontWeight: "500",
        }}>
        404
      </h1>
      <div
        className='d-inline-block text-left align-middle'
        style={{ lineHeight: " 49px", height: "49px" }}>
        <h2
          className='font-weight-normal'
          style={{ fontSize: "14px", lineHeight: "inherit" }}>
          This page could not be found.
        </h2>
      </div>
    </div>
  </div>
);

export default PageNotFound404;
