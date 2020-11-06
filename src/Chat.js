import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";

import { useStateValue } from "./StateProvider";
import Pusher from 'pusher-js';
import axios from "./axios";



function Chat({room}) {
  const [input, setInput] = useState("");

 
  const [seed, setSeed] = useState("");
 

  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setMessages([]);
    console.log("in the work1");
    if(room!=null)
    {
     
      console.log(room);
      console.log(user.displayName);
      axios.post("/messages/getallmessagesoftheroom",
      {
        "name":user.displayName,
        "room":room
      }).then((response) => {
        console.log(response);
        setMessages(response.data.mes);
      });

    }
  }, [room]);

   

    useEffect(() => {
      const pusher = new Pusher("2b3fc78162290240f28f", {
        cluster: "ap2",
      });
  
      const channel = pusher.subscribe("message");
      channel.bind("inserted", (newMessage) => {
        if(newMessage.room==room)
        {
         if(newMessage.name==user.displayName)
         { setMessages([...messages, { 
          
          "name": newMessage.name,
          "message": newMessage.message,
          "timestamp":newMessage.timestamp,
          "received":true
         
     }]);}
         else
         { setMessages([...messages, { 
          
          "name": newMessage.name,
          "message": newMessage.message,
          "timestamp":newMessage.timestamp,
          "received":false
         
     }]);}

        }
      });


      
   
       
  
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }, [messages]);



  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [room]);





  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>> ", input);

    axios.post("/messages/sendmessagetouserroom",
    {
      "name":user.displayName,
      "room":room,
      "message":input,
      "timestamp":new Date(),
      
    }).then((response) => {
     
    });
    
    
    axios.post("/messages/sendmessagetofriendroom",
    {
      "name":user.displayName,
      "room":room,
      "message":input,
      "timestamp":new Date(),
     
    }).then((response) => {
     
    });


    

    axios.post("/messages/sendtorealtimedata",
    {
      "name":user.displayName,
      "room":room,
      "message":input,
      "timestamp":new Date(),
      
    }).then((response) => {
     
    });


 
    
    


    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
  
  <h3>{room}</h3>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {message.timestamp}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
