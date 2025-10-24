import React, { useState } from "react";
import type { Contact } from "../data/contacts";

interface Props {
  contact: Contact;
  onDelete: (id: string) => void;
}

const DeleteButton: React.FC<Props> = ({ contact, onDelete }) => {
  const [confirm, setConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDelete = () => {
    onDelete(contact.id);     // Remove from parent state
    setSuccess(true);         // Show success message
    setConfirm(false);        // Hide confirmation
    setTimeout(() => setSuccess(false), 2000); // Hide success after 2s
  };

  return (
    <div>
      {success ? (
        <span>Deleted successfully ✅</span>
      ) : confirm ? (
        <div>
          <p>Are you sure you want to delete {contact.name}?</p>
          <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white", padding: "6px 12px", marginRight: "5px" }}>Yes</button>
          <button onClick={() => setConfirm(false)} style={{ padding: "6px 12px" }}>No</button>
        </div>
      ) : (
        <button
          onClick={() => setConfirm(true)}
          style={{ backgroundColor: "red", color: "white", padding: "6px 12px" }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default DeleteButton;
