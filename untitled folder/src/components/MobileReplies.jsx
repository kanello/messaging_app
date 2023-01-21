import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosWithAuth from "../auth";

function MobileReplies() {
  const [response, setResponse] = useState();
  const [msg, setMsg] = useState();
  const params = useParams();

  useEffect(() => {
    // setInterval(() => {
    axiosWithAuth()
      .get(`/get-replies/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setMsg(res.data);
      })
      .catch((error) => console.log(error));
    // }, 3000);
  }, []);

  function writeResponse(e) {
    setResponse(e.target.value);
  }

  function postReply(e) {
    e.preventDefault();

    const newMessage = {
      reply_body: response,
      user_id: localStorage.getItem("id"),
      msg_id: params.id,
    };

    axiosWithAuth()
      .post("/write-reply", newMessage)
      .then(() => setResponse(""))
      .catch((error) => console.log(error));
  }

  if (!msg) {
    return <h3 style={{ textAlign: "center", margin: "25vh" }}>Loading...</h3>;
  }

  return (
    <div className="Replies">
      {/* <h3>
        <u>Thread</u>
      </h3>
      <div className="replybody">{msg.body}</div>
      <div className="replyauthor">{msg.author}</div>
      <div className="replytime">{msg.time}</div>

      <br></br> */}

      <h3>
        <u>Replies</u>
      </h3>
      {msg.map((reply) => {
        return (
          <div key={reply.reply_id} className="message">
            <div className="replyauthor">{reply.author}</div>
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

export default MobileReplies;
