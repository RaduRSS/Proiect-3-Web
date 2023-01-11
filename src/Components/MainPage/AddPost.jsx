import React from "react";
import { useState } from "react";
import "./AddPost.css";
import "../Assets/Modal.css";

function AddPost() {
  const [modal, setModal] = useState(false);
  const [title,setTitle] = useState();
  const [content,setContent] = useState();

  function toggleModal() {
    setModal(!modal);
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const addPost = ()=>{
    if(title!== undefined && content !== undefined){
       const token = localStorage.getItem("access_token");
       fetch("http://localhost:5000/posts", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({title:title, content:content}),
       })
         .then((res) => res.json())
         .then((data) => {
          window.location.reload();
           console.log(data);
         });
    }
  }
  return (
    <>
      <div className="addpost__container">
        <button onClick={toggleModal} className="addpost__button">
          Add Post
        </button>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="modal__overlay"></div>
          <div className="modal__content">
            <div className="modal__title-container">
              <label className="modal__title">Your Post Title:</label>
              <input
                type="text"
                className="modal__input"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="modal__content-container">
              <label className="modal__content-title">Your Post Content:</label>
              <input
                type="text"
                className="modal__content-input"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div>
              <button className="modal__button-add" onClick={()=>{addPost()}}>Add</button>
              <button className="modal__button-delete" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddPost;
