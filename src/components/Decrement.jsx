import { doc,increment,updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const decrementNestedValue = async (docId, nestedKey) => {
  try {
    const docRef = doc(db, "RideData", docId);
console.log(docRef)
    await updateDoc(docRef, {
      [`${nestedKey}`]: increment(-1),
    });

    console.log(`Successfully incremented ${nestedKey} by 1!`);
  } catch (error) {
    console.error("Error updating document:", error);
  }
};
