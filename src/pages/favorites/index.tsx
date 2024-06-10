import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import { useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";

const FavoritesLanding = () => {
  const user = useSelector((state: any) => state.auth);
  const [favs, setFavs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [deletedSuccessfully, setDeletedSuccessfully] =
    useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    fetchFavorites();
  }, []);
  const fetchFavorites = async () => {
    if (user.id) {
      setLoading(true);

      const q = query(
        collection(db, "favorites"),
        where("userid", "==", user.id)
      );
      const querySnapshot = await getDocs(q);
      const favorites: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data && data.item) {
          // Store the document ID along with the data
          favorites.push({ docId: doc.id, ...data });
        }
      });
      setFavs(favorites);
      setLoading(false);
      return favorites;
    } else {
      navigate("/login");
    }
  };

  const removeFromFavs = async (image: any) => {
    if (!image.item) {
      return;
    }
    try {
      setLoading(true);

      const favToDelete = favs.find((fav: any) => fav.item === image.item);
      if (!favToDelete) {
        console.error("No favorite found with the given item URL:", image.item);
        return;
      }
      await deleteDoc(doc(db, "favorites", favToDelete.docId));
      setFavs((prevFavs: any) =>
        prevFavs.filter((fav: any) => fav.item !== image.item)
      );
      setLoading(false);
      setDeletedSuccessfully(true);
    } catch (error) {
      setDeletedSuccessfully(false);
    }
  };

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

  const renderFavs = () => {
    if (favs?.length > 0 && user.id) {
      return (
        <ImageList sx={{ width: "100%" }} variant="masonry" cols={getColumns()} gap={8}>
          {favs.map((image: any, i: number) => (
            <ImageListItem key={image.docId} sx={{ position: "relative" }}>
              <Box
                component="img"
                srcSet={`${image.item}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${image.item}`}
                alt={image.item}
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
                  onClick={() => removeFromFavs(image)}
                >
                  Remove from Favorites
                </Button>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      );
    } else {
      return "No Favs ";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {deletedSuccessfully && (
        <Dialog
          open={deletedSuccessfully}
          onClose={() => setDeletedSuccessfully(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            id="alert-dialog-content"
            sx={{ backgroundColor: "#40A578", color: "white" }}
          >
            Image Deleted successfully
          </DialogContent>

          <DialogActions sx={{ backgroundColor: "#40A578" }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => setDeletedSuccessfully(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {loading && <CircularProgress size={50} color="secondary" />}

      {renderFavs()}
    </Box>
  );
};

export default FavoritesLanding;
