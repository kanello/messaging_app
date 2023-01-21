import { useEffect, useState } from "react";
import Replies from "./Replies";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axiosWithAuth from "../auth";

function Channel() {
  const [messages, setMessages] = useState();
  const [channelName, setChannelName] = useState();
  const [userMessage, setUserMessage] = useState("");
  const [showReplies, setShowReplies] = useState("hidden");
  const [msgId, setmsgId] = useState("");
  const { innerWidth } = window;
  const navigate = useNavigate();
  const params = useParams();

  // this gets the channel name and the messages for that channel to populate screen
  // something is broken though and every time the use effect is triggered, it sets of a new interval function so we end up having many get requests overlapping and killing what is shown on the front end
  useEffect(() => {
    // const interval = setInterval(() => {
    axiosWithAuth()
      .get(`/get-messages/${params.id}`)
      .then((res) => setMessages(res.data))
      .catch((error) => console.log(error));

    axiosWithAuth()
      .get(`/get-channel/${params.id}`)
      .then((res) => setChannelName(res.data))
      .catch((error) => console.log(error));
    // }, 3000);
    // return () => clearInterval(interval);
  }, [params.id]);

  if (!messages) {
    return (
      <h3 style={{ textAlign: "center", margin: "25vh" }}>
        Please login <Link to="/">here</Link>
      </h3>
    );
  }

  function writeMessge(e) {
    setUserMessage(e.target.value);
  }

  function postMessage(e) {
    e.preventDefault();
    const newMessage = {
      message_body: userMessage,
      user_id: localStorage.getItem("id"),
      channel_id: params.id,
    };
    axiosWithAuth()
      .post("/write-message", newMessage)
      .then(() => setUserMessage(""))
      .catch((error) => console.log(error));
  }

  function clickReplies(msg_id) {
    if (innerWidth <= 500) {
      navigate(`/replies/${msg_id}`);
      console.log("target");
    } else {
      setShowReplies("");
      setmsgId(msg_id);
    }
  }

  return (
    <div className="slack">
      <Sidebar />
      <div className="Channels">
        <div className="ChannelName">
          <Link to="/channels" className="channelLink hidden">
            Channels
          </Link>
          <h2>{channelName}</h2>
        </div>
        <div className="messages">
          {messages.map((message) => {
            return (
              <div key={message.msg_id}>
                <div className="message">
                  <div className="author">{message.author}</div>
                  <div className="body">{message.body}</div>
                  <div className="time">{message.time}</div>
                  <div className="image">
                    {
                      //Check if images
                      message.images.length === 0 ? null : (
                        <img
                          src={`${message.images[0]}`}
                          alt={`${message.images[0]}`}
                        />
                      )
                    }
                  </div>
                  <div className="reply">
                    {
                      //Check # of replies
                      message.replies.length === 0 ? (
                        <div onClick={() => clickReplies(message.msg_id)}>
                          Respond
                        </div>
                      ) : message.replies.length === 1 ? (
                        <div onClick={() => clickReplies(message.msg_id)}>
                          1 Reply
                        </div>
                      ) : (
                        <div onClick={() => clickReplies(message.msg_id)}>
                          {message.replies.length} Replies
                        </div>
                      )
                    }
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
        </div>
        <form onSubmit={postMessage} className="postMessage">
          <input
            name="message"
            type="text"
            required
            placeholder="Write msg here..."
            value={userMessage}
            onChange={writeMessge}
          />
          <button>Send</button>
        </form>
      </div>
      <div className={`RepliesBox ${showReplies}`}>
        <button onClick={() => setShowReplies("hidden")}>X</button>
        {messages
          .filter((message) => message.msg_id === msgId)

          .map((message) => {
            // console.log(message.replies);
            return <Replies replies={message.replies} msg={message} />;
          })}
      </div>
    </div>
  );
}

export default Channel;
