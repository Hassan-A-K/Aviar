import React from 'react';
import './Post.css';
//import Avatar from "@material-ui-/core/Avatar";
import { Avatar } from '@material-ui/core';



function Post({creator, statement, imageURL}){
    return(
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

        </div>
    )
}
export default Post