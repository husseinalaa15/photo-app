import { useEffect, useState } from "react";
import { getAllImages } from "../config/handleRequests/method";
import {
  Box,
  Button,
  
  Dialog,
  DialogActions,
  DialogContent,
  ImageList,
  ImageListItem,
} from "@mui/material";
import ActionBtns from "../components/actionbtns";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, setImagesForPage } from "../sotre/imageSlice";
import { Link } from "react-router-dom";
import {  db } from "../config/Firebase";
import { addDoc, collection } from "firebase/firestore";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nouser, setNoUser] = useState(false);

  const user = useSelector((state: any) => state.auth);
  const imagesByPage = useSelector((state: any) => state.images.imagesByPage);
//   const favoriteImages = useSelector(
//     (state: any) => state.images.favoriteImages
//   );

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("page", page);

        setLoading(true); // Set loading to true when fetching starts
        if (!imagesByPage[page]) {
          console.log("here");
          const response = await getAllImages(page);
          dispatch(setImagesForPage({ page, images: response }));
        }
        setLoading(false); // Set loading to false after fetching completes
      } catch (error) {
        console.error("Error fetching images:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, dispatch]);

  const addToFavoritesHandler = async (image: any) => {
    if (user.id) {
      dispatch(addToFavorites(image));
      await addDoc(collection(db, "favorites"), {
        userid:user.id,
        item:image.src.original
      }).then((response)=>console.log(response))
    } else {
      setNoUser(true);
    }
  };

  const displayImages = () => {
    if (loading) return <>Loading ..</>;
    if (imagesByPage[page]?.length > 0) {
      return (
        <ImageList sx={{ width: "100%" }} variant="masonry" cols={4} gap={8}>
          {imagesByPage[page].map((image: any) => (
            <ImageListItem key={image.id} sx={{ position: "relative" }}>
              <Box
                component="img"
                srcSet={`${image.src.tiny}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${image.src.original}`}
                alt={image.title}
                loading="lazy"
                sx={{ width: "100%", height: "auto" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addToFavoritesHandler(image)}
                >
                  Add to Favorites
                </Button>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      );
    }

    return "";
  };

  return (
    <Box sx={{ width: "100%" }}>
      {nouser && (
        <Dialog
          open={nouser}
          onClose={() => setNoUser(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent id="alert-dialog-content">
            You Must Login First , <Link to="/login">Login now</Link>
          </DialogContent>

          <DialogActions>
            <Button variant="text" color="secondary" onClick={() => setNoUser(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
      {displayImages()}
      {error && <div>Error fetching images</div>}

      <ActionBtns
        page={page}
        loading={loading}
        error={error}
        setPage={setPage}
      />
    </Box>
  );
};
export default HomePage;
