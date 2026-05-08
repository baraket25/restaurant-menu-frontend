import { useState } from 'react'
import { getCategories, getItems } from '../../api/menu'
import { createItem, updateItem, toggleItem, deleteItem } from '../../api/admin'
import useFetch      from '../../hooks/useFetch'
import AdminLayout   from '../../components/admin/AdminLayout'
import ItemForm      from '../../components/admin/ItemForm'
import Modal         from '../../components/ui/Modal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Badge         from '../../components/ui/Badge'
import Spinner       from '../../components/ui/Spinner'
import toast         from 'react-hot-toast'
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, UtensilsCrossed } from 'lucide-react'
import { formatPrice } from '../../utils/helpers'

const Items = () => {
  const { data: items,      loading,  setData }         = useFetch(getItems)
  const { data: categories, loading: catsLoading }      = useFetch(getCategories)
  const [modalOpen,    setModalOpen]    = useState(false)
  const [editTarget,   setEditTarget]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [saving,       setSaving]       = useState(false)
  const [deleting,     setDeleting]     = useState(false)

  const openCreate = () => { setEditTarget(null); setModalOpen(true) }
  const openEdit   = (item) => { setEditTarget(item); setModalOpen(true) }

  const handleSave = async (formData) => {
    setSaving(true)
    try {
      if (editTarget) {
        const res = await updateItem(editTarget._id, formData)
        setData((prev) => prev.map((i) => i._id === editTarget._id ? res.data.data : i))
        toast.success('Item updated')
      } else {
        const res = await createItem(formData)
        setData((prev) => [res.data.data, ...(prev || [])])
        toast.success('Item created')
      }
      setModalOpen(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (item, field) => {
    try {
      const res = await toggleItem(item._id, field)
      setData((prev) => prev.map((i) => i._id === item._id ? res.data.data : i))
    } catch {
      toast.error('Could not update')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await deleteItem(deleteTarget._id)
      setData((prev) => prev.filter((i) => i._id !== deleteTarget._id))
      toast.success('Item deleted')
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
          <h1 className="text-2xl font-bold text-stone-800">Menu Items</h1>
          <p className="text-stone-500 text-sm mt-1">{items?.length || 0} total</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* Table */}
      {loading || catsLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : !items?.length ? (
        <div className="card p-16 flex flex-col items-center text-center gap-4">
          <div className="p-4 bg-stone-100 rounded-full"><UtensilsCrossed size={28} className="text-stone-400" /></div>
          <p className="text-stone-500">No items yet. Add your first dish.</p>
          <button onClick={openCreate} className="btn-primary">Add Item</button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Item</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-stone-50 transition-colors">
                    {/* Item */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                          {item.image
                            ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center">🍽️</div>
                          }
                        </div>
                        <div>
                          <p className="font-medium text-stone-800 text-sm">{item.name}</p>
                          {item.description && (
                            <p className="text-stone-400 text-xs truncate max-w-[180px]">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-stone-600">{item.categoryId?.name || '—'}</span>
                    </td>
                    {/* Price */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-stone-800 text-sm">{formatPrice(item.price)}</span>
                    </td>
                    {/* Status badges */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {item.featured && <Badge variant="amber">Featured</Badge>}
                        <Badge variant={item.available ? 'green' : 'red'}>
                          {item.available ? 'Available' : 'Unavailable'}
                        </Badge>
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => handleToggle(item, 'featured')}
                          title="Toggle featured"
                          className={`p-2 rounded-lg transition-colors ${item.featured ? 'text-amber-500 bg-amber-50 hover:bg-amber-100' : 'text-stone-400 hover:bg-stone-100'}`}>
                          <Star size={15} className={item.featured ? 'fill-amber-500' : ''} />
                        </button>
                        <button onClick={() => handleToggle(item, 'available')}
                          title="Toggle availability"
                          className={`p-2 rounded-lg transition-colors ${item.available ? 'text-emerald-500 hover:bg-emerald-50' : 'text-stone-400 hover:bg-stone-100'}`}>
                          {item.available ? <Eye size={15} /> : <EyeOff size={15} />}
                        </button>
                        <button onClick={() => openEdit(item)}
                          className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => setDeleteTarget(item)}
                          className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editTarget ? 'Edit Item' : 'New Item'} size="lg">
        <ItemForm
          initial={editTarget}
          categories={categories || []}
          onSubmit={handleSave}
          loading={saving}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Item"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone.`}
      />
    </AdminLayout>
  )
}

export default Items
