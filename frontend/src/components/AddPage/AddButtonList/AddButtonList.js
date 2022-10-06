import classes from "./AddButtonList.module.css";
import { NavLink } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BarcodeModal from "../BarcodeModal/BarcodeModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "420px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
  border: "none",
  outline: "none",
};

function AddButtonList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleState = (data) => setOpen(data);
  return (
    <div className={classes.container}>
      <div
        className={classes.icon}
        activeClassName={classes.activeicon}
        onClick={handleOpen}
      >
        <i className="fa-solid fa-barcode"></i>
        <div>바코드</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <i class="fa-solid fa-camera" style={{ marginRight: ".5rem" }}></i>
            바코드로 음식 검색
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <BarcodeModal
              handleState={() => {
                handleClose();
              }}
            />
          </Typography>
        </Box>
      </Modal>
      <NavLink
        to="/add/bundle"
        className={classes.icon}
        activeClassName={classes.activeicon}
        style={{ color: "var(--inner-text-color)" }}
      >
        <i className="fa-solid fa-file-import"></i>
        <div>계획 불러오기</div>
      </NavLink>
      <NavLink
        to="/add/custom"
        className={classes.icon}
        activeClassName={classes.activeicon}
        style={{ color: "var(--inner-text-color)" }}
      >
        <i className="fa-solid fa-folder-plus"></i>
        <div>항목 추가</div>
      </NavLink>
    </div>
  );
}

export default AddButtonList;
