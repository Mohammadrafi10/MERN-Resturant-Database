/**
 * Reusable page header with title, decorative divider, and optional subtitle.
 * Used across Contact, SignUp, and other page layouts.
 */
function PageHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 dark:text-amber-200 mb-4">
        {title}
      </h1>
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600" />
        <span className="text-amber-800 dark:text-amber-400 text-2xl">✦</span>
        <div className="w-12 h-0.5 bg-amber-800 dark:bg-amber-600" />
      </div>
      {subtitle && (
        <p className="text-lg text-amber-900 dark:text-amber-200 font-serif italic">{subtitle}</p>
      )}
    </div>
  )
}

export default PageHeader
