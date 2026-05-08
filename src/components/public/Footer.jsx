import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'

const Footer = ({ settings }) => {
  const days = settings?.openingHours || []

  return (
    <footer id="info" className="bg-stone-900 text-stone-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-white mb-4">
              {settings?.restaurantName || 'Restaurant'}
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              {settings?.tagline || 'Fresh ingredients, unforgettable flavors.'}
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noreferrer"
                  className="p-2.5 bg-stone-800 hover:bg-brand-600 rounded-xl transition-colors">
                  <Instagram size={16} />
                </a>
              )}
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noreferrer"
                  className="p-2.5 bg-stone-800 hover:bg-brand-600 rounded-xl transition-colors">
                  <Facebook size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <div className="space-y-3">
              {settings?.location && (
                <div className="flex items-start gap-3 text-sm">
                  <MapPin size={16} className="text-brand-400 mt-0.5 shrink-0" />
                  <span>{settings.location}</span>
                </div>
              )}
              {settings?.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-brand-400 shrink-0" />
                  <span>{settings.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Clock size={16} className="text-brand-400" /> Opening Hours
            </h4>
            <div className="space-y-2">
              {days.map((d) => (
                <div key={d.day} className="flex justify-between text-sm">
                  <span className="text-stone-400">{d.day}</span>
                  <span className={d.closed ? 'text-red-400' : 'text-stone-300'}>
                    {d.closed ? 'Closed' : `${d.open} – ${d.close}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-6 text-center text-stone-500 text-sm">
          © {new Date().getFullYear()} {settings?.restaurantName || 'Restaurant'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
