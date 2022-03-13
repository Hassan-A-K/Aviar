



// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//         apiKey: "AIzaSyA5WYq6rqf-U5Dv_9JLuRmDleKYmWHwHjA",
//         authDomain: "aviar-4624d.firebaseapp.com",
//         projectId: "aviar-4624d",
//         storageBucket: "aviar-4624d.appspot.com",
//         messagingSenderId: "607071216017",
//         appId: "1:607071216017:web:042de0b3a86fb6d946fa30"

// };

// const firebaseApp = initializeApp(firebaseConfig);
// //firebase.firestore();

// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const storage = firebase.storage();

// export {db, auth, storage};






//import firebase from './firebase';
import firebase from 'firebase/compat/app';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyA5WYq6rqf-U5Dv_9JLuRmDleKYmWHwHjA",
        authDomain: "aviar-4624d.firebaseapp.com",
        projectId: "aviar-4624d",
        storageBucket: "aviar-4624d.appspot.com",
        messagingSenderId: "607071216017",
        appId: "1:607071216017:web:042de0b3a86fb6d946fa30"
});
//grabs 3 services from firebase and stores it as variables

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};