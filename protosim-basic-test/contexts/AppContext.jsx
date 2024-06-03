import {createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

function AppProvider({ children }) {
  const [recievedMessages, setRecievedMessages] = useState([]);
  const [gcsPort, setGcsPort] = useState(0);
  const [uavPort, setUavPort] = useState(0);
  // const [messeagesCount, setMesseagesCount] = useState({"11":0, "30":0})
  const [counters, setCounters] = useState({});
  const socketRef = useRef(null);
  const [switchPosition, setSwitchPosition] = useState('left');  // Added switch state here
  const [tempDataTransfer, setTempDataTransfer] = useState(null)
  const navigate = useNavigate();

  const notifySuccess = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text)


  const handleIncrement = (itemId) => {
    setCounters(prevCounters => ({
      ...prevCounters,
      [itemId]: (prevCounters[itemId] || 0) + 1
    }));
  };


  function trimTimestamp(timestamp){
    let ts = timestamp.split("T")[1].split("Z")[0];
    let afterDecimal = Number(ts.split(":")[2]).toFixed(3);
    // Construct the updated timestamp string
    let updatedTs = ts.split(":");
    updatedTs[2] = afterDecimal;
    let trimmedTimestamp = updatedTs.join(":");
    return trimmedTimestamp;
  }

  const initializeGCS = () => {
    socketRef.current.send(JSON.stringify({ type: 'INIT_GCS', port:gcsPort }));
    // navigate('/protosim-app/gcsside')

};

const initializeUAV = () => {
    socketRef.current.send(JSON.stringify({ type: 'INIT_UAV', port:uavPort }));
    // navigate('/protosim-app/uavside')
    
};
const initializeBoth = () => {
    socketRef.current.send(JSON.stringify({ type: 'INIT_BOTH', port1:uavPort,port2:gcsPort }));
    navigate('/protosim-app/bothsides')
    
};

// useEffect(function(){
//   if(switchPosition === 'left') navigate('/protosim-app/uavside')
//   if(switchPosition === 'right') navigate('/protosim-app/gcsside')
// },[switchPosition])
  useEffect(() => {
    socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/socket.io/");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
      notifySuccess("WebSocket connection opened")

    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "TABLE_UPDATED") {  //handles the server triggering that occours whenever there is a new record in the table
        setRecievedMessages((newM) => [...newM, ...data.message]);
        data.message.forEach(mes => { // setting the counter for each message component, representing how many messeages from this type in the table
          // console.log(mes)
          handleIncrement(mes.message)
        });
      }
      if(data.message === "GCS Initialized"){ //Indicates that django recived the request and finished opening GCS
        notifySuccess(data.message)
        navigate("/protosim-app/gcsside")
      }
      if(data.message === "UAV Initialized"){ //Indicates that django recived the request and finished opening UAV
        notifySuccess(data.message)
        navigate("/protosim-app/uavside")
      }
      if(data.message === "UAV and GCS Initialized"){ //Indicates that django recived the request and finished opening UAV
        notifySuccess(data.message)
        navigate("/protosim-app/bothsides")
      }
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      notifyFail("WebSocket connection closed")
    };

    // Connection error
    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      notifyFail("WebSocket connection Clean")
      socketRef.current.close();
    };
  }, []);


  return <AppContext.Provider value={{setTempDataTransfer,tempDataTransfer,initializeBoth,trimTimestamp,counters,recievedMessages,setRecievedMessages,socketRef,initializeGCS,initializeUAV,setGcsPort,setUavPort,switchPosition, setSwitchPosition}}>{children}</AppContext.Provider>;
}



function useBlueBird() {
    const context = useContext(AppContext);
    if (context === undefined)
      throw new Error("AppContext was used outside AppProvider");
    return context;
  }

export {AppProvider, useBlueBird}
