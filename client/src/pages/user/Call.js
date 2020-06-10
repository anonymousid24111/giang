import React,{useState, useEffect} from 'react'
import socketIOClient from "socket.io-client";
import { useCookies } from 'react-cookie';
const ENDPOINT = "http://localhost:3000";
const socket = socketIOClient(ENDPOINT);
function Call(){
    const [useronline, setuseronline] =useState();
    const [cookies, setCookie] = useCookies(['userid']);
    const [callden, setcallden] = useState()
    useEffect(()=>{
        socket.on('call',data=>{
            // console.log("dajkfljakdslfjlkasdjflkasdjfilk")
            // alert('cos nguo goii')
            setcallden(data)
        })
        socket.emit('useronline');
        
    },[useronline, callden])

    useEffect(()=>{
        // socket.disconnect()
        // socket.connect()
        
        socket.emit("connectto", {
            username: cookies.username,
            userid: cookies.userid});
            
        socket.on('useronline',data=>{
            if(data!==useronline) setuseronline(data)
            
        })
    },[])
    var call =(e)=>{
        socket.emit('call',{
            receiver: e,
            sender: cookies.userid,
            namesen: cookies.username
        })
    }
    return(
        <div><div>call</div>
        <ul>

        {useronline?useronline.map((user, index)=>{
            return(
                <li key={user.userid} onClick={e=>call(user.userid)}>
                    {/* {user.username} */}
                <a href={`https://itshello.co/${user.userid}`} target="_blank">{user.username}</a>
                </li>
            )
        }):"loading..."}
        </ul>
        {callden?(<>{callden.namesen} dang goi ban: <a href={`https://itshello.co/${callden.receiver}`} target="_blank">Link</a></>):""}
        </div>
    )
}
export default Call;