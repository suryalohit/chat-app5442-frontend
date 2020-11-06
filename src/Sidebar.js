import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

import { useStateValue } from "./StateProvider";
import axios from "./axios";
import { actionTypes } from "./reducer";


function Sidebar() {
  
  const [{ user,room,roomlist ,start}, dispatch] = useStateValue();
  

  useEffect(() => {
    //set all rooms in the sidebar using d
    if(room)
    {
     console.log("inroom");
     axios.post("/messages/getallroomsofuser",
     {
       "name":user.displayName,
      
     }).then((response) => {
       console.log(response.data.mes);
       dispatch({
         type: actionTypes.ADD_ROOM_TO_ROOMLIST,
         roomlist: response.data.mes,
       });
       
     });
 
    }
  
    
    return () => {};
  }, [start]);

  

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search...." type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat create_new_chat   />
        <SidebarChat add_to_new_chat    />
        {roomlist.map((roomt) => (
          <SidebarChat  name={roomt}  roomt={roomt} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
