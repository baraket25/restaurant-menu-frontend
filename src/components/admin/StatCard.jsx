const StatCard = ({ label, value, icon: Icon, color }) => {
  const colors = {
    blue:   'bg-blue-50 text-blue-600',
    green:  'bg-emerald-50 text-emerald-600',
    amber:  'bg-amber-50 text-amber-600',
    red:    'bg-red-50 text-red-600',
  }

  return (
    <div className="card p-6 flex items-center gap-4 animate-fade-in">
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-bold text-stone-800">{value ?? '—'}</p>
        <p className="text-stone-500 text-sm">{label}</p>
      </div>
    </div>
  )
}

export default StatCard
