import {
  collection,
  addDoc,
  getDocsFromServer,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt?: any;
  read: boolean;
}

export async function saveContact(data: Omit<ContactSubmission, "id" | "createdAt" | "read">) {
  const docRef = await addDoc(collection(db, "contacts"), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getAllContacts() {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
  const snap = await getDocsFromServer(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as ContactSubmission[];
}

export async function markContactRead(id: string) {
  await updateDoc(doc(db, "contacts", id), { read: true });
}
