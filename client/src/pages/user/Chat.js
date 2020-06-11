import React,{useState, useEffect} from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import Message from '../../components/Message'
import socketIOClient from "socket.io-client";
// import { postchat } from '../../../../controllers/chat.controller';
// import user from '../../../../models/user.model';
const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);
function Chat(){
    const [cookies, setCookie] = useCookies(['userid']);
    let { path, url } = useRouteMatch();
    let { id } = useParams();
    const [chatroomid, setchatroomid]= useState(id)
    const [receiverid, setreceiverid]= useState()
    const [chats, setchats] = useState();
    
    const [messages, setmessages] = useState();
    const [content, setcontent] = useState();
    const [username, setusername] = useState();

    
    useEffect(()=>{
        // console.log('chay lan dau tien'+chatroomid)
        socket.emit("connectto", {
            username: cookies.username,
            userid: cookies.userid});
        axios.get('/chat').then(res=>{
            setchats(res.data.chat);
            if((res.status===200)&&(!chatroomid)) {
                if(res.data.chat[0]){
                    setmessages(res.data.chat[0].message);

                    setchatroomid(res.data.chat[0]._id)
                    setreceiverid(res.data.chat[0].member)
                } 
                
            }
            else if(chatroomid){
                // setchatroomid
                axios.get( `/chat/${chatroomid}`).then((res)=>{
                    setmessages(res.data.message);
                })
            }
        })
        socket.on('message', data=>{
            // alert('co tin nhan ')
            // console.log('effect 2 mess'+chatroomid)
            axios.get('/chat').then(res=>{
                setchats(res.data.chat);
            })
            console.log(chatroomid)
            // if(chatroomid){
            axios.get( `/chat/${data.chatroomid}`).then((res)=>{
                    setmessages(res.data.message);
                })
            // }
            
        })
    },[])
    useEffect(()=>{
        // socket.on('call',data=>{
        //     alert('chat')
        // })
        // console.log('chi chay khi chatroomid thay doi: '+chatroomid)
        if(chatroomid){
            axios.get( `/chat/${chatroomid}`).then((res)=>{
                setmessages(res.data.message);
            })
        }
        // socket.on('message', data=>{
        //     // alert('co tin nhan ')
        //     // console.log('effect 2 mess'+chatroomid)
        //     axios.get('/chat').then(res=>{
        //         setchats(res.data.chat);
        //     })
        //     console.log(chatroomid)
        //     // if(chatroomid){
        //     axios.get( `/chat/${data.chatroomid}`).then((res)=>{
        //             setmessages(res.data.message);
        //         })
        //     // }
            
        // })
        
        console.log('cuoi e3; '+chatroomid)
    },[chatroomid])

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(chatroomid){
            
            setcontent('')
            axios.post(`/chat/${chatroomid}`,{
                content: content,
                viewer: receiverid,
            }).then(res=>{
                socket.emit(`message`,{
                    sender: cookies.userid,
                    receiver: receiverid,
                    chatroomid: chatroomid
                });
                axios.get('/chat').then(res=>{
                    setchats(res.data.chat);
                    if((res.status===200)&&(!chatroomid)) {setmessages(res.data.chat[0].message);
                        setchatroomid(res.data.chat[0]._id)
                        setreceiverid(res.data.chat[0].member)
                    }
                    else if(chatroomid){
                        // setchatroomid
                        axios.get( `/chat/${chatroomid}`).then((res)=>{
                            setmessages(res.data.message);
                        })
                    }
                })
            })

        }
        
    }
    var postchat=(e)=>{
        e.preventDefault()
        axios.get( `/postchat?receiver=${username}`).then(res=>{
            if (res.status===200) {
                alert('thanjcong')
            } else {
                alert('that bai')
            }
        }) 
    } 
    return(
        <Router>
            
            <div className="left">
                {/* {chatroomid} */}
                <form onSubmit={postchat}>
                    <input type='text' value={username} onChange={e=>setusername(e.target.value)}/>
                    <button type='submit'>Create a chat</button>
                </form>
                {chats?chats.map((chat, index)=>{
                    return(<div key={index} onClick={e=>{setchatroomid(chat._id);setreceiverid(chat.member)}}>
                    <Link to={`${url}/${chat._id}`} >{chat.chatname}</Link><br/>
                    {chat.message[0]?<div>{chat.message[0].content}</div> :'loading...'}
                    {/* <div>{chat.message[0].content}</div> */}
                    </div>
                    )
                }):'Loading'}
                
            </div>
            <div className="right">
                <div className='ite'>
                    <form className="form">
                    <input type='text' name='content' value={content} placeholder="Enter your messages" onChange={e=>setcontent(e.target.value)}/>
                    <button onClick={handleSubmit}>Send</button>
                    </form>
                    
                    {messages?messages.map((message, index)=>{
                        return(
                        <div key={index}>{message.sender.username}: {message.content}</div>
                        )
                    }):'loading'}
                </div>
            </div>
        <style jsx>{`
            .left{
                width: 30%;
                // background-color: red;
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
                // background-color: blue;
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