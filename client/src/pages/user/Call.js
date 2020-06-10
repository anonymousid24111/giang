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
        socket.on('useronline',data=>{
            if(data!==useronline) setuseronline(data)
        })
        // socket.emit('useronline');
        
    },[callden])

    useEffect(()=>{
        // socket.disconnect()
        // socket.connect()
        
        socket.emit("connectto", {
            username: cookies.username,
            userid: cookies.userid});
        socket.emit('useronline');
        
    },[])
    var call =(e)=>{
        socket.emit('call',{
            receiver: e,
            sender: cookies.userid,
            namesen: cookies.username
        });
        setcallden({namesen: cookies.username})
    }
    return(
        <div><div>Click vao username to goi:</div>
        <ul>

        {useronline?useronline.map((user, index)=>{
            return(
                <li key={user.userid} onClick={e=>call(user.userid)}>
                    {/* {user.username} */}
                <a href={`http://localhost:3000/room/${user.userid}`} target="_blank">{user.username}</a>
                </li>
            )
        }):"loading..."}
        </ul>
        {
        callden?(
            (callden.namesen===cookies.username)?(<>Ban dang doi ai do: <a href={`https://itshello.co/${callden.receiver}`} target="_blank">Link</a></>):
        <>{callden.namesen} dang goi ban: <a href={`https://itshello.co/${callden.receiver}`} target="_blank">Link</a></>):""
    }
        
        </div>
    )
}
export default Call;