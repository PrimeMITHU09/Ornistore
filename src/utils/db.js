import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ordersCollection = collection(db, 'orders');

export const getOrders = async () => {
  try {
    const querySnapshot = await getDocs(ordersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const saveOrder = async (order) => {
  try {
    const newOrder = {
      ...order,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(ordersCollection, newOrder);
    return docRef.id;
  } catch (error) {
    console.error("Error saving order:", error);
    return { error: error.message };
  }
};

export const getOrderById = async (id) => {
  try {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting order:", error);
    return null;
  }
};

export const approveOrder = async (id, payload) => {
  try {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, { status: 'approved', ...payload });
  } catch (error) {
    console.error("Error approving order:", error);
  }
};

export const updateOrder = async (id, payload) => {
  try {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, payload);
  } catch (error) {
    console.error("Error updating order:", error);
  }
};
