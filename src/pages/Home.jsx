import { useState } from 'react'
import { getCategories, getItems, getSettings } from '../api/menu'
import useFetch from '../hooks/useFetch'
import Navbar           from '../components/public/Navbar'
import Hero             from '../components/public/Hero'
import MenuItemCard     from '../components/public/MenuItemCard'
import ItemDetailModal  from '../components/public/ItemDetailModal'
import Footer           from '../components/public/Footer'
import Spinner          from '../components/ui/Spinner'
import { Star }         from 'lucide-react'

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem,   setSelectedItem]   = useState(null)

  const { data: settings }   = useFetch(getSettings)
  const { data: categories } = useFetch(getCategories)
  const { data: items, loading: itemsLoading } = useFetch(getItems)

  const featured = items?.filter((i) => i.featured && i.available) || []

  const filtered = items?.filter((i) => {
    if (activeCategory === 'all') return true
    return i.categoryId?._id === activeCategory || i.categoryId === activeCategory
  }) || []

  return (
    <div className="min-h-screen">
      <Navbar restaurantName={settings?.restaurantName} />

      {/* Hero */}
      <Hero settings={settings} />

      {/* ── Menu Section ── */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12 animate-slide-up">
            <p className="text-brand-600 text-sm font-medium tracking-widest uppercase mb-3">Our Menu</p>
            <h2 className="section-title">What We Offer</h2>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap justify-center mb-10">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All
            </button>
            {(categories || []).map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat._id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Items grid */}
          {itemsLoading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-stone-400 py-16">No items in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <MenuItemCard key={item._id} item={item} onClick={setSelectedItem} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Section ── */}
      {featured.length > 0 && (
        <section id="featured" className="py-20 bg-stone-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-slide-up">
              <p className="text-brand-600 text-sm font-medium tracking-widest uppercase mb-3">
                Chef's Picks
              </p>
              <h2 className="section-title flex items-center justify-center gap-3">
                <Star className="text-brand-500 fill-brand-500" size={28} />
                Featured Dishes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((item) => (
                <MenuItemCard key={item._id} item={item} onClick={setSelectedItem} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer settings={settings} />

      {/* Item detail modal */}
      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  )
}

export default Home
