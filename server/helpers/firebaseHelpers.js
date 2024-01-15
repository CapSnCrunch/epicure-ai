const { initializeApp } = require("firebase/app");
const { getFirestore, collection, setDoc, getDoc, getDocs, doc, query, limit, orderBy, writeBatch } = require("firebase/firestore");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG) || {};

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

const getRecentRecipesFromFirebase = async (count) => {
  try {
    const querySnapshot = await getDocs(query(recipeCollection, orderBy('createdOn', 'desc'), limit(count)));

    const recentRecipes = [];
    querySnapshot.forEach((doc) => {
      // Include both document data and ID in the result
      recentRecipes.push({
        recipeId: doc.id,
        ...doc.data(),
      });
    });

    return recentRecipes;
  } catch (error) {
    console.error("Error getting recent recipes:", error);
    return null;
  }
}

const getFavoriteRecipesFromFirebase = async (count) => {
  try {
    const querySnapshot = await getDocs(query(recipeCollection, orderBy('likes', 'desc'), limit(count)));

    const favoriteRecipes = [];
    querySnapshot.forEach((doc) => {
      // Include both document data and ID in the result
      favoriteRecipes.push({
        recipeId: doc.id,
        ...doc.data(),
      });
    });

    return favoriteRecipes;
  } catch (error) {
    console.error("Error getting favorite recipes:", error);
    return null;
  }
}

const uploadImageToFirebase = async (imageUrl) => {
  try {
    const imageRef = ref(storageRef, `images/${uuidv4()}.jpg`);

    const axios = require('axios');
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Convert array buffer to buffer (for Node.js)
    const buffer = Buffer.from(response.data);

    // Upload the buffer to Firebase Storage
    await uploadBytes(imageRef, buffer);
    console.log("Image uploaded to Firebase Storage");

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);
    console.log("Firebase Storage URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
  }
}

const batchUpdateFirebaseRecipes = async () => {
  try {
    const querySnapshot = await getDocs(recipeCollection);

    const recentRecipes = [];
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Include both document data and ID in the result
      recentRecipes.push({
        ...data,
      });

      // Check if the document doesn't have a createdOn timestamp
      if (!data.likes) {
        // Update the document with the createdOn timestamp in the batch
        batch.update(doc.ref, {
          likes: 0,
        });
      }
    });

    // Commit the batch to update documents in bulk
    await batch.commit();

    console.log("Successfully updated schema");
    return true;
  } catch (error) {
    console.error("Error updating schema", error);
    return false;
  }
};

module.exports = {
  uploadRecipeToFirebase,
  getRecipeFromFirebase,
  getRecentRecipesFromFirebase,
  getFavoriteRecipesFromFirebase,
  uploadImageToFirebase,
  batchUpdateFirebaseRecipes
};