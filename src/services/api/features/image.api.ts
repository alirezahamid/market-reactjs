import http from '../axios'

export const fetchImagesAPI = (limit: number) => {
    return http.get(`list?limit=${limit}`)
}