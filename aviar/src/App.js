import logo from './assets/aviarlogo.png';
import React, {useEffect, useState } from "react"; //React hooks
import './App.css';
import Post from './Post';
import { db, auth, storage } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';

const ariaLabel = { 'aria-label': 'description' };

function getModalStyle() {//SIGN up Modal
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({//Modal Styling
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

//#############################################################
function App() {
  const [posts, setPosts] = useState([]); //Short term memory in react AKA Hooks
  //Signup Modal
  const [openSignUp, setOpenSignUp] = useState(false);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  //Loggin Modal
  const [openSignIn, setOpenSignIn] = useState(false);

  //useEffect -> runs a piece of code on a specific condition
  useEffect(() => {
    //code here
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //code to fire off via listener
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })//snapShot is a powerful listener
  }, [])// conditions in [] if blank it runs once when page loads

  useEffect(() => {//frontend listener
    const unsubscribe = auth.onAuthStateChanged((authUser) => {//backend listener
      if (authUser) {
      //login
      console.log(authUser);
      setUser(authUser); //presistant user state
      }else{
      //logout
      setUser(null);
      }
    })

    return () => {
      //cleanup to avoid duplicate listeners
      unsubscribe();
    }

  },[user, username])

  //Login & Signup
  const signUp = (event)=> {
    event.preventDefault();

    auth //Authentication process with Firebase
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({ //Promise needs return
        displayName: username
      })
    })
    .catch((error) => alert(error.message));


    setOpenSignUp(false);
  }
  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <h2 id="simple-modal-title">Signup</h2>
          <img className="logo"
        src={logo}
        alt="aviarLogo"
        />
          </center>
          <Input placeholder="email" inputProps={ariaLabel}
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="creator name" inputProps={ariaLabel}
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="password" inputProps={ariaLabel}
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" onClick={signUp}>Register</Button>
        
      </form>
    </div>
  );
  const body2 = (
    <div style={modalStyle} className={classes.paper}>
      <form className="app__signup">
        <center>
          <h2 id="simple-modal-title">Login</h2>
          <img className="logo"
        src={logo}
        alt="aviarLogo"
        />
        </center>
          <Input placeholder="email" inputProps={ariaLabel}
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="password" inputProps={ariaLabel}
            type='text'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" onClick={signIn}>Enter</Button>
        
      </form>
    </div>
  );//END Login and Signup

  //Version of the onClose that is not an inline function
  // const handleClose = () => {
  //   setOpen(false);
  // };
    
    

  return (//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    <div className="App">

      {/* piece upload time */}
      {/* art upload time file picker*/}
      {/* statement upload time */}
      {/* button upload time */}




        <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}//onClose listens to clicks outside the model <- Signin Modal
      >
        {body}
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}//onClose listens to clicks outside the model <- Login Modal
      >
        {body2}
      </Modal>

      {/* Nav Bar */}
      <div className="app__navBarLogo">

       {user?.displayName ? ( //java optional, dont require try and catch
          <ImageUpload username={user.displayName}/>
       ): (
         <center><h3>Login to share</h3></center>
       )}

        <img className="logo"
        src={logo}
        alt="aviarLogo"
        />
        {user ? (//Logout/Signout

            <Button onClick={() => auth.signOut()}>Logout</Button>

        ): (
          //Login Container
          <div className="app__loginContainer">

            <Button onClick={() => setOpenSignIn(true)}>Login</Button> 
            <Button onClick={() => setOpenSignUp(true)}>Signup</Button> 

            
          </div>
        )}
        </div> 
      {/* Nav Bar */}

      <h1 className='todayGallery'>Today's Gallery</h1>

      {/*post loop*/}
      {
        posts.map(({id, post}) => (
          //key allows reredners of the only posts that are updated instead of all posts
          <Post key={id} user={user} creator={post.creator} statement={post.statement} imageURL={post.imageURL}/>
        ))
        // posts.map(post => (
        //   <Post creator={post.creator} statement={post.statement} imageURL={post.imageURL}/>
        // ))
      }

      {/* Posts HARDCODED*/}
      <Post creator="betaCreator" statement="Glorious Sunset" imageURL='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52fea380-ab72-4b0f-8fbf-7f4c918d20c5/debblug-35aa9437-1e77-4ad2-9331-ee73dc05af09.jpg/v1/fill/w_1280,h_792,q_75,strp/glorious_sunset_by_otherunicorn_debblug-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzkyIiwicGF0aCI6IlwvZlwvNTJmZWEzODAtYWI3Mi00YjBmLThmYmYtN2Y0YzkxOGQyMGM1XC9kZWJibHVnLTM1YWE5NDM3LTFlNzctNGFkMi05MzMxLWVlNzNkYzA1YWYwOS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.eJmJskNT4QRlk3F0ObLeHJ7ojRv2kCq_Oq4cNFBUWMo' />
      <Post creator="alphaCreator" statement="Glorious Colours" imageURL='https://scontent.fyyc2-1.fna.fbcdn.net/v/t31.18172-8/13909166_904675839643273_2272836934698788241_o.jpg?_nc_cat=100&ccb=1-5&_nc_sid=973b4a&_nc_ohc=HL-hL2PeqI0AX-Yp8Nk&_nc_ht=scontent.fyyc2-1.fna&oh=00_AT8FWMqFZ46FiTYemLPlvFi8qvaDYqBttVUFOf1kBiOf0w&oe=624F919B' />
      <Post creator="omegaCreator" statement="Glorious Stars" imageURL='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/078891c3-ba8a-4d99-926d-7e5bfcb77250/dcxco7d-60f7f803-82f3-4239-8a39-b1a5c9034716.jpg/v1/fill/w_1024,h_576,q_75,strp/glorious_night_by_maelstromart_dcxco7d-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvMDc4ODkxYzMtYmE4YS00ZDk5LTkyNmQtN2U1YmZjYjc3MjUwXC9kY3hjbzdkLTYwZjdmODAzLTgyZjMtNDIzOS04YTM5LWIxYTVjOTAzNDcxNi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.rQKCCNeIbjr1QmCppW6dCtSeRTWWUyBQ7PvmILQJ4a4' />

      

    </div>
  );
}//##################################################################

export default App;


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

    // <Post creator="betaCreator" statement="Glorious Sunset" imageURL='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52fea380-ab72-4b0f-8fbf-7f4c918d20c5/debblug-35aa9437-1e77-4ad2-9331-ee73dc05af09.jpg/v1/fill/w_1280,h_792,q_75,strp/glorious_sunset_by_otherunicorn_debblug-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzkyIiwicGF0aCI6IlwvZlwvNTJmZWEzODAtYWI3Mi00YjBmLThmYmYtN2Y0YzkxOGQyMGM1XC9kZWJibHVnLTM1YWE5NDM3LTFlNzctNGFkMi05MzMxLWVlNzNkYzA1YWYwOS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.eJmJskNT4QRlk3F0ObLeHJ7ojRv2kCq_Oq4cNFBUWMo' />
    // <Post creator="alphaCreator" statement="Glorious Colours" imageURL='https://scontent.fyyc2-1.fna.fbcdn.net/v/t31.18172-8/13909166_904675839643273_2272836934698788241_o.jpg?_nc_cat=100&ccb=1-5&_nc_sid=973b4a&_nc_ohc=HL-hL2PeqI0AX-Yp8Nk&_nc_ht=scontent.fyyc2-1.fna&oh=00_AT8FWMqFZ46FiTYemLPlvFi8qvaDYqBttVUFOf1kBiOf0w&oe=624F919B' />
    // <Post creator="omegaCreator" statement="Glorious Stars" imageURL='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/078891c3-ba8a-4d99-926d-7e5bfcb77250/dcxco7d-60f7f803-82f3-4239-8a39-b1a5c9034716.jpg/v1/fill/w_1024,h_576,q_75,strp/glorious_night_by_maelstromart_dcxco7d-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvMDc4ODkxYzMtYmE4YS00ZDk5LTkyNmQtN2U1YmZjYjc3MjUwXC9kY3hjbzdkLTYwZjdmODAzLTgyZjMtNDIzOS04YTM5LWIxYTVjOTAzNDcxNi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.rQKCCNeIbjr1QmCppW6dCtSeRTWWUyBQ7PvmILQJ4a4' />


  //   {user?.username ? ( //java optional, dont require try and catch
  //   <ImageUpload username={user.displayName}/>
  // ): (
  //   <center> <h3>Login to share</h3></center>
  // )}
      