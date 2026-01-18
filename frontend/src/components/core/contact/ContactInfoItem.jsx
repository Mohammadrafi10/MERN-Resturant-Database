/**
 * Single contact information row: icon, label, and content.
 * Used within ContactInfo for address, phone, email, hours.
 */
function ContactInfoItem({ icon, label, children }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 bg-amber-800 dark:bg-amber-600 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-serif font-semibold text-amber-900 dark:text-amber-200 mb-1">{label}</h3>
        <div className="text-amber-800 dark:text-amber-300 font-serif">{children}</div>
      </div>
    </div>
  )
}

export default ContactInfoItem
