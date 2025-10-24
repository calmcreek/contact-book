import type { Contact } from "./contacts";
import initialContacts from "./contacts.json";

const STORAGE_KEY = "contacts";

export function getContacts(): Contact[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  // initialize localStorage if empty
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialContacts));
  return initialContacts;
}

export function saveContacts(contacts: Contact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}
