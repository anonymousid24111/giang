import React,{useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import socketIOClient from "socket.io-client";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import Message from '../../components/Message'
const ENDPOINT = "http://localhost:3000";
function Chat(){
    const [cookies, setCookie] = useCookies(['userid']);
    const socket = socketIOClient(ENDPOINT);
    


    let { path, url } = useRouteMatch();
    let { id } = useParams();
    const [current, setcurrent]= useState(id)
    const [chats, setchats] = useState();
    socket.emit("connectto", cookies.userid);
    const [messages, setmessages] = useState();
    const [content, setcontent] = useState();
    useEffect(()=>{
        axios.get('/chat').then(res=>{
            setchats(res.data.chat);
        })
        axios.get( `/chat/${current}`).then((res)=>{
            setmessages(res.data.message);
        })
        socket.on('message', data=>{
            // alert('co tin nhan ')
            axios.get('/chat').then(res=>{
                setchats(res.data.chat);
            })
            alert("costien")
            
        })
    },[current])
        // alert(current)
    //     socket.on(`message`,data=>{
            
    //     })
    //     axios.get( `/chat/${current}`).then((res)=>{
    //         setmessages(res.data.message);
    // })
    // },[current])

    const handleSubmit =(e)=>{
        e.preventDefault();
        socket.emit(`message`,{
            sender: current,
            receiver: cookies.userid
        });
        axios.post(`/chat/${current}`,{
            content: content,
            viewer: messages[0].viewer[0],

        }).then(res=>{
            
        })
        
    }
    return(
        <Router>
            
            <div className="left">
                {chats?chats.map((chat, index)=>{
                    return(<div key={index}>
                    <Link to={`${url}/${chat._id}`} onClick={e=>setcurrent(chat._id)}>{chat.chatname}</Link>
                    <div>{chat.message[0].content}</div>
                    </div>
                    )
                }):'Loading'}
                
            </div>
            <div className="right">
                <div className='ite'>
                    <form className="form">
                    <input name='content' value={content} placeholder="Enter your messages" onChange={e=>setcontent(e.target.value)}/>
                    <button onClick={handleSubmit}>Send</button>
                    </form>
                    
                    {messages?messages.map((message, index)=>{
                        return(
                        <div key={index}>{message.sender}: {message.content}</div>
                        )
                    }):'loading'}
                </div>
            </div>
        <style jsx>{`
            .left{
                width: 30%;
                background-color: red;
                float: left;
                // height: 100%;
                height: 100%;
                position: fixed;
                overflow-x: hidden;
            }
            .right{
                float: left;
                width: 60%;
                display: block;
                background-color: blue;
                height: 100%;
                position: fixed;
                margin-left: 30%;
                padding-right: 40px;
                padding: 0px 40px;
                overflow: auto;
                margin-botton: 20px;
            }
            .form{
                display: fixed;
            }
        `}</style>
        </Router>
    )
}
export default Chat;