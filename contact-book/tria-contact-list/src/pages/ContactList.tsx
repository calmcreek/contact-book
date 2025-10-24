import { useState, useEffect } from "react";
import type { Contact } from "../data/contacts";
import SearchBar from "../components/SearchBar";
import ContactCard from "../components/ContactCard";
import AddContactForm from "../components/AddContactForm";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const ContactsList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Load contacts from localStorage on mount
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContactList(JSON.parse(storedContacts));
    } else {
      setContactList([]); // start empty if nothing in localStorage
    }
  }, []);

  // Helper to update both state and localStorage
  const updateContacts = (newList: Contact[]) => {
    setContactList(newList);
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  // Filtered & sorted contacts
  const filteredContacts = contactList
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      style={{ backgroundColor: "#000000", color: "#ffffff" }}
    >
      {/* Phone Frame */}
      <div
        className="bg-black rounded-3xl p-2 w-[360px] h-[720px] relative flex flex-col items-center"
        style={{
          marginTop: "50px",
          border: "2px solid white",
          borderRadius: "8px",
          width: "400px",
          height: "2000px",
          padding: "20px",
        }}
      >
        {/* Speaker */}
        <div className="w-24 h-1 bg-gray-700 rounded-full mt-2"></div>

        {/* Screen */}
        <div className="bg-white rounded-2xl mt-3 flex flex-col w-full h-full overflow-auto">
          {/* Header */}
          <div className="py-3 border-b text-center text-lg font-semibold text-gray-800">
            Contacts
          </div>

          {/* Search Bar */}
          <div className="px-3 py-2 border-b">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Add Contact */}
          <div className="px-3 py-3 mb-600">
            <AddContactForm
              onAdd={(newContact) => {
                const updatedList = [newContact, ...contactList];
                updateContacts(updatedList);
              }}
            />
          </div>

          {/* All Contacts Heading */}
          <div className="text-center font-black text-[2rem]">All Contacts</div>

          {/* Contact List */}
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
            marginTop: "-200vh",
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
              <h2>{selectedContact.name}</h2>
              <p>{selectedContact.phone}</p>
              <p>{selectedContact.email}</p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  onClick={() =>
                    alert(`Calling ${selectedContact.phone}... 📞`)
                  }
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Call
                </button>
                <button
                  onClick={() =>
                    (window.location.href = `mailto:${selectedContact.email}`)
                  }
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Mail
                </button>
              </div>

              {/* Delete & Edit Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
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

export default ContactsList;
