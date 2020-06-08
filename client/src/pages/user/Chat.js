import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
function Call(){
    let { path, url } = useRouteMatch();
    const [chats, setchats] = useState();
    useEffect(()=>{
        axios.get('/chat').then(res=>{
            if(res.data.chats===chats) setchats(res.data.chat)
            // console.log(chats)
        })
    })
    return(
        <Router>
            
            <div className="left">
                {chats?chats.map((chat, index)=>{
                    return(<div key={index}>
                    <Link to={`${url}/${chat._id}`}>{chat.chatname}</Link>
                    <div>{chat.message[0].content}</div>
                    </div>
                    )
                }):'Loading'}
                
            </div>
            <div className="right">
            <Switch>
                <Route path="/user/chat/:id" children={<Child />} />
                </Switch>
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
            }
        
        `}</style>
        </Router>
    )
}
export default Call;
function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    const [messages, setmessages] = useState();
    useEffect(()=>{
        axios.get( `/chat/${id}`).then((res)=>{
            if(res.data.messages===messages){
                setmessages(res.data.message)
            } 
        })
    })
    return (
      <div>
        {/* <h3>ID: {id}</h3> */}
        {messages?messages.map((message, index)=>{
            return(
            <div key={index}>{message.sender}: {message.content}</div>
            )
        }):'loading'}
      </div>
    );
  }