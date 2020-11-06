import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import axios from "./axios";
import { actionTypes } from "./reducer";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { useHistory } from 'react-router-dom';

function SidebarChat({ id, name, add_to_new_chat,create_new_chat,roomt}) {
  const history = useHistory();
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const [{ user,room,roomlist }, dispatch] = useStateValue();


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);  

  const createChat = () => {
    var roomName = prompt("Please enter name to create new chat room");

    if (roomName) {
      // do some clever database stuff...
     
     
      axios.post("/messages/createroom",
    {
      "name":user.displayName,
      "room": roomName,
      
    }).then((res)=>
    {
if(res.data.mes==1)
{
  alert("SUCCESFULLY CREATED THE NEW ROOM");
  dispatch({
    type: actionTypes.ADD_ROOM_TO_ROOMLIST,
    roomlist:roomName,
  });
  dispatch({
    type: actionTypes.SET_ROOM,
    room: roomName,
  });

}
else
alert("THIS ROOM IS ALREADY PRESENT.PLEASE ENTER NEW ROOM NAME");

    });
    

}
  };

  const addToChat = () => {
    var roomid = prompt("Please enter room name to enter chat room");

    if (roomid) {
      // do some clever database stuff...
      
      axios.post("/messages/addtonewroom",
      {
        "name":user.displayName,
        "room":roomid,
        
      }).then((res)=>
      {
  if(res.data.mes==1)
  {
    alert("SUCCESFULLY JOINED THE NEW ROOM");
    dispatch({
      type: actionTypes.ADD_ROOM_TO_ROOMLIST,
      roomlist:roomid,
    });
    dispatch({
      type: actionTypes.SET_ROOM,
      room: roomid,
    });
 
  
  }
  else
  alert("THERE IS NO ROOM AVAILBLE WITH THIS NAME");
  
      });

      


    }
  };

  return create_new_chat ? (
<div onClick={createChat} className="sidebarChat">
      <h2>Create new Chat</h2>
    </div>


   
  ) : (add_to_new_chat?
    (
    <div onClick={addToChat} className="sidebarChat">
      <h2>Add to new Chat</h2>
    </div>
    )
    :
    (
  <div className="sidebarChat"  onClick={() => {
    dispatch({
      type: actionTypes.SET_ROOM,
      room: roomt,
    });
    history.push(`/rooms/${roomt}`);
  
}}>
    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    <div className="sidebarChat__info">
      <h2>{name}</h2>
      <p>this is the last message</p>
    </div>
  </div>
)
    
  );
}

export default SidebarChat;
  