import React,{useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";
  import { useCookies} from 'react-cookie'
import axios from 'axios'
function OneTeam({idp}){
    var {id}=useParams()
    var {path, url}= useRouteMatch();
    const [channels, setchannels]  = useState()
    const [channelname, setchannelname] = useState()
    const [members, setmembers] = useState();
    const [newmem, setnewmem] = useState();
    useEffect(()=>{
        axios.get(`/channel?teamid=${id||idp}`).then(res=>{
            if (res.status===200) {
                if (res.data) {
                    
                    setchannels(res.data.channel)
                }
            }
            else{
                console.log('error gi do')
            }
        })
        axios.get(`/team/${id||idp}`).then(res=>{
            if (res.status===200) {
                if(res.data) setmembers(res.data.member)
            } else {
                console.log('co loi gi dos')
            }
        })
    },[])
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`/channel`,{
            channelname: channelname,
            teamid: id||idp,
        }).then(res=>{
            if (res.status===200) {
                axios.get(`/channel?teamid=${id||idp}`).then(res2=>{
                    if (res2.status===200) {
                        if (res2.data) {
                            setchannelname('')
                            setchannels(res2.data.channel)
                        }
                    }
                    else{
                        alert('error server')
                        console.log('error gi do')
                    }
                })
            }
        })
    }
    var handleSubmit2 = (e)=>{
        e.preventDefault()
        axios.post(`/member/team`,{
            newmem: newmem,
            teamid: id||idp,
        }).then(res=>{
            if (res.status===200) {
                axios.get(`/team/${id||idp}`).then(res2=>{
                    if (res2.status===200) {
                        if (res2.data) {
                            setnewmem('')
                            setmembers(res2.data.member)
                        }
                    }
                    else{
                        alert('error server')
                        console.log('error gi do')
                    }
                })
            }
        })
    }
    var removemem = (e)=>{
        axios.get( `/removemem/team/${id||idp}?mem=${e.target.name}`).then(res=>{
            if (res.status===200) {
                axios.get(`/team/${id||idp}`).then(res2=>{
                    if (res2.status===200) {
                        if (res2.data) {
                            setnewmem('')
                            setmembers(res2.data.member)
                        }
                    }
                    else{
                        alert('error server')
                        console.log('error gi do')
                    }
                })
            }
        })
    }
    var removechannel = (e)=>{
        axios.get(`/remove/channel/${e.target.name}?teamid=${id||idp}`).then(res=>{
            if (res.status===200) {
                axios.get(`/channel?teamid=${id||idp}`).then(res2=>{
                    if (res2.status===200) {
                        if (res2.data) {
                            setchannelname('')
                            setchannels(res2.data.channel)
                            
                        }
                    }
                    else{
                        alert('error server')
                        console.log('error gi do')
                    }
                })
            }
        })
    }
    return(<Router>
        <div className='left'>
        <form onSubmit={e=>handleSubmit2(e)}>
                    <input type='text' name='newmem' value={newmem} placeholder='Enter name of user: ...' onChange={e=>setnewmem(e.target.value)}/>
                    <button type='submit'>Add a channel</button>
        </form> 
        <div>All members:</div>
        <ul>

            {members?members.map((member, index)=>{
                return<> <li key={index}>{member.username}
                </li>
                    <button name={member._id} onClick={e=>removemem(e)}>Remove member</button>
                </>
            }):"loading"}
        </ul>

        <form onSubmit={e=>handleSubmit(e)}>
                    <input type='text' name='channel' value={channelname} placeholder='Enter name of your channel: ...' onChange={e=>setchannelname(e.target.value)}/>
                    <button type='submit'>Add a channel</button>
        </form> 
        <div>All channels: </div>
            
            <ul>

            {channels?channels.map((channel, index)=>{
                return(
                    <>
                    <li key={index}>

                    <Link to={`/user/team/${id||idp}/${channel._id}`}>
                    {channel.channelname}
                    </Link>
                    </li>
                    <button name={channel._id} onClick={e=>removechannel(e)}>Remove</button>
                    </>
                )
            }):"loading.."}
            </ul>
            <Switch>
                <Route path={`/user/team/${id||idp}/:channelid`}>
                    <Channel />
                </Route>
            </Switch>
        </div>
    </Router>
    )
}
export default OneTeam;
function Channel() {
    const [cookies, setCookie] = useCookies(['userid']);
    let { channelid } = useParams();
    const [posts, setposts] = useState()
    const [content, setcontent] = useState();
    
    // const [change, setchange] = useState(0)

    useEffect(()=>{
        axios.get(`/channel/${channelid}`).then((res)=>{
            if (res.status===200) {
                if(res.data.post.length) setposts(res.data.post)
                else{
                    setposts('')
                }
            } else {
                console.log('err channel')
            }
        })
    },[channelid])
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`/post?channelid=${channelid}`,{
            content: content,
            sender: cookies.userid,
        }).then(res=>{
            if (res.status===200) {
                setcontent('')
                axios.get(`/channel/${channelid}`).then((res2)=>{
                    if (res2.status===200) {
                        if(res2.data.post.length) setposts(res2.data.post)
                        else{
                            setposts('')
                        }
                    } else {
                        console.log('err channel')
                    }
                })
            } else {
                alert('cos loi ')
                console.log('err')
            }
        })
    }
    var removepost = (e)=>{
        axios.get(`/remove/post/${e.target.name}?channelid=${channelid}`).then(res=>{
            if (res.status===200) {
                setcontent('')
                axios.get(`/channel/${channelid}`).then((res2)=>{
                    if (res2.status===200) {
                        if(res2.data.post.length) setposts(res2.data.post)
                        else{
                            setposts('')
                        }
                    } else {
                        console.log('err channel')
                    }
                })
            } else {
                alert('cos loi ')
                console.log('err')
            }
        })
    }
    var makecall = ()=>{
        axios.post(`/post?channelid=${channelid}`,{
            content: `http://localhost:3000/room/${channelid}`,
            sender: cookies.userid,
        }).then(res=>{
            if (res.status===200) {
                setcontent('')
                axios.get(`/channel/${channelid}`).then((res2)=>{
                    if (res2.status===200) {
                        if(res2.data.post.length) setposts(res2.data.post)
                        else{
                            setposts('')
                        }
                    } else {
                        console.log('err channel')
                    }
                })
            } else {
                alert('cos loi ')
                console.log('err')
            }
        })
    }
    return (
      <div>
        <div>Conversations of chanel: {channelid}</div>
        <div>

        </div>
        <form onSubmit={e=>handleSubmit(e)}>
                    <input type='text' name='content' value={content} placeholder='Enter content of your post: ...' onChange={e=>setcontent(e.target.value)}/>
                    <button type='submit'>Add a post</button>
        </form> 
                    <button onClick={makecall}>Make a call</button>
        <div>
            <ul>

            {posts?posts.map((post, index)=>{
                return(
                    <>
                        <li key={index}>{post.sender.username}: {post.content.slice(0,4)=="http"?(<a href={`${post.content}`} target="_blank">LINK TO CALL</a>):post.content}</li>
                        <button name={post._id} onClick={e=>removepost(e)}>Remove</button>
                    </>
                )
            }):'loading...'}
            </ul>
        </div>
      </div>
    );
  }
  