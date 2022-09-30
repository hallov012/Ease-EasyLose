import classes from "./ListItem.module.css";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#afb4ff",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#afb4ff",
  },
}));

function ListItem({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <div className={classes.item_title}>{data.name}</div>
        <div className={classes.item_subtitle}>총 칼로리: 1300kcal</div>
      </div>
      <div className={classes.right}>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <HtmlTooltip
              TransitionComponent={Zoom}
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="top"
              title={
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      <b>탄수화물</b> <span>100g</span>
                    </div>
                    <div>
                      <b>단백질</b> <span>100g</span>
                    </div>
                    <div>
                      <b>지방</b> <span>100g</span>
                    </div>
                  </div>
                </React.Fragment>
              }
              color="primary"
              arrow
            >
              <i
                onClick={handleTooltipOpen}
                className="fa-regular fa-circle-question"
              ></i>
            </HtmlTooltip>
          </div>
        </ClickAwayListener>
        <div>
          <i class="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
