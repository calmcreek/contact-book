import type { Contact } from "../data/contacts";
import { FaPhoneAlt } from "react-icons/fa";

interface Props {
  contact: Contact;
  onCall: (phone: string) => void;
}

const ContactCard: React.FC<Props> = ({ contact, onCall }) => {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border-2 border-gray-300 rounded-lg p-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg">
          {initials}
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{contact.name}</h2>
          <p className="text-gray-500">{contact.phone}</p>
          <p className="text-gray-500">{contact.email}</p>
        </div>
      </div>
      <button
        onClick={() => onCall(contact.phone)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition duration-200"
      >
        <FaPhoneAlt />
      </button>
    </div>
  );
};

export default ContactCard;
