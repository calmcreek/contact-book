import { useState, useEffect } from "react";
import axios from "axios";
import type { Contact } from "../data/contacts";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import AddContactForm from "../components/AddContactForm";

const API_BASE = "/api";

const ContactsList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    axios
      .get<Contact[]>(`${API_BASE}/contacts`)
      .then((res) => setContactList(res.data))
      .catch(console.error);
  }, []);

  const filteredContacts = contactList
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        My Contacts
      </h1>

      <SearchBar value={search} onChange={setSearch} />

      <AddContactForm
        onAdd={(newContact) => setContactList([newContact, ...contactList])}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full max-w-4xl">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="cursor-pointer contact-card border-2 border-gray-400 rounded-lg p-2 flex justify-center items-center hover:shadow-lg transition duration-200"
            onClick={() => setSelectedContact(contact)}
          >
            <ContactCard
              contact={contact}
              onCall={(phone) => alert(`Calling ${phone}... 📞`)}
            />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => setSelectedContact(null)}
            >
              ×
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl mb-2">
                {selectedContact.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{selectedContact.name}</h2>
              <p className="text-gray-500">{selectedContact.phone}</p>
              <p className="text-gray-500">{selectedContact.email}</p>
            </div>

            <div className="flex justify-around mb-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">📩 Message</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">📞 Call</button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded">📹 Video</button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded">✉️ Mail</button>
            </div>

            <div className="text-gray-500 text-center">
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
      )}
    </div>
  );
};

export default ContactsList;
