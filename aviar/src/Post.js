import React, { useState, useEffect } from 'react';
import './Post.css';
//import Avatar from "@material-ui-/core/Avatar";
import { Avatar } from '@material-ui/core';
import { db } from './firebase';
import firebase from 'firebase/compat/app';






function Post({postId, creator, user, statement, imageURL}){
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if (postId) { // <- 2. it refires this
            unsubscribe = db
            .collection('posts')
            .doc(postId)
            .collection('comments')
            //.orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };
    },[postId]); // <- 1. depedency var if this variable changes

    const postComment = (event) => {
        event.preventDefault();

        db.collection('posts').doc(postId)
        .collection(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue
        })
        setComment('');
    }

    return(//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
        <div className="post">
            {/* image */}
            <img className="post__piece"
            src={imageURL}
            alt={imageURL}/>

            {/* avatar + artist */}
            <div className="post__bottom">
                  <Avatar
                className="post__avatar"
                alt={creator}
                src="/static/images/avatar/1.jpg"
                    />

                {/* caption */}
                <h4 className='post__text'><strong>{creator}</strong> {statement}</h4>
            </div>
            <div className="post__comments">
                {
                comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))
                }
            </div>
            {user && (
                <form className="post__commentBox">
                    <input className ="post__input"
                    type="text"
                    placeholder="Share a few words"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                    className='post__button'
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                    >
                    Post
                    </button>
                </form>
            )}
           
        </div>
    )
}
export default Post