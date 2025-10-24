// import express from "express";
// import cors from "cors";
// import fs from "fs";
// import { v4 as uuidv4 } from "uuid";

// const app = express();

// // Dynamic CORS: allow frontend URL in Codespaces or localhost
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true); // allow non-browser requests like Postman
//       // Allow localhost or Codespaces frontend (-5173)
//       if (
//         origin.includes("-5173.app.github.dev") ||
//         origin.includes("localhost")
//       ) {
//         return callback(null, true);
//       }
//       callback(new Error("Not allowed by CORS"));
//     },
//   })
// );

// app.use(express.json());

// // Path to contacts JSON
// const CONTACTS_FILE = "./src/data/contacts.json";

// // Helper: read contacts
// const readContacts = () => {
//   if (!fs.existsSync(CONTACTS_FILE)) return [];
//   const data = fs.readFileSync(CONTACTS_FILE, "utf-8");
//   return JSON.parse(data);
// };

// // GET all contacts
// app.get("/api/contacts", (req, res) => {
//   const contacts = readContacts();
//   res.json(contacts);
// });

// // POST new contact
// app.post("/api/contacts", (req, res) => {
//   const contacts = readContacts();
//   const { name, email, phone } = req.body;
//   if (!name || !email || !phone) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const newContact = { id: uuidv4(), name, email, phone };
//   contacts.push(newContact);
//   fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
//   res.status(201).json(newContact);
// });

// // GET contact by id
// app.get("/api/contacts/:id", (req, res) => {
//   const contacts = readContacts();
//   const contact = contacts.find((c) => c.id === req.params.id);
//   if (!contact) return res.status(404).json({ message: "Not found" });
//   res.json(contact);
// });


// // Dynamic PORT for Codespaces or local
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
