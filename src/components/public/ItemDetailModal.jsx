import Modal from '../ui/Modal'
import { formatPrice } from '../../utils/helpers'
import { Star } from 'lucide-react'

const ItemDetailModal = ({ item, onClose }) => {
  if (!item) return null

  return (
    <Modal isOpen={!!item} onClose={onClose} title="" size="md">
      {/* Image */}
      {item.image && (
        <div className="h-56 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Badges */}
      <div className="flex gap-2 mb-3">
        {item.featured && (
          <span className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-medium px-2.5 py-1 rounded-full border border-brand-200">
            <Star size={10} className="fill-brand-600 text-brand-600" /> Featured dish
          </span>
        )}
        {!item.available && (
          <span className="bg-stone-100 text-stone-500 text-xs font-medium px-2.5 py-1 rounded-full">
            Currently unavailable
          </span>
        )}
      </div>

      <h2 className="font-display text-2xl font-semibold text-stone-800 mb-2">{item.name}</h2>

      {item.categoryId && (
        <p className="text-xs text-stone-400 uppercase tracking-widest mb-3">
          {item.categoryId.name}
        </p>
      )}

      {item.description && (
        <p className="text-stone-600 leading-relaxed mb-6">{item.description}</p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-stone-100">
        <span className="text-stone-500 text-sm">Price</span>
        <span className="font-display text-2xl font-semibold text-brand-600">
          {formatPrice(item.price)}
        </span>
      </div>
    </Modal>
  )
}

export default ItemDetailModal
