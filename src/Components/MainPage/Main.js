import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AddPost from "./AddPost";
import Footer from "./Footer";
import "./Main.css";
import "./Post.css";

function Main() {

  const [posts,setPosts] =useState([])
  const change = false

   useEffect(() => {
     const token = localStorage.getItem("access_token");
     fetch("http://localhost:5000/postsget", {
       method: "GET",
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
       .then((res) => {
         return res.json();
       })
       .then((response) => {
         console.log(response);
         setPosts(response);
       });
   }, [change]);

   const deletePost =(id)=>{
      const token = localStorage.getItem("access_token");
      fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res)=>{
        return res.json();
      }).then(response =>{
        window.location.reload();
       
      }).catch(e=>{
        console.log(e)
      });
   }
  return (
    <div className="mainpage__container">
      <Navbar />
      <AddPost />
      {posts.map((element)=>{
        
        return (
          <div className="post__container">
            <div className="post__content-container">
              <p className="post__title">{element.title}</p>
              <p className="post__description">{element.content}</p>
              <button className="post__button" onClick={()=>{deletePost(element.id)}}>Delete Post</button>
            </div>
          </div>
        );
      })}
    
      <Footer />
    </div>
  );
}

export default Main;
