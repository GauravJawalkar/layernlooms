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

export interface AdminProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  client: string;
  year: string;
  url?: string;
  services: string[];
  technologies: string[];
  result: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
  visible?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export const defaultProject: Omit<AdminProject, "id"> = {
  visible: true,
  slug: "",
  title: "",
  category: "",
  description: "",
  longDescription: "",
  image: "",
  client: "",
  year: new Date().getFullYear().toString(),
  services: [],
  technologies: [],
  result: "",
};

export async function createProject(data: Omit<AdminProject, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "portfolio"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Omit<AdminProject, "id" | "createdAt" | "updatedAt">>) {
  await updateDoc(doc(db, "portfolio", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "portfolio", id));
}

export async function getAllProjectsFromDb() {
  const snap = await getDocsFromServer(collection(db, "portfolio"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as AdminProject[];
}

export async function getProjectById(id: string) {
  const snap = await getDocFromServer(doc(db, "portfolio", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as AdminProject;
}

export async function getProjectBySlugFromDb(slug: string) {
  const all = await getAllProjectsFromDb();
  return all.find((p) => p.slug === slug) || null;
}
