import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import Controls from "../controls/Controls";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

const Confirm = ({ children, onAccept, onDecline, visible }) => {
  const useStyles = makeStyles((theme) => ({
    dialog: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
    dialogTitle: {
      textAlign: "center",
    },
    dialogContent: {
      textAlign: "center",
    },
    dialogAction: {
      justifyContent: "center",
    },
    titleIcon: {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
        cursor: "default",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "8rem",
      },
    },
  }));
  const classes = useStyles();
  return (
    <Dialog open={visible} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">confirmDialog title</Typography>
        <Typography variant="subtitle2">confirmDialog subTitle</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button text="No" color="default" onClick={() => onDecline} />
        <Controls.Button text="Yes" color="secondary" onClick={onAccept} />
      </DialogActions>
    </Dialog>
  );
};

export { Confirm };
