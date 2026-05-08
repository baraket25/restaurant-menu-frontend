import { useState } from 'react'
import { getCategories } from '../../api/menu'
import { createCategory, updateCategory, deleteCategory } from '../../api/admin'
import useFetch     from '../../hooks/useFetch'
import AdminLayout  from '../../components/admin/AdminLayout'
import Modal        from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Spinner      from '../../components/ui/Spinner'
import toast        from 'react-hot-toast'
import { Plus, Pencil, Trash2, Tag } from 'lucide-react'

const Categories = () => {
  const { data: categories, loading, setData } = useFetch(getCategories)
  const [modalOpen, setModalOpen]   = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [name, setName]             = useState('')
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState(false)

  const openCreate = () => { setEditTarget(null); setName(''); setModalOpen(true) }
  const openEdit   = (cat) => { setEditTarget(cat); setName(cat.name); setModalOpen(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    try {
      if (editTarget) {
        const res = await updateCategory(editTarget._id, { name })
        setData((prev) => prev.map((c) => c._id === editTarget._id ? res.data.data : c))
        toast.success('Category updated')
      } else {
        const res = await createCategory({ name })
        setData((prev) => [...(prev || []), res.data.data])
        toast.success('Category created')
      }
      setModalOpen(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteCategory(deleteTarget._id)
      setData((prev) => prev.filter((c) => c._id !== deleteTarget._id))
      toast.success('Category deleted')
      setDeleteTarget(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Categories</h1>
          <p className="text-stone-500 text-sm mt-1">{categories?.length || 0} total</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Category
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : !categories?.length ? (
        <div className="card p-16 flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-stone-100 rounded-full"><Tag size={28} className="text-stone-400" /></div>
          <p className="text-stone-500">No categories yet. Create your first one.</p>
          <button onClick={openCreate} className="btn-primary">Add Category</button>
        </div>
      ) : (
        <div className="card divide-y divide-stone-100">
          {categories.map((cat) => (
            <div key={cat._id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-50 rounded-lg">
                  <Tag size={16} className="text-brand-600" />
                </div>
                <div>
                  <p className="font-medium text-stone-800">{cat.name}</p>
                  <p className="text-xs text-stone-400">{cat.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(cat)}
                  className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                  <Pencil size={16} />
                </button>
                <button onClick={() => setDeleteTarget(cat)}
                  className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Category' : 'New Category'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Category Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="input" placeholder="e.g. Main Dishes" required autoFocus />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {saving ? <><Spinner size="sm" /> Saving...</> : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Category"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </AdminLayout>
  )
}

export default Categories
