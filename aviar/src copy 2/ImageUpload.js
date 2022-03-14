import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase/compat/app';
import { storage, db } from './firebase';

function ImageUpload({username}){
    //States
    const [statement, setStatement] = useState(''); // <- empty so it shows place holder
    // Three states for Image
    const [image, setImage] = useState('null'); // choose file
    //const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);


    const handleChange = (event) => {
        if (event.target.files[0]) { // get the 1st file
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = () => { //how to push to firebase
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

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
            ()=> {
                // final part get the link for the download of the image
                storage
                .ref("image")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post on DB
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        statement: statement,
                        imageUrl: url,
                        username: username
                    });
                    // restore empty state
                    setProgress(0);
                    setStatement("");
                    setImage(null);
                })
            }
        )
    }

    return(
        <div>
      {/* piece upload time */}
      {/* art upload time file picker*/}
      {/* statement upload time */}
      {/* button upload time */}
        
        <progress value={progress} max='100'/>
        <input type='text' placeholder='Piece Statement' 
        onChange={event => setStatement(event.target.value)/* On the fly statement updating*/}
         value={statement}/>
        <input type='file' onChange={handleChange} />
        <Button onClick={handleUpload}>
            Showcase
        </Button>

        </div>
    )
}

export default ImageUpload