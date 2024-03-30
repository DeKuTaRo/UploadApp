import React, { useEffect, useState, useRef } from "react";

import { Input, Box, Avatar, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import AvatarDefault from "../../images/avatar.png";
const VideoUpload = ({ onVideoUpload }) => {
  const videoRef = useRef(null);

  const handleVideoChange = (e) => {
    const video = e.target.files;
    onVideoUpload(video);
  };

  const handleVideoUpload = () => {
    videoRef.current.click();
  };

  const AvatarDefaulturl = AvatarDefault;

  return (
    <>
      <input
        type="file"
        ref={videoRef}
        style={{ display: "none" }}
        onChange={handleVideoChange}
        name="mainImage"
        accept="video/*"
        multiple
      />
      <Stack direction="row" sx={{ position: "relative", width: "100px", height: "100px" }}>
        <Avatar
          alt=""
          src={AvatarDefaulturl}
          variant="rounded"
          sx={{ width: "100%", height: "100%" }}
          onClick={handleVideoUpload}
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

export default VideoUpload;
