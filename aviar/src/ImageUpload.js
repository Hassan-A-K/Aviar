import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase/compat/app';

import 'firebase/storage';  // <----
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { storage, db } from './firebase';
//import { uploadBytesResumable } from 'firebase/storage';
import './imageUpload.css';

function ImageUpload({username}){
    //States
    const [statement, setStatement] = useState(''); // <- empty so it shows place holder
    // Three states for Image
    const [image, setImage] = useState('null'); // choose file
    //const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);


    const handleChange = (e) => {
        if (e.target.files[0]) { // get the 1st file
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => { //how to push to firebase
        //const uploadTask =  storage.ref(`images/${image.name}`).put(image)
        const storageRef = ref(storage, `posts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progess bar logic
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error Function
                console.log(error);
                alert(error.message); // <- not for production
            },
            () => {
                // final part get the link for the download of the image
               getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    // post on DB
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        statement: statement,
                        imageURL: url,
                        creator: username
                    });
                    // restore empty state
                    setProgress(0);
                    setStatement("");
                    setImage(null);
                })
            }
        )
    };

    return(
        <div className='imageUpload'>
      {/* piece upload time */}
      {/* art upload time file picker*/}
      {/* statement upload time */}
      {/* button upload time */}
        
         <input type='text' placeholder='Piece Statement' 
        onChange={event => setStatement(event.target.value)/* On the fly statement updating*/}
         value={statement}/>
        <input type='file' onChange={handleChange} />
        <progress className='imageUpload__progress' value={progress} max='100'/>
      
        <Button onClick={handleUpload}>
            Showcase
        </Button>

        </div>
    )
}

export default ImageUpload