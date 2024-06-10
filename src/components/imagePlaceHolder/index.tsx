import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Placeholder from "./PlaceHolder";

const ImageWithPlaceholder = ({ src, alt }: { src: string, alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
    img.onerror = () => {
      setLoaded(true); 
    };
    return () => {
        img.onload = null;
        img.onerror = null;
      };
  }, [src]);

  return (
    <Box sx={{ width: "100%", height: "auto", position: "relative" }}>
      {!loaded && <Placeholder />}
      {loaded && (
        <Box
          component="img"
          src={imageSrc}
          alt={alt}
          loading="lazy"
          sx={{
            width: "100%",
            height: "auto",
            display: loaded ? "block" : "none",
          }}
        />
      )}
    </Box>
  );
};

export default ImageWithPlaceholder;
