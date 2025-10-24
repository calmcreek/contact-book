import React, { useState } from "react";
import type { Contact } from "../data/contacts";

interface Props {
  contact: Contact;
  onEdit: (updatedContact: Contact) => void;
}

const EditButton: React.FC<Props> = ({ contact, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...contact });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Update in parent state
    onEdit(formData);

    // Persist to localStorage
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      const parsed: Contact[] = JSON.parse(storedContacts);
      const updated = parsed.map((c) =>
        c.id === formData.id ? formData : c
      );
      localStorage.setItem("contacts", JSON.stringify(updated));
    }

    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div style={{ marginTop: "5px" }}>
      {success ? (
        <span style={{ color: "green" }}>Edited successfully ✅</span>
      ) : editing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              onClick={handleSave}
              style={{ backgroundColor: "green", color: "white", padding: "6px 12px" }}
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              style={{ backgroundColor: "red", color: "white", padding: "6px 12px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          style={{ backgroundColor: "blue", color: "white", padding: "6px 12px" }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditButton;
