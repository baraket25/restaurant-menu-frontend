import { useState, useEffect } from 'react'
import { ImagePlus } from 'lucide-react'
import Spinner from '../ui/Spinner'

const ItemForm = ({ initial, categories, onSubmit, loading }) => {
  const [form, setForm] = useState({
    name:        '',
    description: '',
    price:       '',
    categoryId:  '',
    featured:    false,
    available:   true,
  })
  const [imageFile, setImageFile]       = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (initial) {
      setForm({
        name:        initial.name        || '',
        description: initial.description || '',
        price:       initial.price       || '',
        categoryId:  initial.categoryId?._id || initial.categoryId || '',
        featured:    initial.featured    ?? false,
        available:   initial.available   ?? true,
      })
      setImagePreview(initial.image || '')
    }
  }, [initial])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    if (imageFile) fd.append('image', imageFile)
    onSubmit(fd)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image upload */}
      <div>
        <label className="label">Item Image</label>
        <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-stone-200 rounded-xl cursor-pointer hover:border-brand-400 transition-colors overflow-hidden bg-stone-50">
          {imagePreview ? (
            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-stone-400">
              <ImagePlus size={28} />
              <span className="text-sm">Click to upload image</span>
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
        </label>
      </div>

      {/* Name */}
      <div>
        <label className="label">Item Name *</label>
        <input name="name" value={form.name} onChange={handleChange}
          className="input" placeholder="e.g. Grilled Salmon" required />
      </div>

      {/* Description */}
      <div>
        <label className="label">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange}
          className="input resize-none" rows={3} placeholder="Describe the dish..." />
      </div>

      {/* Price + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Price ($) *</label>
          <input name="price" type="number" step="0.01" min="0" value={form.price}
            onChange={handleChange} className="input" placeholder="0.00" required />
        </div>
        <div>
          <label className="label">Category *</label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange}
            className="input" required>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex gap-6">
        {[
          { name: 'featured', label: 'Featured dish' },
          { name: 'available', label: 'Available' },
        ].map(({ name, label }) => (
          <label key={name} className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" name={name} checked={form[name]}
                onChange={handleChange} className="sr-only peer" />
              <div className="w-10 h-6 bg-stone-200 peer-checked:bg-brand-600 rounded-full transition-colors" />
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-sm font-medium text-stone-700">{label}</span>
          </label>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
        {loading ? <><Spinner size="sm" /> Saving...</> : 'Save Item'}
      </button>
    </form>
  )
}

export default ItemForm
