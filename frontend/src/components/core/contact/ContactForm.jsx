import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const INPUT_CLASS =
  'w-full px-4 py-2 border-2 border-amber-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent text-amber-900 font-serif'

/**
 * Contact form with controlled inputs.
 * onSubmit is called with form data; default handler simulates submission + toast.
 */
function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [loading, setLoading] = useState(false)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
        if (onSubmit) {
          await onSubmit(formData)
        } else {
          // Default: simulate submit + toast
          await new Promise((r) => setTimeout(r, 1000))
          toast.success('Thank you for your message! We will get back to you soon.')
        }
        setFormData(INITIAL_STATE)
      } finally {
        setLoading(false)
      }
    },
    [formData, onSubmit]
  )

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-amber-800">
      <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">
        Send us a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-amber-900 font-serif font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-amber-900 font-serif font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-amber-900 font-serif font-medium mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={INPUT_CLASS}
            placeholder="What is this regarding?"
            required
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-amber-900 font-serif font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`${INPUT_CLASS} resize-none`}
            placeholder="Tell us what's on your mind..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-800 text-amber-50 font-serif font-medium py-3 px-6 rounded-md hover:bg-amber-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

export default ContactForm
