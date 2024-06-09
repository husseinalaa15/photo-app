import { collection,  getDocs, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import {  useSelector } from "react-redux";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";


const FavoritesLanding = () => {
    const user = useSelector((state: any) => state.auth);
    const [favs,setFavs] = useState<any>()

    useEffect(() => {
       fetchFavorites()
    }, [favs]);
    const fetchFavorites  = async () =>{
        if(user.id){

            const q = query(collection(db, 'favorites'), where('userid', '==', user.id));
    const querySnapshot = await getDocs(q);
    const favorites: any[] = [];
    querySnapshot.forEach((doc) => {
      favorites.push(doc.data());
    });
    setFavs(favorites)
    return favorites;

        }
    }

    const renderFavs = () => {
        if( favs?.length > 0 && user.id){
            return (

            <ImageList sx={{ width: "100%" }} variant="masonry" cols={4} gap={8}>
            {favs.map((image: any) => (
              <ImageListItem key={image.item} sx={{ position: "relative" }}>
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
                    // onClick={() => addToFavoritesHandler(image)}
                  >
                    Add to Favorites
                  </Button>
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
            )
        }
        return 'No Favs '
    }
    return (
        <div>
            {renderFavs()}
        </div>
    )
}

export default FavoritesLanding