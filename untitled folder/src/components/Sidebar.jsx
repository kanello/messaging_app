import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../auth";

function Sidebar() {
  const [channels, setChannels] = useState();
  const [channel_added, setNewChannel] = useState("");

  useEffect(() => {
    // setInterval(() => {
    axiosWithAuth()
      .get("/get-channels")
      .then((res) => setChannels(res.data))
      .catch((error) => console.log(error));
  }, []);
  // }, 3000);

  function clearNewChannel(e) {
    setNewChannel(e.target.value);
  }

  function addChannel(e) {
    e.preventDefault();
    const newChannel = {
      channel_name: channel_added,
    };
    axiosWithAuth()
      .post("/create-channel", newChannel)
      .then(() => setNewChannel(""))
      .catch((error) => console.log(error));
  }

  if (!channels) {
    return <h3>You have no channels yet! Try creating one...</h3>;
  }
  return (
    <div className="Sidebar">
      <div className="ChannelList">
        <h2>Channels</h2>
        <div className="NewChannel">Create New Channel</div>
        <form onSubmit={addChannel}>
          <input
            name="channel"
            type="text"
            required
            placeholder="channel name"
            value={channel_added}
            onChange={clearNewChannel}
          />
          <button className="ChannelButton">+</button>
        </form>
        <br></br>
        {channels.map((channel) => {
          return (
            <div key={channel.channel_id}>
              <Link to={`/channel/${channel.channel_id}`}>
                {channel.channel_name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
