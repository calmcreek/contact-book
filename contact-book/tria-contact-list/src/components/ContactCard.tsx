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
    <div className="w-full flex flex-col items-center p-4 border-2 border-gray-400 rounded-lg bg-white shadow-sm hover:shadow-lg transition duration-200">
      <div className="bg-blue-500 text-white w-16 h-16 flex items-center justify-center rounded-full font-bold text-xl mb-2">
        {initials}
      </div>
      <h2 className="font-semibold text-lg text-gray-800">{contact.name}</h2>
      <p className="text-gray-500">{contact.phone}</p>
      <p className="text-gray-500">{contact.email}</p>
      <button
        onClick={() => onCall(contact.phone)}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full transition duration-200"
      >
        <FaPhoneAlt />
      </button>
    </div>
  );
};

export default ContactCard;
