import { Table, TableBody, TableCell, TableRow, TableHead } from "@mui/material";
import AvatarDefault from "../../images/avatar.png";
import React, { useState } from "react";
function Test() {
  const AvatarDefaulturl = AvatarDefault;
  const [popupImage, setPopupImage] = useState("");
  const openPopup = (src) => {
    setPopupImage(src);
  };

  const closePopup = () => {
    setPopupImage("");
  };
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "white",
      }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 350 }}>Hình ảnh</TableCell>
            <TableCell>Ngày đăng & Mô tả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                src={AvatarDefaulturl}
                alt=""
                accept="image/*,"
                style={{ width: "100px", height: "100px" }}
                onClick={() => openPopup(AvatarDefaulturl)}
              />
              <img
                src={AvatarDefaulturl}
                alt=""
                accept="image/*,"
                style={{ width: "100px", height: "100px" }}
                onClick={() => openPopup(AvatarDefaulturl)}
              />
              <img
                src={AvatarDefaulturl}
                alt=""
                accept="image/*,"
                style={{ width: "100px", height: "100px" }}
                onClick={() => openPopup(AvatarDefaulturl)}
              />
              <img
                src={AvatarDefaulturl}
                alt=""
                accept="image/*,"
                style={{ width: "100px", height: "100px" }}
                onClick={() => openPopup(AvatarDefaulturl)}
              />
            </TableCell>
            <TableCell>22/12/2022</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {popupImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            background: "black",
            height: "100%",
            width: "100%",
            zIndex: 100,
          }}>
          <span
            style={{
              position: "absolute",
              top: 0,
              right: "10px",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "white",
              cursor: "pointer",
              zIndex: 100,
            }}
            onClick={closePopup}>
            &times;
          </span>
          <img
            src={popupImage}
            alt=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "5px solid white",
              borderRadius: "5px",
              width: "750px",
              objectFit: "cover",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Test;
