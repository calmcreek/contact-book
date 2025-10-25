# Contact Book

**Hosted at:** [https://calmcreek.github.io/contact-book/](https://calmcreek.github.io/contact-book/)

A simple React web app for managing contacts, built with **TypeScript** and **Tailwind CSS**.

> **Special Feature:** Allows real-time calling. Clicking the **Call** button on Android/iOS opens your phone’s dialer with the contact’s number prefilled.

---

## 📝 Features

- **View Contacts:** Scrollable phone-style interface displaying all contacts.  
- **Search Contacts:** Filter contacts by name in real-time using the search bar.  
- **Add Contacts:** Dynamically add new contacts to the list.  
- **Contact Details Popup:** Click a contact to see detailed info (phone, email).  
- **Call & Email Actions:**  
  - **Call:** Opens the dialer on mobile devices.  
  - **Email:** Opens the default email client with the contact’s email prefilled.  
- **Edit Contacts:** Modify contact details directly from the popup.  
- **Delete Contacts:** Remove contacts from the list dynamically.  
- **Reset Contacts:** Restore the initial dataset at any time.  
- **Responsive Design:** Works on both desktop and mobile screens.  

> ⚠️⚠️ Contacts are stored locally in `localStorage`. They **persist** across page reloads with deletes and edits until you click **Reset**.

---

## 🛠️ Tech Stack

- **React** (with TypeScript)  
- **Tailwind CSS** for styling  
- **Vite** for bundling  

---

## ⚙️ Setup

1. Clone the repository:

```bash
git clone https://github.com/calmcreek/contact-book.git
cd contact-book
