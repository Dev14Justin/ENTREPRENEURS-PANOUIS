// NOTE: In a real Next.js/production app, these keys would be in .env.local
// Since this is a generated demo, we will use a Mock Service if config is missing.

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, Firestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { BlogPost } from '../types';

// REPLACE WITH YOUR ACTUAL FIREBASE CONFIG
const firebaseConfig = {
  apiKey: process.env.API_KEY || "AIzaSyDummyKey-ForMockingPurposes",
  authDomain: "entrepreneurs-epanouis.firebaseapp.com",
  projectId: "entrepreneurs-epanouis",
  storageBucket: "entrepreneurs-epanouis.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;

// Basic initialization check
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed (likely due to invalid config). Using Mock Data Mode.");
}

// --- MOCK DATA FOR PREVIEW MODE ---
// This allows the UI to be demonstrated without a live backend connection
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Pourquoi votre mindset est la clé du succès',
    summary: 'Découvrez comment transformer vos croyances limitantes en levier de croissance pour votre activité de coaching.',
    content: 'Le mindset est souvent négligé au profit de la stratégie. Pourtant, sans un état d\'esprit solide, aucune stratégie ne tient sur la durée...',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    category: 'Mindset',
    createdAt: Date.now() - 10000000,
    published: true,
    author: 'Admin'
  },
  {
    id: '2',
    title: 'Attirer des clients premium sans forcer',
    summary: 'La méthode douce pour vendre vos offres haut de gamme avec intégrité et fluidité.',
    content: 'Vendre ne doit pas être une lutte. En alignant votre offre sur votre valeur réelle, vous attirez naturellement ceux qui ont besoin de vous...',
    imageUrl: 'https://picsum.photos/800/400?random=2',
    category: 'Stratégie',
    createdAt: Date.now() - 5000000,
    published: true,
    author: 'Admin'
  }
];

// --- API FUNCTIONS ---

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  if (!db) return MOCK_POSTS;
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (e) {
    console.warn("Using mock posts due to DB error");
    return MOCK_POSTS;
  }
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  if (!db) return MOCK_POSTS.find(p => p.id === id) || null;
  try {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    return null;
  } catch (e) {
    return MOCK_POSTS.find(p => p.id === id) || null;
  }
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<string> => {
  if (!db) {
    const newId = Math.random().toString(36).substr(2, 9);
    MOCK_POSTS.unshift({ id: newId, ...post });
    return newId;
  }
  const docRef = await addDoc(collection(db, "posts"), post);
  return docRef.id;
};

export const updateBlogPost = async (id: string, post: Partial<BlogPost>): Promise<void> => {
  if (!db) {
    const index = MOCK_POSTS.findIndex(p => p.id === id);
    if (index !== -1) MOCK_POSTS[index] = { ...MOCK_POSTS[index], ...post };
    return;
  }
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, post);
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  if (!db) {
    const index = MOCK_POSTS.findIndex(p => p.id === id);
    if (index !== -1) MOCK_POSTS.splice(index, 1);
    return;
  }
  await deleteDoc(doc(db, "posts", id));
};

// --- AUTH MOCK WRAPPER ---
// Since we can't really login without a valid backend, we mock a successful login for the demo
export const loginAdmin = async (email: string, password: string): Promise<boolean> => {
  if (!auth) {
    // Mock login for demo purposes only if no Firebase
    if (email === "admin@epanouis.com" && password === "password") {
      localStorage.setItem("mock_auth", "true");
      return true;
    }
    throw new Error("Identifiants incorrects (Mock: admin@epanouis.com / password)");
  }
  await signInWithEmailAndPassword(auth, email, password);
  return true;
};

export const logoutAdmin = async (): Promise<void> => {
  if (!auth) {
    localStorage.removeItem("mock_auth");
    return;
  }
  await signOut(auth);
};

export const subscribeToAuth = (callback: (user: any) => void) => {
  if (!auth) {
    // Check mock storage
    const isMockAuth = localStorage.getItem("mock_auth");
    callback(isMockAuth ? { uid: 'mock-admin', email: 'admin@epanouis.com' } : null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};