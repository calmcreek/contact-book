import type { Contact } from "../data/contacts";

interface Props {
  contact: Contact;
}

const ContactCard: React.FC<Props> = ({ contact }) => {
  return (
    <div
      className="flex items-center justify-between border-b border-gray-300 py-2 px-3 hover:bg-gray-100 transition cursor-pointer"
    >
      <div className="text-gray-800 text-sm font-medium">
        {contact.name}
      </div>
    </div>
  );
};

export default ContactCard;
