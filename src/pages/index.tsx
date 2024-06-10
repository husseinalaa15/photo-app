import { useEffect, useState } from "react";
import { getAllImages } from "../config/handleRequests/method";
import {
  Box,
  Button,
  
  CircularProgress,
  
  Dialog,
  DialogActions,
  DialogContent,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ActionBtns from "../components/actionbtns";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, setImagesForPage } from "../sotre/imageSlice";
import { Link } from "react-router-dom";
import {  db } from "../config/Firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nouser, setNoUser] = useState(false);
  const [alreadyInFavorites, setAlreadyInFavorites] = useState(false);
  const [addeddSuccussfully, setAddedSuccessfully] = useState(false);

  const user = useSelector((state: any) => state.auth);
  const imagesByPage = useSelector((state: any) => state.images.imagesByPage);
//   const favoriteImages = useSelector(
//     (state: any) => state.images.favoriteImages
//   );

const theme = useTheme();
const isXs = useMediaQuery(theme.breakpoints.down('xs'));
const isSm = useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
const isMd = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
const isLg = useMediaQuery(theme.breakpoints.up('lg'));

const getColumns = () => {
  if (isXs) return 1;
  if (isSm) return 2;
  if (isMd) return 3;
  if (isLg) return 4;
  return 4;
};

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true); 
        if (!imagesByPage[page]) {
          const response = await getAllImages(page);
          dispatch(setImagesForPage({ page, images: response }));
        }
        setLoading(false); 
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchImages();
  }, [page,imagesByPage, dispatch]);

  const addToFavoritesHandler = async (image: any) => {
    if (user.id) {
      const favoritesQuery = query(collection(db, "favorites"), where("userid", "==", user.id), where("item", "==", image.src.original));
      const favoritesSnapshot = await getDocs(favoritesQuery);
      if (favoritesSnapshot.size > 0) {
        setAlreadyInFavorites(true);
        return;
      }

      dispatch(addToFavorites(image));
      await addDoc(collection(db, "favorites"), {
        userid:user.id,
        item:image.src.original
      }).then(()=>setAddedSuccessfully(true))
    } else {
      setNoUser(true);
    }
  };

  const displayImages = () => {
    if (imagesByPage[page]?.length > 0) {
      return (
        <ImageList sx={{ width: "100%" }} variant="masonry" cols={getColumns()} gap={8}>
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
    <Box sx={{ width: "100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
            {addeddSuccussfully && (
        <Dialog
          open={addeddSuccussfully}
          onClose={() => setAddedSuccessfully(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          
        >
          <DialogContent id="alert-dialog-content" sx={{backgroundColor:"#40A578",color:"white"}}>
           Image Added successfully
          </DialogContent>

          <DialogActions sx={{backgroundColor:"#40A578"}}>
            <Button variant="text" color="primary" onClick={() => setAddedSuccessfully(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
            {alreadyInFavorites && (
        <Dialog
          open={alreadyInFavorites}
          onClose={() => setAlreadyInFavorites(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent id="alert-dialog-content">
           Image Already Exists in Favorites
          </DialogContent>

          <DialogActions>
            <Button variant="text" color="secondary" onClick={() => setAlreadyInFavorites(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}
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
     {loading && <CircularProgress size={50} color="secondary" /> }
      {displayImages()}
      {error && (
        <Typography variant="h4" color={"secondary"} >
          Ops , Something went wrong Please try again later
        </Typography>
      )}

      {!loading && !error && (
        <ActionBtns
        page={page}
        loading={loading}
        error={error}
        setPage={setPage}
      />
      )}
    </Box>
  );
};
export default HomePage;
