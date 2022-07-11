import React from "react";
import { TextField } from "@material-ui/core";
import { text } from "body-parser";

export default function Input(props) {
  const {
    name,
    label,
    value,
    type = "text",
    error = null,
    onChange,
    ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
