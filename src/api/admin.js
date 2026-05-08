import api from './axios'

// ── Auth ──────────────────────────────────────────────────
export const login = (data) => api.post('/auth/login', data)
export const getMe = ()     => api.get('/auth/me')

// ── Categories ────────────────────────────────────────────
export const createCategory = (data) => api.post('/categories', data)
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

// ── Items ─────────────────────────────────────────────────
export const createItem = (formData) =>
  api.post('/items', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const updateItem = (id, formData) =>
  api.put(`/items/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const toggleItem  = (id, field) => api.patch(`/items/${id}/toggle`, { field })
export const deleteItem  = (id) => api.delete(`/items/${id}`)

// ── Settings ──────────────────────────────────────────────
export const updateSettings = (data) => api.put('/settings', data)
