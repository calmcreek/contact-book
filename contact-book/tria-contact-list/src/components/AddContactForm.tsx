import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Contact } from "../data/contacts";

interface Props {
  onAdd: (contact: Contact) => void;
}

const AddContactForm: React.FC<Props> = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    onAdd({ id: uuidv4(), ...formData });
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-5 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Contact</h2>
      <div className="grid gap-3">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Contact
        </button>
      </div>
    </form>
  );
};

export default AddContactForm;
