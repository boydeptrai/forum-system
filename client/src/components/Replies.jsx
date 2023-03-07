import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom"

const Replies = () => {
  const [replyList,setReplyList] = useState([])
  const [title,setTitle] = useState("")
  const [reply, setReply] = useState("");
  
  const navigate = useNavigate()
  const {id} = useParams()

  const  addReply = () =>{
    fetch("http://localhost:4000/api/create/reply",{
      method: "POST",
      body:JSON.stringify({
        id,
        userId: localStorage.getItem("_id"),
        reply,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    })
    .then((res) =>res.json)
    .then((data) =>{
      alert(data.message)
      navigate("/dashboard")
    })
    .catch((err) =>console.log(err))
  }

  useEffect(() =>{
    const fetchReplies = () =>{
      fetch("http://localhost:4000/api/thread/replies",{
        method: "POST",
        body:JSON.stringify({
          id,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then((res) =>res.json())
      .then((data) =>{
        setReplyList(data.replies)
        setTitle(data.title)
      })
      .catch((err) =>console.log(err))
    }
    fetchReplies()
  },[id])

  const handleSubmitReply = (e) => {
    e.preventDefault();
    addReply();
    setReply("");
  };
  return (
    <main className="replies">
    <h1 className="repliesTitle">{title}</h1>
      <form className="modal__content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          rows={5}
          value={reply}
          className="modalInput"
          name="reply"
          type="text"
          onChange={(e) => setReply(e.target.value)}
        ></textarea>
        <button className="modalBtn">SEND</button>
      </form>
      <div className="thread__container">
        {replyList.map((reply) =>(
          <div className="thread__item">
            <p>{reply.text}</p>
            <div className="react__container">
              <p style={{opacity: "0.5"}}>by {reply.name}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Replies;
