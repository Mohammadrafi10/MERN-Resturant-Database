import ContactInfoItem from './ContactInfoItem'
import {
  IconAddress,
  IconPhone,
  IconEmail,
  IconClock,
} from './ContactIcons'
import { CONTACT_INFO } from '../../../constants/contact'

const DESCRIPTION =
  "Whether you have a question about our recipes, want to share feedback, or just want to say hello, we're here to help. Reach out to us through any of the channels below."

function ContactInfo() {
  const { address, phone, email, hours } = CONTACT_INFO

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-amber-800">
      <h2 className="text-2xl font-serif font-bold text-amber-900 mb-6">
        Get in Touch
      </h2>
      <p className="text-amber-900 font-serif mb-6">{DESCRIPTION}</p>

      <div className="space-y-4">
        <ContactInfoItem icon={<IconAddress />} label={address.label}>
          <p className="whitespace-pre-line">{address.value.join('\n')}</p>
        </ContactInfoItem>

        <ContactInfoItem icon={<IconPhone />} label={phone.label}>
          <p>{phone.value}</p>
        </ContactInfoItem>

        <ContactInfoItem icon={<IconEmail />} label={email.label}>
          <p>{email.value}</p>
        </ContactInfoItem>

        <ContactInfoItem icon={<IconClock />} label={hours.label}>
          <p className="whitespace-pre-line">{hours.value.join('\n')}</p>
        </ContactInfoItem>
      </div>
    </div>
  )
}

export default ContactInfo
