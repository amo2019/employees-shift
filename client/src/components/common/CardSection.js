import React from "react";

const CardSection = (props) => {
  return <div style={(containerStyle, props.style)}>{props.children}</div>;
};

const containerStyle = {
  borderBottomWidth: 1,
  padding: 5,
  backgroundColor: "#fff",
  justifyContent: "flex-start",
  flexDirection: "row",
  borderColor: "#ddd",
  position: "relative",
};

export { CardSection };
