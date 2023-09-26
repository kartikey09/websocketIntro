import { useState } from 'react'
import './App.css'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3002', ()=>console.log('connected'));
function App() {
  const [msg, setMsg] = useState()
  const dispatchMessage = () =>{
    socket.emit('send_message', {message : msg});
  }
  return (
    <>
      <div>
        <input value = {msg} onChange={(e)=>setMsg(e.target.value)}></input>
        <button onClick={dispatchMessage}>Send Message</button>
      </div>
    </>
  )
}

export default App
