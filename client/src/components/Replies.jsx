import React from "react";
import { useState } from "react";

const Replies = () => {
  const [reply, setReply] = useState("");

  const handleSubmitReply = (e) => {
    e.preventDefault();
    console.log({ reply });
    setReply("");
  };
  return (
    <main className="replies">
      <form className="modal__content" onSubmit={handleSubmitReply}>
        <label htmlFor="reply">Reply to the thread</label>
        <textarea
          className="modalInput"
          name="reply"
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={5}
        ></textarea>
        <button className="modalBtn">SEND</button>
      </form>
    </main>
  );
};

export default Replies;
