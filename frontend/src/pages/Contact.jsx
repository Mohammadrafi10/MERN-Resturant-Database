import Navbar from '../components/core/Navbar'
import Footer from '../components/core/Footer'
import PageHeader from '../components/ui/PageHeader'
import { ContactForm, ContactInfo, SocialLinks } from '../components/core/contact'

function Contact() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-amber-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <PageHeader
            title="Contact Us"
            subtitle="We'd love to hear from you"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <ContactInfo />
              <SocialLinks />
            </div>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Contact
