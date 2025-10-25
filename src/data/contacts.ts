export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const callNumber = (phone: string) => {
  if (!phone) {
    alert("Phone number is not available");
    return;
  }

  const telLink = `tel:${phone}`;

  try {
    window.location.href = telLink;
  } catch (err) {
    console.error("Error while trying to call:", err);
    alert("Your browser does not support calling.");
  }
};

export const contacts: Contact[] = [
  {
    "id": "1",
    "name": "Alice Johnson",
    "email": "alice@mail.com",
    "phone": "123-456-7890"
  },
  {
    "id": "2",
    "name": "Bob Smith",
    "email": "bob@mail.com",
    "phone": "987-654-3210"
  },
  {
    "id": "3",
    "name": "Charlie Brown",
    "email": "charlie@mail.com",
    "phone": "555-123-4567"
  },
  {
    "id": "4",
    "name": "David Lee",
    "email": "david@mail.com",
    "phone": "555-987-6543"
  },
  {
    "id": "5",
    "name": "Eva Green",
    "email": "eva@mail.com",
    "phone": "555-234-5678"
  },
  {
    "id": "6",
    "name": "Frank Turner",
    "email": "frank@mail.com",
    "phone": "555-345-6789"
  },
  {
    "id": "7",
    "name": "Grace Hopper",
    "email": "grace@mail.com",
    "phone": "555-456-7890"
  },
  {
    "id": "8",
    "name": "Hannah Adams",
    "email": "hannah@mail.com",
    "phone": "555-567-8901"
  },
  {
    "id": "9",
    "name": "Ian Scott",
    "email": "ian@mail.com",
    "phone": "555-678-9012"
  },
  {
    "id": "10",
    "name": "Jackie Chan",
    "email": "jackie@mail.com",
    "phone": "555-789-0123"
  },
  {
    "id": "11",
    "name": "Karen White",
    "email": "karen@mail.com",
    "phone": "555-890-1234"
  },
  {
    "id": "12",
    "name": "Liam Neeson",
    "email": "liam@mail.com",
    "phone": "555-901-2345"
  },
  {
    "id": "13",
    "name": "Mia Wong",
    "email": "mia@mail.com",
    "phone": "555-012-3456"
  },
  {
    "id": "14",
    "name": "Noah Davis",
    "email": "noah@mail.com",
    "phone": "555-123-4568"
  },
  {
    "id": "15",
    "name": "Olivia Taylor",
    "email": "olivia@mail.com",
    "phone": "555-234-5679"
  },
  {
    "id": "16",
    "name": "Peter Parker",
    "email": "peter@mail.com",
    "phone": "555-345-6780"
  },
  {
    "id": "17",
    "name": "Quinn Harris",
    "email": "quinn@mail.com",
    "phone": "555-456-7891"
  },
  {
    "id": "18",
    "name": "Rachel Green",
    "email": "rachel@mail.com",
    "phone": "555-567-8902"
  },
  {
    "id": "19",
    "name": "Sam Wilson",
    "email": "sam@mail.com",
    "phone": "555-678-9013"
  },
  {
    "id": "20",
    "name": "Tina Fey",
    "email": "tina@mail.com",
    "phone": "555-789-0124"
  },
  {
    "id": "21",
    "name": "Uma Thurman",
    "email": "uma@mail.com",
    "phone": "555-890-1235"
  },
  {
    "id": "22",
    "name": "Victor Hugo",
    "email": "victor@mail.com",
    "phone": "555-901-2346"
  },
  {
    "id": "23",
    "name": "Wendy Brown",
    "email": "wendy@mail.com",
    "phone": "555-012-3457"
  }
];
