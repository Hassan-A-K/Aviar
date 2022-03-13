import logo from './assets/aviarlogo.png';
import React, {useEffect, useState } from "react"; //React hooks
import './App.css';
import Post from './Post';




import { initializeApp } from 'firebase/app';
//import  db  from 'firebase/compat/firestore';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
        apiKey: "AIzaSyA5WYq6rqf-U5Dv_9JLuRmDleKYmWHwHjA",
        authDomain: "aviar-4624d.firebaseapp.com",
        projectId: "aviar-4624d",
        storageBucket: "aviar-4624d.appspot.com",
        messagingSenderId: "607071216017",
        appId: "1:607071216017:web:042de0b3a86fb6d946fa30"

};
const firebaseApp = initializeApp(firebaseConfig);
//grabs 3 services from firebase and stores it as variables

const db = getFirestore(firebaseApp);
// const auth = firebase.auth();
// const storage = firebase.storage();
//import { db } from './firebase';


function App() {
  const [posts, setPosts] = useState([
    // {
    //   creator: "betaCreator",
    //   statement: "Glorious Sunset",
    //   imageURL: 'https://www.artranked.com/images/4b/4b18840d83f9a59964defbf1a9abe764.jpeg'
    // },
    // {
    //   creator: "alphaCreator",
    //   statement: "Glorious Colours",
    //   imageURL: 'https://cdn.shopify.com/s/files/1/0950/0728/products/glorious-colors-6-michaels-lyric_1024x1024.jpg?v=1575645351'
    // },
    // {
    //   creator: "omegaCreator",
    //   statement: "Glorious Sky",
    //   imageURL: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/glorious-sky-lydia-falletti.jpg'
    // }
  ]); //Short term memory in react AKA Hooks

  //useEffect -> runs a piece of code on a specific condition
  // useEffect(() => {
  //   //code here
  //   db.collection('posts').onSnapshot(snapshot => {
  //     //code to fire off via listener
  //     setPosts(snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       post: doc.data()
  //     })))
  //   })//snapShot is a powerful listener
  // }, [])// conditions in [] if blank it runs once when page loads

  return (
    <div className="App">
      <div className="app__navBarLogo">
        <img className="logo"
        src={logo}
        alt="aviarLogo"
        />
        </div> 
      {/* Nav Bar */}

      <h1 className='todayGallery'>Today's Gallery</h1>

      {/*post loop*/}
      {
        // posts.map(({id, post}) => (
        //   <Post key={id} creator={post.creator} statement={post.statement} imageURL={post.imageURL}/>
        // ))
        posts.map(post => (
          <Post creator={post.creator} statement={post.statement} imageURL={post.imageURL}/>
        ))
      }

      {/* Posts HARDCODED*/}
      
      <Post creator="betaCreator" statement="Glorious Sunset" imageURL='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52fea380-ab72-4b0f-8fbf-7f4c918d20c5/debblug-35aa9437-1e77-4ad2-9331-ee73dc05af09.jpg/v1/fill/w_1280,h_792,q_75,strp/glorious_sunset_by_otherunicorn_debblug-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzkyIiwicGF0aCI6IlwvZlwvNTJmZWEzODAtYWI3Mi00YjBmLThmYmYtN2Y0YzkxOGQyMGM1XC9kZWJibHVnLTM1YWE5NDM3LTFlNzctNGFkMi05MzMxLWVlNzNkYzA1YWYwOS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.eJmJskNT4QRlk3F0ObLeHJ7ojRv2kCq_Oq4cNFBUWMo' />
      <Post creator="alphaCreator" statement="Glorious Colours" imageURL='https://scontent.fyyc2-1.fna.fbcdn.net/v/t31.18172-8/13909166_904675839643273_2272836934698788241_o.jpg?_nc_cat=100&ccb=1-5&_nc_sid=973b4a&_nc_ohc=HL-hL2PeqI0AX-Yp8Nk&_nc_ht=scontent.fyyc2-1.fna&oh=00_AT8FWMqFZ46FiTYemLPlvFi8qvaDYqBttVUFOf1kBiOf0w&oe=624F919B' />
      <Post creator="omegaCreator" statement="Glorious Stars" imageURL='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/078891c3-ba8a-4d99-926d-7e5bfcb77250/dcxco7d-60f7f803-82f3-4239-8a39-b1a5c9034716.jpg/v1/fill/w_1024,h_576,q_75,strp/glorious_night_by_maelstromart_dcxco7d-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvMDc4ODkxYzMtYmE4YS00ZDk5LTkyNmQtN2U1YmZjYjc3MjUwXC9kY3hjbzdkLTYwZjdmODAzLTgyZjMtNDIzOS04YTM5LWIxYTVjOTAzNDcxNi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.rQKCCNeIbjr1QmCppW6dCtSeRTWWUyBQ7PvmILQJ4a4' />
      

    </div>
  );
}

export default App;
