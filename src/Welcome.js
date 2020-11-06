import React from 'react'
import { useStateValue } from "./StateProvider";
import "./welcome.css";
function Welcome() {
    const [{user,room,roomlist}, dispatch] = useStateValue();
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
    <h2 >welcome to chat  <br/>Please create/enter into a room to start chating....<br/></h2>
        </div>
    )
}

export default Welcome
