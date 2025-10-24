import { useState } from "react"; 
import { contacts as initialContacts } from "../data/contacts";
import type { Contact } from "../data/contacts";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";
import AddContactForm from "../components/AddContactForm";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const ContactList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleAddContact = (newContact: Contact) => {
    const updatedList = [newContact, ...contactList];
    setContactList(updatedList);
  };

  const updateContacts = (newList: Contact[]) => {
    setContactList(newList);
  };

  const filteredContacts = contactList
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-900"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      {/* Phone Frame */}
      <div
        className="bg-black rounded-3xl w-[360px] h-[720px] p-4 flex flex-col"
        style={{
          border: "2px solid white",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        {/* Speaker */}
        <div className="w-24 h-1 bg-gray-700 rounded-full mx-auto mt-2"></div>

        {/* Screen */}
        <div className="bg-gray-100 rounded-2xl mt-3 flex flex-col w-full h-full overflow-auto p-4">
          <h1 className="text-xl font-bold text-center text-gray-800">
            Contacts
          </h1>

          {/* Search */}
          <div className="mt-3">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Add Contact */}
          <div className="mt-4">
            <AddContactForm onAdd={handleAddContact} />
          </div>

          {/* All Contacts Heading */}
          <div className="text-center font-black text-[2rem]">All Contacts</div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className="py-[1rem]"
              >
                <ContactCard contact={contact} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Details Popup */}
      {selectedContact && (
        <div
          style={{
            display: "flex",
            marginTop: "20vh",
            paddingLeft: "200px",
            backgroundColor: "#000000",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              border: "2px solid white",
              borderRadius: "8px",
              width: "200px",
              height: "250px",
              padding: "20px",
            }}
          >
            <button onClick={() => setSelectedContact(null)}>×</button>
            <div>
              <h2 className="text-lg font-semibold">
                {selectedContact.name}
              </h2>
              <p className="text-gray-700">{selectedContact.phone}</p>
              <p className="text-gray-700">{selectedContact.email}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() =>
                    alert(`Calling ${selectedContact.phone}... 📞`)
                  }
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Call
                </button>
                <button
                  onClick={() =>
                    (window.location.href = `mailto:${selectedContact.email}`)
                  }
                  className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                >
                  Mail
                </button>
                <DeleteButton
                  contact={selectedContact}
                  onDelete={(id) =>
                    updateContacts(contactList.filter((c) => c.id !== id))
                  }
                />
                <EditButton
                  contact={selectedContact}
                  onEdit={(updatedContact) =>
                    updateContacts(
                      contactList.map((c) =>
                        c.id === updatedContact.id ? updatedContact : c
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
