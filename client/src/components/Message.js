import React,{useState, useEffect} from 'react'
import axios from 'axios'
import socketIOClient from "socket.io-client";
import { useCookies } from 'react-cookie';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  const ENDPOINT = "http://localhost:3000";
function Message(props) {
    const [cookies, setCookie] = useCookies(['userid']);

    const socket = socketIOClient(ENDPOINT);
    // let { id } = useParams();
    const [messages, setmessages] = useState();
    const [content, setcontent] = useState();
    useEffect(()=>{
        // alert(props.id)
        socket.on(`message`,data=>{
            alert("costien")
            axios.get( `/chat/${props.id}`).then((res)=>{
                setmessages(res.data.message);
            })
        })
        axios.get( `/chat/${props.id}`).then((res)=>{
            setmessages(res.data.message);
    })
    },[props.id])

    const handleSubmit =(e)=>{
        e.preventDefault();
        socket.emit(`message`,{
            sender: props.id,
            receiver: cookies.userid
        });
        axios.post(`/chat/${props.id}`,{
            content: content,
            viewer: messages[0].viewer[0],

        }).then(res=>{
            
        })
        
    }

    return (
      <div>
        <input name='content' value={content} placeholder="Enter your messages" onChange={e=>setcontent(e.target.value)}/>
        <button onClick={handleSubmit}>Send</button>
        {messages?messages.map((message, index)=>{
            return(
            <div key={index}>{message.sender}: {message.content}</div>
            )
        }):'loading'}
      </div>
    );
  }
export default Message;