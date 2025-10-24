import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Contact } from "../data/contacts";

const API_BASE = "/api";

const ContactDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Contact>(`${API_BASE}/contacts/${id}`)
        .then((res) => setContact(res.data))
        .catch(console.error);
    }
  }, [id]);

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="text-blue-600 font-semibold"
            onClick={() => navigate("/contacts")}
          >
            ← Back
          </button>
          <button className="text-blue-600 font-semibold">Edit</button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl mb-2">
            {contact.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold">{contact.name}</h2>
          <p className="text-gray-500">{contact.phone}</p>
        </div>

        <div className="flex justify-around mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">📩 Message</button>
          <a href={`tel:${contact.phone}`} className="bg-green-600 text-white px-4 py-2 rounded">
            📞 Call
          </a>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">📹 Video</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">✉️ Mail</button>
        </div>

        <div className="text-gray-500">
          <p>Mobile: {contact.phone}</p>
          <p>Group: Family</p>
          <p>Linked Numbers: WhatsApp, Telegram</p>
        </div>

        <div className="flex justify-around mt-6 text-blue-600 font-semibold">
          <button>Share Contact</button>
          <button>Add to Favorites</button>
          <button>Share My Location</button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
