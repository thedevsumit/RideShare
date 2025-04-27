import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const decrementNestedValue = async (docId, nestedKey) => {
  try {
    const docRef = doc(db, "RideData", docId);
    console.log(`Decrementing ${nestedKey} in document ${docId}`);
    
    await updateDoc(docRef, {
      [`${nestedKey}`]: increment(-1),
    });

    console.log(`Successfully decremented ${nestedKey} by 1!`);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};
