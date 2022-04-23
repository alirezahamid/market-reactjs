import { createSlice } from "@reduxjs/toolkit"

export const imagesSlice = createSlice({
    name: "images",
    initialState: {
        images: [],
        isLoading: false
    },
    reducers: {
        getImages: (state,action) => {
            state.isLoading = true
        },
        getImagesSuccess: (state, action) => {
            state.images = action.payload
            state.isLoading = false

        },
        getImagesFailure: (state) => {
            state.isLoading = false
        }
    }
})

export const { getImages, getImagesSuccess, getImagesFailure } = imagesSlice.actions

export default imagesSlice.reducer