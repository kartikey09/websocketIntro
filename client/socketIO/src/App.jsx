import { useState, useEffect, useRef, createElement } from 'react'
import './App.css'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3002', ()=>console.log('connected'));
function App() {
  const [msg, setMsg] = useState();
  const [list, setList] = useState([]);
  const dispatchMessage = () =>{
    socket.emit('send_message', {message : msg});
  }
  useEffect(()=>{
      socket.on('recieve_message', (data)=>{
        setList(p=>[...p, data.message]);
      })
  },[socket]);
  console.log(list);
  return (
    <>
      <div>
        <input onChange={(e)=>setMsg(e.target.value)}></input>
        <button onClick={dispatchMessage}>Send Message</button>
        <div>
          {list.map((obj, idx)=>{
            return <li key={idx}>{obj}</li>
          })}
        </div>
      </div>
    </>
  )
}

export default App
