import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import "./invite.css"

const Invite = (props) => {
  const [invite, setInvite] = useState("generating...");

  useEffect(() => {
    const data = {url: window.location.href}
    axios.post("/api/rooms/invite", data)
      .then(res => {
        console.log(res.data.inviteLink);
        setInvite(res.data.inviteLink)
      })
  }, [])

  return (
    <div className="invite-container">
      <h1>Invite Link</h1>
      <div className="textbox">
        {invite}
      </div>
    </div>
  )
}

export default Invite;