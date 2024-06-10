import axiosInstance from "../AxiosInstance"

export const getAllImages = (page:number) => {
    return axiosInstance.get(`/v1/curated?page=${page}&per_page=10`).then((response:any)=>{
        return response.data.photos
    }).catch((err)=>{
        console.error(err);
        throw err; 

    })
}