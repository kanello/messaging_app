import axios from "axios";
import { useState } from "react";

function Replies({ replies, msg }) {
  const [response, setResponse] = useState();
  const [message_id, setMessage_id] = useState();

  // console.log(msg_id);
  function writeResponse(e) {
    setResponse(e.target.value);
  }

  function postReply(e) {
    e.preventDefault();
    setMessage_id(msg.msg_id);

    const newMessage = {
      reply_body: response,
      user_id: localStorage.getItem("id"),
      msg_id: msg.msg_id,
    };

    console.log(message_id);
    newMessage["msg_id"] = message_id;
    console.log(newMessage);
    axios
      .post("http://localhost:5000/write-reply", newMessage)
      .then(() => setResponse(""))
      .catch((error) => console.log(error));
  }

  return (
    <div className="Replies">
      <h3>
        <u>Thread</u>
      </h3>
      <div className="replybody">{msg.body}</div>
      <div className="replyauthor">{msg.author}</div>
      <div className="replytime">{msg.time}</div>

      <br></br>

      <h3>
        <u>Replies</u>
      </h3>
      {replies.map((reply) => {
        return (
          <div key={reply.reply_id} className="message">
            <div className="replyauthor">{reply.user_name}</div>
            <div className="replybody">{reply.reply_body}</div>
            <div className="replytime">{reply.sent_time}</div>
          </div>
        );
      })}
      <form onSubmit={postReply} className="submitResponse">
        <input
          name="response"
          type="text"
          required
          placeholder="Reply..."
          value={response}
          onChange={writeResponse}
        ></input>
        <button>Send</button>
      </form>
    </div>
  );
}

export default Replies;
