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

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  visible?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export const defaultBlogPost: Omit<AdminBlogPost, "id"> = {
  visible: true,
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  author: "",
  date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  category: "",
  tags: [],
  image: "",
  readTime: "5 min read",
};

export async function createBlogPost(data: Omit<AdminBlogPost, "id" | "createdAt" | "updatedAt">) {
  const docRef = await addDoc(collection(db, "blog"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateBlogPost(id: string, data: Partial<Omit<AdminBlogPost, "id" | "createdAt" | "updatedAt">>) {
  await updateDoc(doc(db, "blog", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlogPost(id: string) {
  await deleteDoc(doc(db, "blog", id));
}

export async function getAllBlogPostsFromDb() {
  const snap = await getDocsFromServer(collection(db, "blog"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as AdminBlogPost[];
}

export async function getBlogPostById(id: string) {
  const snap = await getDocFromServer(doc(db, "blog", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as AdminBlogPost;
}

export async function getBlogPostBySlugFromDb(slug: string) {
  const all = await getAllBlogPostsFromDb();
  return all.find((p) => p.slug === slug) || null;
}
