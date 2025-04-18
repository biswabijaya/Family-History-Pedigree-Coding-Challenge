// src/services/firestore.ts
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

// Save questionnaire response to Firestore
export const saveQuestionnaireResponse = async (
    userId: string,
    data: unknown
) => {
    const docRef = await addDoc(collection(db, 'questionnaires'), {
        userId,
        data,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

// Fetch all responses for a user
export const getUserResponses = async (userId: string) => {
    const q = query(collection(db, 'questionnaires'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
