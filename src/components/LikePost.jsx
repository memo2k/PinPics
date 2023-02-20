import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useReducer } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';

const LikePost = ({ id, likes }) => {
    const { user } = UserAuth();

    const likesRef = doc(db, "posts", id);

    const handleLike = () => {
        if (user && likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid),
            });
        }

        else {
            updateDoc(likesRef, {
                likes: arrayUnion(user.uid),
            });
        }
    }

  return (
    <button 
    onClick={handleLike} 
    className='btn btn--like' 
    style={{ backgroundColor: likes?.includes(user.uid) ? "#ff3c3c" : null,
     color: likes?.includes(user.uid) ? "#fff" : null,
     border: likes?.includes(user.uid) ? "none" : null }}
    >
        <i className="fa-regular fa-heart fa-xl"></i>
    </button>
  )
}

export default LikePost