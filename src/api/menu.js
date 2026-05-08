import api from './axios'

export const getCategories = () => api.get('/categories')
export const getItems      = (params) => api.get('/items', { params })
export const getItem       = (id) => api.get(`/items/${id}`)
export const getSettings   = () => api.get('/settings')
