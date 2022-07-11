import React from "react";

const Spinner = ({ size }) => {
  return (
    <button style={spinnerStyle}>
      <Spinner animation="border" />
    </button>
  );
};

const spinnerStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

export { Spinner };
