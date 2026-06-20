import {
  collection,
  addDoc,
  getDocsFromServer,
  getDocFromServer,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export interface AdminService {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  pricing?: {
    starter?: string;
    professional?: string;
    enterprise?: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  createdAt?: any;
  updatedAt?: any;
}

export const defaultService: Omit<AdminService, "id"> = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  longDescription: "",
  icon: "/icons/default.svg",
  image: "",
  features: [],
  benefits: [],
  technologies: [],
  faqs: [],
};

export async function createService(data: Omit<AdminService, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "services"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateService(id: string, data: Partial<Omit<AdminService, "id" | "createdAt" | "updatedAt">>) {
  await updateDoc(doc(db, "services", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteService(id: string) {
  await deleteDoc(doc(db, "services", id));
}

export async function getAllServicesFromDb() {
  const snap = await getDocsFromServer(collection(db, "services"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as AdminService[];
}

export async function getServiceById(id: string) {
  const snap = await getDocFromServer(doc(db, "services", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as AdminService;
}
