import { useState, useEffect } from 'react'
import { getSettings }    from '../../api/menu'
import { updateSettings } from '../../api/admin'
import useFetch      from '../../hooks/useFetch'
import AdminLayout   from '../../components/admin/AdminLayout'
import Spinner       from '../../components/ui/Spinner'
import toast         from 'react-hot-toast'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const Settings = () => {
  const { data: settings, loading } = useFetch(getSettings)
  const [form, setForm]   = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) setForm(settings)
  }, [settings])

  const set = (path, value) => {
    setForm((prev) => {
      const next = { ...prev }
      const keys = path.split('.')
      let cur = next
      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] }
        cur = cur[keys[i]]
      }
      cur[keys[keys.length - 1]] = value
      return next
    })
  }

  const setHour = (day, field, value) => {
    setForm((prev) => ({
      ...prev,
      openingHours: prev.openingHours.map((h) =>
        h.day === day ? { ...h, [field]: value } : h
      ),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSettings(form)
      toast.success('Settings saved')
    } catch {
      toast.error('Could not save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) return (
    <AdminLayout>
      <div className="flex justify-center py-20"><Spinner size="lg" /></div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-800">Settings</h1>
        <p className="text-stone-500 text-sm mt-1">Restaurant info and opening hours</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

        {/* ── General Info ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wider">General</h2>

          <div>
            <label className="label">Restaurant Name</label>
            <input value={form.restaurantName || ''} onChange={(e) => set('restaurantName', e.target.value)}
              className="input" placeholder="My Restaurant" />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input value={form.tagline || ''} onChange={(e) => set('tagline', e.target.value)}
              className="input" placeholder="Fresh ingredients, unforgettable flavors." />
          </div>
          <div>
            <label className="label">Hero Image URL</label>
            <input value={form.heroImage || ''} onChange={(e) => set('heroImage', e.target.value)}
              className="input" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Phone</label>
              <input value={form.phone || ''} onChange={(e) => set('phone', e.target.value)}
                className="input" placeholder="+1 555 000 0000" />
            </div>
            <div>
              <label className="label">Location</label>
              <input value={form.location || ''} onChange={(e) => set('location', e.target.value)}
                className="input" placeholder="123 Main St, City" />
            </div>
          </div>
        </div>

        {/* ── Social Links ── */}
        <div className="card p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wider">Social Links</h2>
          {['instagram','facebook','tiktok'].map((s) => (
            <div key={s}>
              <label className="label capitalize">{s}</label>
              <input value={form.socialLinks?.[s] || ''} onChange={(e) => set(`socialLinks.${s}`, e.target.value)}
                className="input" placeholder={`https://${s}.com/yourpage`} />
            </div>
          ))}
        </div>

        {/* ── Opening Hours ── */}
        <div className="card p-6">
          <h2 className="font-semibold text-stone-700 text-sm uppercase tracking-wider mb-4">Opening Hours</h2>
          <div className="space-y-3">
            {(form.openingHours || []).map((h) => (
              <div key={h.day} className="flex items-center gap-3">
                <span className="w-28 text-sm text-stone-600 font-medium shrink-0">{h.day}</span>
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input type="checkbox" checked={h.closed}
                    onChange={(e) => setHour(h.day, 'closed', e.target.checked)}
                    className="rounded border-stone-300 text-brand-600" />
                  <span className="text-sm text-stone-500">Closed</span>
                </label>
                {!h.closed && (
                  <>
                    <input type="time" value={h.open} onChange={(e) => setHour(h.day, 'open', e.target.value)}
                      className="input text-sm w-32" />
                    <span className="text-stone-400 text-sm">to</span>
                    <input type="time" value={h.close} onChange={(e) => setHour(h.day, 'close', e.target.value)}
                      className="input text-sm w-32" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <><Spinner size="sm" /> Saving...</> : 'Save Settings'}
        </button>
      </form>
    </AdminLayout>
  )
}

export default Settings
