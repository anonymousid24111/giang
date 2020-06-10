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
    return(<Router>
        <div className='left'>
        <form onSubmit={e=>handleSubmit(e)}>
                    <input type='text' name='channel' value={channelname} placeholder='Enter name of your channel: ...' onChange={e=>setchannelname(e.target.value)}/>
                    <button type='submit'>Add a channel</button>
        </form> 
            <ul>

            {channels?channels.map((channel, index)=>{
                return(
                    <li key={index}>

                    <Link to={`/user/team/${id||idp}/${channel._id}`}>
                    {channel.channelname}
                    </Link>
                    </li>
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
    return (
      <div>
        <h3>{channelid}</h3>
        <form onSubmit={e=>handleSubmit(e)}>
                    <input type='text' name='content' value={content} placeholder='Enter content of your post: ...' onChange={e=>setcontent(e.target.value)}/>
                    <button type='submit'>Add a post</button>
        </form> 
        <div>
            {posts?posts.map((post, index)=>{
                return(
                <div key={index}>{post.sender.username}: {post.content}</div>
                )
            }):'loading...'}
        </div>
      </div>
    );
  }
  