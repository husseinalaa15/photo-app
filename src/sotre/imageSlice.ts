import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Image, ImagesByPage } from '../types/imgTypes';

interface ImageState {
    imagesByPage: ImagesByPage;
    favoriteImages: Image[], 
  }
  
  const initialState: ImageState = {
    imagesByPage: {},
    favoriteImages: [], 
  };

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImagesForPage: (state, action: PayloadAction<{ page: number; images: Image[] }>) => {
        const { page, images } = action.payload;
        state.imagesByPage[page] = images;
      },
      addToFavorites: (state, action: PayloadAction<Image>) => {
        state.favoriteImages.push(action.payload);
      },
  },
});

export const { setImagesForPage ,addToFavorites } = imageSlice.actions;

export default imageSlice.reducer;
