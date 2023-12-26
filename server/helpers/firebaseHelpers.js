const { initializeApp } = require("firebase/app");
const { getFirestore, collection, setDoc, getDoc, doc } = require("firebase/firestore");
const { getStorage, ref, uploadString, getDownloadURL } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
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
const recipeCollection = collection(db, "recipes")

// Initialize Firebase Storage
const storage = getStorage(firebaseApp); // Assuming firebaseApp is your initialized Firebase app
const storageRef = ref(storage);

const uploadRecipeToFirebase = async (recipeId, recipe) => {
  try {
    await setDoc(doc(recipeCollection, recipeId), recipe)
    return recipeId
  } catch (error) {
    console.error("Error creating recipe:", error)
    return null
  }
}

const getRecipeFromFirebase = async (recipeId) => {
  try {
    const recipe = await getDoc(doc(recipeCollection, recipeId))
    if (recipe.exists()) {
      return recipe.data()
    } else {
      return null
    }
  } catch (error) {
    console.error("Error getting recipe:", error)
    return null
  }
}

const uploadImageToFirebase = async (imageUrl) => {
  try {
    const imageRef = ref(storageRef, `images/${uuidv4()}.jpg`);

    const axios = require('axios');
    const response = await axios.get(imageUrl);
    const blob = await response.blob();

    await uploadString(imageRef, blob, "data_url");
    console.log("Image uploaded to Firebase Storage");

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);
    console.log("Firebase Storage URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error)
  }
}

module.exports = {
  uploadRecipeToFirebase,
  getRecipeFromFirebase,
  uploadImageToFirebase
};