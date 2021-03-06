import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

const Button = (
  { onClick, onKeyDown, children, text, size, color, variant, ...other },
  ref
) => {
  const classes = useStyles();

  return (
    <MuiButton
      onKeyDown={onKeyDown}
      ref={ref}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "green"}
      onClick={onClick}
      {...children}
      classes={{ root: classes.root, label: classes.label }}
    >
      {children}
    </MuiButton>
  );
};

const forwardBRef = React.forwardRef(Button);

export { forwardBRef as Button };
