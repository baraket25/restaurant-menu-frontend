const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className={`${sizes[size]} ${className} animate-spin rounded-full border-2 border-stone-200 border-t-brand-600`} />
  )
}

export default Spinner
