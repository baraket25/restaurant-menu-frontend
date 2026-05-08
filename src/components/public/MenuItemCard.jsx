import { formatPrice } from '../../utils/helpers'
import { Star } from 'lucide-react'

const MenuItemCard = ({ item, onClick }) => (
  <div
    onClick={() => onClick(item)}
    className="card cursor-pointer group hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in"
  >
    {/* Image */}
    <div className="relative h-48 bg-stone-100 overflow-hidden">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
      )}
      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        {item.featured && (
          <span className="flex items-center gap-1 bg-brand-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            <Star size={10} fill="white" /> Featured
          </span>
        )}
        {!item.available && (
          <span className="bg-stone-800/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Unavailable
          </span>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-stone-800 group-hover:text-brand-600 transition-colors leading-tight">
          {item.name}
        </h3>
        <span className="font-semibold text-brand-600 whitespace-nowrap">
          {formatPrice(item.price)}
        </span>
      </div>
      {item.description && (
        <p className="text-stone-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  </div>
)

export default MenuItemCard
