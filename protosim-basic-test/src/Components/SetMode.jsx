import { useEffect, useState } from "react";
import { useBlueBird } from "../../contexts/AppContext";

export default function SetMode() {
  const { socketRef, recievedMessages, counters } = useBlueBird();
  const [mavmode, setMavMode] = useState("");
  const [customMode, setCustomMode] = useState("");
  const [isPinned,setIsPinned] = useState(false);
  const [messageCount,setMesseageCount] = useState(0);
  const [isHover, setIsHover] = useState(false)
  useEffect(function(){
    let count = 0;
    recievedMessages.forEach(mes => {
      if(mes.message === "11"){
        // console.log(mes)
        count++
        // console.log(count)
        // setMesseageCount(prevCount => prevCount + 1);
      }
      
    });
    setMesseageCount(count)
  },[recievedMessages])

  const sendSetMode = () => {
    const message = {
      type: "SetMode",
      message: {
        // timestamp: "12:20:00",
        mav_mode: "A",
        custom_mode: 4,
      },
    };

    if (socketRef.current.readyState === 1) {
      // checking if the connection is open
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.log(
        "WebSocket connection is not open. readyState: ",
        socketRef.current.readyState
      );
    }
  };
  return (
    <div
      className="message-wrapper"
      style={{ backgroundColor: "rgb(195 139 59 / 74%)" }}
      onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
    >
      <button onClick={() => setIsPinned((pinned) => !pinned)} className={`pin ${isHover? "pinHover" : null } ${isPinned? "pinHover" : null }`}><img className="pin-image" src={`${isPinned? "/unpin.png" : "/pinn.png"}`}/></button>
      <div>
        <div className="messeage-counter">[{counters["11"] || 0}]</div>
        <label htmlFor="">MAV_MODE</label>
        <select name="" id="">
          <option value="A">A</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Custom mode</label>
        <select name="" id="">
          <option value="4">4</option>
        </select>
      </div>
      <button onClick={() => sendSetMode()}>send</button>
    </div>
  );
}

