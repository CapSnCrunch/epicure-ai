// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, getDoc, doc } from "firebase/firestore"

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "epicure-ai.firebaseapp.com",
  projectId: "epicure-ai",
  storageBucket: "epicure-ai.appspot.com",
  messagingSenderId: "421430875616",
  appId: "1:421430875616:web:605fb10b1c06e590130785",
  measurementId: "G-338T2GRZ1S"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const recipeCollection = collection(db, 'recipes')

export const createRecipeInFirebase = async (recipeId, recipe) => {
  try {
    await setDoc(doc(recipeCollection, recipeId), recipe)
    return recipeId
  } catch (error) {
    console.error("Error creating recipe: ", error)
    return null
  }
}

export const getRecipeInFirebase = async (recipeId) => {
  try {
    const recipe = await getDoc(doc(recipeCollection, recipeId))
    if (recipe.exists()) {
      return recipe.data()
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting recipe: ", error)
    return null
  }
}
