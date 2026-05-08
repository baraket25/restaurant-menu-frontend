const variants = {
  green:  'bg-emerald-50 text-emerald-700 border-emerald-200',
  red:    'bg-red-50 text-red-700 border-red-200',
  amber:  'bg-amber-50 text-amber-700 border-amber-200',
  stone:  'bg-stone-100 text-stone-600 border-stone-200',
}

const Badge = ({ children, variant = 'stone' }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
    {children}
  </span>
)

export default Badge
