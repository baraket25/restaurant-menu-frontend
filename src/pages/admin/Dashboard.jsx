import { getCategories, getItems } from '../../api/menu'
import useFetch  from '../../hooks/useFetch'
import StatCard  from '../../components/admin/StatCard'
import AdminLayout from '../../components/admin/AdminLayout'
import { UtensilsCrossed, Tag, Star, XCircle } from 'lucide-react'

const Dashboard = () => {
  const { data: items }      = useFetch(getItems)
  const { data: categories } = useFetch(getCategories)

  const stats = [
    { label: 'Total Items',       value: items?.length,                                        icon: UtensilsCrossed, color: 'blue'  },
    { label: 'Categories',        value: categories?.length,                                   icon: Tag,             color: 'green' },
    { label: 'Featured Items',    value: items?.filter((i) => i.featured).length,              icon: Star,            color: 'amber' },
    { label: 'Unavailable Items', value: items?.filter((i) => !i.available).length,            icon: XCircle,         color: 'red'   },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-1">Overview of your restaurant menu</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent items */}
      <div className="card p-6">
        <h2 className="font-semibold text-stone-800 mb-5">Recent Items</h2>
        {!items?.length ? (
          <p className="text-stone-400 text-sm">No items yet. Go to Items to add your first dish.</p>
        ) : (
          <div className="divide-y divide-stone-100">
            {items.slice(0, 8).map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                  {item.image
                    ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-lg">🍽️</div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 text-sm truncate">{item.name}</p>
                  <p className="text-stone-400 text-xs">{item.categoryId?.name || '—'}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.featured && (
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">Featured</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.available ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                  <span className="text-sm font-semibold text-stone-700">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Dashboard
