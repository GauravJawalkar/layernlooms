import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDocFromServer,
  setDoc,
  serverTimestamp,
  collection,
  getDocsFromServer,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export interface AdminUser {
  uid: string;
  email: string;
  role: "superadmin" | "admin";
  status: "active" | "pending";
  createdAt?: any;
}

export async function signIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDocFromServer(doc(db, "users", cred.user.uid));
  if (!userDoc.exists()) throw new Error("User not found. Contact superadmin.");
  const data = userDoc.data() as AdminUser;
  if (data.status !== "active") throw new Error("Account pending approval. Contact superadmin.");
  return data;
}

export async function signUp(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    email,
    role: "admin",
    status: "pending",
    createdAt: serverTimestamp(),
  });
  await firebaseSignOut(auth);
  return cred.user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function getUserRole(uid: string): Promise<AdminUser | null> {
  try {
    const snap = await getDocFromServer(doc(db, "users", uid));
    if (!snap.exists()) return null;
    return snap.data() as AdminUser;
  } catch {
    return null;
  }
}

export async function getAllUsers() {
  const snap = await getDocsFromServer(collection(db, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as (AdminUser & { id: string })[];
}

export async function getPendingUsers() {
  const q = query(collection(db, "users"), where("status", "==", "pending"));
  const snap = await getDocsFromServer(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as (AdminUser & { id: string })[];
}

export async function approveUser(uid: string) {
  await updateDoc(doc(db, "users", uid), { status: "active" });
}

export async function rejectUser(uid: string) {
  await updateDoc(doc(db, "users", uid), { status: "rejected" });
}
