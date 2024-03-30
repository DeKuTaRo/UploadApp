import React, { useEffect, useState, useRef } from "react";

import { Input, Box, Avatar, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import AvatarDefault from "../../images/avatar.png";
const ImageUpload = ({ onImageUpload }) => {
  const imageRef = useRef(null);

  const handleImageChange = (e) => {
    const image = e.target.files;
    onImageUpload(image);
  };

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  const AvatarDefaulturl = AvatarDefault;

  return (
    <>
      <input
        type="file"
        ref={imageRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
        name="mainImage"
        accept="image/*,"
        multiple
      />
      <Stack direction="row" sx={{ position: "relative", width: "100px", height: "100px" }}>
        <Avatar
          alt=""
          src={AvatarDefaulturl}
          variant="rounded"
          sx={{ width: "100%", height: "100%" }}
          onClick={handleImageUpload}
        />
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            backgroundColor: "gray",
            textAlign: "center",
          }}>
          <FontAwesomeIcon icon={faCameraRetro} />
        </Box>
      </Stack>
    </>
  );
};

export default ImageUpload;
