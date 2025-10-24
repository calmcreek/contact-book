export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// Allow importing JSON as Contact[]
declare module "*.json" {
  const value: Contact[];
  export default value;
}
