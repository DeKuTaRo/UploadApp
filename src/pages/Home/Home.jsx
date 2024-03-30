import React, { useState, useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Typography, InputLabel } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Avatar, Stack } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ImageUpload from "./ImageUpload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { storage, db } from "../../utils/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import VideoUpload from "./VideoUpload";

import AvatarDefault from "../../images/avatar.png";
import DownloadIcon from "@mui/icons-material/Download";
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === "dark" ? "#101010" : "grey.100"),
        color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "grey.800"),
        border: "1px solid",
        borderColor: (theme) => (theme.palette.mode === "dark" ? "grey.800" : "grey.300"),
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const MediaImage = ({ data, email, date, id, openPopup }) => {
  const AvatarDefaulturl = AvatarDefault;

  const [imageList, setImageList] = useState(data.imageList);
  const imageRef = useRef(null);

  const imageStorage = doc(db, email, id);

  const handleDeleteImage = async (index) => {
    const updatedList = [...imageList];
    updatedList.splice(index, 1);
    setImageList(updatedList);

    await updateDoc(imageStorage, {
      imageList: updatedList,
    });
  };

  const [addSelectedImage, setAddSelectedImage] = useState(null);
  const [addPreviewImage, setAddPreviewImage] = useState(null);
  const handleImageChange = (e) => {
    const imageUpload = e.target.files[0];

    setAddSelectedImage(imageUpload);
    setAddPreviewImage(URL.createObjectURL(imageUpload));
  };

  const handleImageUpload = () => {
    imageRef.current.click();
  };

  const handleAddImage = async () => {
    try {
      const storageRef = ref(storage, `${email}/${date}/images/${addSelectedImage.name}`);
      const snapshot = await uploadBytes(storageRef, addSelectedImage, {
        contentType: "image/jpeg",
      });
      const url = await getDownloadURL(snapshot.ref);
      const updatedImageList = [...imageList, url];
      setImageList((prev) => [...prev, url]);
      await updateDoc(imageStorage, {
        imageList: updatedImageList,
      });
      setAddSelectedImage(null);
      setAddPreviewImage(null);
    } catch (err) {
      console.log("error add more image ", err);
    }
  };

  return (
    <Grid container spacing={2}>
      {imageList.map((image, index) => (
        <Item key={index} sx={{ position: "relative" }}>
          <img
            src={image}
            alt={"image-" + index}
            style={{ width: "120px", height: "100px" }}
            onClick={() => openPopup(image)}
          />
          <IconButton
            onClick={() => handleDeleteImage(index)}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.25rem",
              zIndex: 1,
              backgroundColor: "gray",
            }}
            size="small">
            <CloseIcon />
          </IconButton>
        </Item>
      ))}
      <Item sx={{ position: "relative" }}>
        <input
          type="file"
          ref={imageRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          name="mainImage"
          accept="image/*,"
        />
        <img
          src={addPreviewImage ? addPreviewImage : AvatarDefaulturl}
          alt=""
          accept="image/*,"
          style={{ width: "120px", height: "100px" }}
          onClick={handleImageUpload}
        />
        {addSelectedImage && (
          <IconButton
            onClick={handleAddImage}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.25rem",
              zIndex: 1,
              backgroundColor: "gray",
            }}
            size="small">
            <DoneIcon />
          </IconButton>
        )}
      </Item>
    </Grid>
  );
};

const MediaVideo = ({ data, email, date, id }) => {
  const AvatarDefaulturl = AvatarDefault;

  const [videoList, setVideoList] = useState(data.videoList);

  const [addSelectedVideo, setAddSelectedVideo] = useState(null);
  const [addPreviewVideo, setAddPreviewVideo] = useState(null);

  const videoRef = useRef(null);
  const videoStorage = doc(db, email, id);

  const handleDeleteVideo = async (index) => {
    const updatedList = [...videoList];
    updatedList.splice(index, 1);
    setVideoList(updatedList);

    await updateDoc(videoStorage, {
      videoList: updatedList,
    });
  };

  const handleVideoChange = (e) => {
    const videoUpload = e.target.files[0];

    setAddSelectedVideo(videoUpload);
    setAddPreviewVideo(URL.createObjectURL(videoUpload));
    // setVideoList((prev) => [...prev, URL.createObjectURL(videoUpload)]);
  };

  const handleVideoUpload = () => {
    videoRef.current.click();
  };

  const handleAddVideo = async () => {
    try {
      const storageRef = ref(storage, `${email}/${date}/videos/${addSelectedVideo.name}`);
      const snapshot = await uploadBytes(storageRef, addSelectedVideo, {
        contentType: "video/mp4",
      });
      const url = await getDownloadURL(snapshot.ref);
      const updatedVideoList = [...videoList, url];
      setVideoList((prev) => [...prev, url]);
      await updateDoc(videoStorage, {
        videoList: updatedVideoList,
      });
      setAddSelectedVideo(null);
      setAddPreviewVideo(null);
    } catch (err) {
      console.log("error add more image ", err);
    }
  };

  return (
    <Grid container spacing={2}>
      {videoList.map((video, index) => (
        <Item key={index} sx={{ position: "relative" }}>
          <video width="200px" height="250px" controls onChange={() => handleDeleteVideo(index)}>
            <source src={video} type="video/mp4" />
          </video>
          <IconButton
            onClick={() => handleDeleteVideo(index)}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.25rem",
              zIndex: 1,
              backgroundColor: "gray",
            }}
            size="small">
            <CloseIcon />
          </IconButton>
        </Item>
      ))}
      {addPreviewVideo && (
        <Item sx={{ position: "relative" }}>
          <video width="200px" height="250px" controls onClick={handleVideoUpload}>
            <source src={addPreviewVideo} type="video/mp4" />
          </video>
          <IconButton
            onClick={handleAddVideo}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.25rem",
              zIndex: 1,
              backgroundColor: "gray",
            }}
            size="small">
            <DoneIcon />
          </IconButton>
        </Item>
      )}
      <Item>
        <input type="file" ref={videoRef} style={{ display: "none" }} onChange={handleVideoChange} accept="video/*" />
        <img
          src={AvatarDefaulturl}
          alt=""
          accept="image/*,"
          style={{ width: "100%", height: "100px" }}
          onClick={handleVideoUpload}
        />
      </Item>
    </Grid>
  );
};

function Home() {
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageSelected, setImageSelected] = useState(null);

  const [videoPreviews, setVideoPreviews] = useState([]);
  const [videoSelected, setVideoSelected] = useState(null);

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const collectionRef = collection(db, email);
      const snapshot = await getDocs(collectionRef);
      const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (imageList) => {
    let images = [];

    for (let i = 0; i < imageList.length; i++) {
      images.push(URL.createObjectURL(imageList[i]));
    }
    setImageSelected(imageList);
    setImagePreviews(images);
  };

  const handleVideoChange = (videoList) => {
    let videos = [];

    for (let i = 0; i < videoList.length; i++) {
      videos.push(URL.createObjectURL(videoList[i]));
    }
    setVideoSelected(videoList);
    setVideoPreviews(videos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // add image to firebase storage and get link

      let imageList = [];
      const imagesArray = Array.from(imageSelected);

      try {
        await Promise.all(
          imagesArray.map(async (file) => {
            const storageRef = ref(storage, `${email}/${date}/images/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file, {
              contentType: "image/jpeg",
            });
            const url = await getDownloadURL(snapshot.ref);
            imageList.push(url);
          })
        );
      } catch (error) {
        console.error("Error uploading images:", error);
      }

      // add image to firebase storage and get link

      // add video to firebase storage and get link

      let videoList = [];
      const videosArray = Array.from(videoSelected);

      try {
        await Promise.all(
          videosArray.map(async (file) => {
            const storageRef = ref(storage, `${email}/${date}/videos/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file, {
              contentType: "video/mp4",
            });
            const url = await getDownloadURL(snapshot.ref);
            videoList.push(url);
          })
        );
      } catch (error) {
        console.error("Error uploading videos:", error);
      }

      // add video to firebase storage and get link

      try {
        const textCollectionRef = collection(db, email);

        await addDoc(textCollectionRef, {
          videoList: videoList,
          imageList: imageList,
          desc: desc,
          date: date,
        });
        setDesc("");
        setDate("");
        setImageSelected(null);
        setImagePreviews([]);
        setVideoSelected(null);
        setVideoPreviews([]);
        // fetchData();
        console.log("Text data uploaded successfully");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } catch (err) {
      console.error("Error adding data:", err);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    auth
      .signOut()
      .then(() => {
        // Logout successful
        console.log("User signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };

  const handleClearImage = (index) => {
    const updatedList = [...imagePreviews];
    updatedList.splice(index, 1);
    setImagePreviews(updatedList);
  };
  const handleClearVideo = (index) => {
    const updatedList = [...videoPreviews];
    updatedList.splice(index, 1);
    setVideoPreviews(updatedList);
  };

  const [popupImage, setPopupImage] = useState("");
  const openPopup = (src) => {
    setPopupImage(src);
  };

  const closePopup = () => {
    setPopupImage("");
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = popupImage;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", background: "white" }}>
      <Button onClick={handleLogout}>Logout</Button>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ display: "flex" }}>
            <Box>
              <Typography>Hình ảnh</Typography>
              <ImageUpload onImageUpload={handleImageChange} />
            </Box>

            <Grid container spacing={1} sx={{ margin: "0 1rem" }}>
              {imagePreviews &&
                imagePreviews.map((img, i) => {
                  return (
                    <Grid item xs={6} sx={{ position: "relative" }} key={i}>
                      <img
                        className="preview"
                        src={img}
                        alt={"image-" + i}
                        key={i}
                        style={{ width: "100%", height: "100%" }}
                        onClick={() => openPopup(img)}
                      />
                      {img && (
                        <IconButton
                          onClick={() => handleClearImage(i)}
                          style={{
                            position: "absolute",
                            top: "0.75rem",
                            right: "0.25rem",
                            zIndex: 1,
                            backgroundColor: "gray",
                          }}
                          size="small">
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex" }}>
            <Box>
              <Typography>Video</Typography>
              <VideoUpload onVideoUpload={handleVideoChange} />
            </Box>
            <Grid container spacing={1} sx={{ margin: "0 1rem" }}>
              {videoPreviews &&
                videoPreviews.map((video, i) => {
                  return (
                    <Grid item xs={6} sx={{ position: "relative" }} key={i}>
                      <video width="200px" height="250px" controls>
                        <source src={video} type="video/mp4" />
                      </video>

                      {video && (
                        <IconButton
                          onClick={() => handleClearVideo(i)}
                          style={{
                            position: "absolute",
                            top: "0.75rem",
                            right: "6.25rem",
                            zIndex: 1,
                            backgroundColor: "gray",
                          }}
                          size="small">
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Ngày hôm đó"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              required
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <InputLabel htmlFor="desc">Ngày hôm đó diễn ra những gì</InputLabel>
            <TextareaAutosize
              id="desc"
              aria-label="empty textarea"
              placeholder="Empty"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              minRows={4}
              style={{ width: "100%", marginTop: "1rem" }}
            />
          </Grid>
        </Grid>
        <Button type="submit">Thêm</Button>
      </Box>
      {isLoading ? (
        <Typography align="center" gutterBottom>
          Images and videos are being loaded ...
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 350 }}>Hình ảnh</TableCell>
                <TableCell sx={{ width: 500 }}>Video</TableCell>
                <TableCell>Ngày đăng & Mô tả</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: 350,
                    }}>
                    <MediaImage data={row} email={email} date={row.date} id={row.id} openPopup={openPopup} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <MediaVideo data={row} email={email} date={row.date} id={row.id} />
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                    }}>
                    {row.date}
                    <Typography variant="body1" noWrap>
                      {row.desc}{" "}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {popupImage && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            background: "black",
            height: "100%",
            width: "100%",
            zIndex: 100,
          }}>
          <Typography
            style={{
              position: "absolute",
              top: 0,
              right: "1rem",
              fontSize: "2.5rem",
              fontWeight: "bolder",
              color: "white",
              cursor: "pointer",
              zIndex: 100,
            }}
            onClick={closePopup}>
            &times;
          </Typography>
          <Typography
            style={{
              position: "absolute",
              top: 0,
              right: "4rem",
              fontSize: "2.5rem",
              fontWeight: "bolder",
              color: "white",
              cursor: "pointer",
              zIndex: 100,
            }}
            onClick={downloadImage}>
            <DownloadIcon />
          </Typography>
          <img
            src={popupImage}
            alt=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "0.25rem solid white",
              borderRadius: "0.25rem",
              width: "500px",
              objectFit: "cover",
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Home;
