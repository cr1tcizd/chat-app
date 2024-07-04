import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { token } from "../token";

const app = initializeApp(token)
const storage = getStorage(app, "gs://chat-react-8fcd0.appspot.com")

const upload = async (file) => {
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

return new Promise((resolve, reject) => {
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
      reject('Something went wrong!' + error.code)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL)
        console.log('File available at', downloadURL);
      });
    }
  );
})


}

export default upload