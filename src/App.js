
import React, { useState,useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user,room }, dispatch] = useStateValue();

  return (
    <div className="app">
    {!user ? (
<Login/>
    ) : (
      
<div className="app__body">
        <Router>
          <Sidebar />

          <Switch>
            <Route path={`/rooms/${room}`}>
              <Chat  room={room}/>
            </Route>
            <Route path="/" exact>
              <Welcome />
            </Route>
          </Switch>
        </Router>
      </div>
    )}
  </div>
  );
}

export default App;
