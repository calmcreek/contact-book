import { useState, useEffect } from "react";
import { contacts as initialContacts, callNumber } from "../data/contacts";
import type { Contact } from "../data/contacts";
import ContactCard from "../components/ContactCard";
import SearchBar from "../components/SearchBar";
import AddContactForm from "../components/AddContactForm";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";

const ContactList: React.FC = () => {
  const [search, setSearch] = useState("");
  
  const [contactList, setContactList] = useState<Contact[]>(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : initialContacts;
  });

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const updateContacts = (newList: Contact[]) => {
    setContactList(newList);
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  const handleAddContact = (newContact: Contact) => {
    const updatedList = [newContact, ...contactList];
    updateContacts(updatedList);
  };

  const filteredContacts = contactList
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Spotlight effect
  useEffect(() => {
    const spotlight = document.querySelector<HTMLElement>(".spotlight");
    if (!spotlight) return;

    let spotlightSize = { inner: 160, outer: 200, alpha: 0.85 };

    const updateSpotlight = (e: MouseEvent) => {
      spotlight.style.backgroundImage = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, transparent ${spotlightSize.inner}px, rgba(0,0,0,${spotlightSize.alpha}) ${spotlightSize.outer}px)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      spotlightSize = { inner: 130, outer: 150, alpha: 0.95 };
      updateSpotlight(e);
    };

    const handleMouseUp = (e: MouseEvent) => {
      spotlightSize = { inner: 160, outer: 200, alpha: 0.85 };
      updateSpotlight(e);
    };

    window.addEventListener("mousemove", updateSpotlight);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateSpotlight);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="flex justify-center min-h-screen relative"
      style={{
        background: "url('https://images.unsplash.com/photo-1519677100203-a0e668c92439') no-repeat center/cover",
        color: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Spotlight Overlay */}
      <div
        className="spotlight fixed top-0 left-0 w-full h-full pointer-events-none z-50"
        style={{
          backgroundImage: "radial-gradient(circle, transparent 160px, rgba(0,0,0,0.85) 200px)",
          transition: "background-image 0.05s",
        }}
      ></div>

      {/* Phone Frame */}
      <div
        className="rounded-3xl w-[360px] h-[720px] p-4 flex flex-col"
        style={{
          zIndex: 60,
          border: "2px solid white",
          borderImage: "linear-gradient(45deg, #ff6af4, #a14fff, #6fc1ff) 1",
          background: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.9)),
                      url('https://images.unsplash.com/photo-1519677100203-a0e668c92439') no-repeat center/cover`,
          boxShadow: "0 4px 20px rgba(0,0,0,1)",
          animation: "borderPulse 3s infinite alternate",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        {/* Speaker */}
        <div className="w-24 h-1 bg-gray-700 rounded-full mx-auto mt-2"></div>

        {/* Screen */}
        <div className="bg-gray-100 rounded-2xl mt-3 flex flex-col w-full h-full overflow-auto p-4">
          <h1 className="text-xl font-bold text-center text-gray-800" style={{ color: "#4a148c" }}>Contacts</h1>

          {/* Search Bar */}
          <div className="mt-3">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {/* Add Contact Form */}
          <div className="mt-4 flex justify-between items-center">
            <AddContactForm onAdd={handleAddContact} />

            {/* Reset Contacts Button */}
            <button
              onClick={() => {
                localStorage.removeItem("contacts");
                setContactList(initialContacts);
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
            >
              Reset
            </button>
          </div>

          {/* All Contacts Heading */}
          <div className="text-center font-black text-[2rem] mt-4">All Contacts</div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto px-2 py-4 flex flex-col">
            {filteredContacts.map((contact) => (
              <div key={contact.id} onClick={() => setSelectedContact(contact)} className="py-[1rem]">
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
            position: "absolute",
            top: "20vh",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 70,
            display: "flex",
            justifyContent: "center",
            color: "#000000",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 70,
              border: "2px solid white",
              borderRadius: "8px",
              background: `radial-gradient(circle at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.9) 70%),
                          url('https://images.unsplash.com/photo-1519677100203-a0e668c92439') no-repeat center/cover`,
              boxShadow: "0 4px 20px rgba(0,0,0,1)",
              width: "200px",
              height: "250px",
              padding: "20px",
            }}
          >
            <button onClick={() => setSelectedContact(null)}>×</button>
            <div>
              <h2 className="text-lg font-semibold">{selectedContact.name}</h2>
              <p className="text-gray-700">{selectedContact.phone}</p>
              <p className="text-gray-700">{selectedContact.email}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="w-1/2 pr-1">
                  <button
                    onClick={() => callNumber(selectedContact.phone)}
                    style={{ backgroundColor: "green", color: "white", padding: "6px 12px" }}
                  >
                    Call
                  </button>
                </div>

                <div className="w-1/2 pl-1">
                  <button
                    onClick={() => (window.location.href = `mailto:${selectedContact.email}`)}
                    style={{ backgroundColor: "orange", color: "white", padding: "6px 12px" }}
                  >
                    Mail
                  </button>
                </div>

                <div className="w-1/2 pr-1">
                  <DeleteButton
                    contact={selectedContact}
                    onDelete={(id) => updateContacts(contactList.filter((c) => c.id !== id))}
                  />
                </div>

                <div className="w-1/2 pl-1">
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
        </div>
      )}
    </div>
  );
};

export default ContactList;
