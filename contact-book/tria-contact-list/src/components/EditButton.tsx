import React, { useState } from "react";
import type { Contact } from "../data/contacts";

interface Props {
  contact: Contact;
  onEdit: (updatedContact: Contact) => void;
}

const EditButton: React.FC<Props> = ({ contact, onEdit }) => {
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEdit = () => {
    // Here you can show a form/modal to edit fields if needed
    onEdit({ ...contact, name: contact.name + " (Edited)" }); // Example edit
    setSuccess(true);
    setConfirm(false);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div>
      {success ? (
        <span>Edited successfully ✅</span>
      ) : confirm ? (
        <div>
          <p>Are you sure you want to edit {contact.name}?</p>
          <button onClick={handleEdit} style={{ backgroundColor: "blue", color: "white", padding: "6px 12px", marginRight: "5px" }}>Yes</button>
          <button onClick={() => setConfirm(false)} style={{ padding: "6px 12px" }}>No</button>
        </div>
      ) : (
        <button
          onClick={() => setConfirm(true)}
          style={{ backgroundColor: "blue", color: "white", padding: "6px 12px" }}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default EditButton;
