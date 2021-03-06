import React,{useState, useEffect, useImperativeHandle} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import axios from 'axios'
import { useCookies} from 'react-cookie'
import { useRouteMatch } from 'react-router-dom';
import OneTeam from '../../components/OneTeam';
function Call(){
    const [cookies, setCookie] = useCookies(['userid']);
    const [teams, setteams] = useState();
    const [teamsadmin, setteamsadmin] = useState();
    const [teamname, setteamname] = useState();
    const location = useLocation();
    const [teamcurrent, setteamcurrent] = useState();
    useEffect(()=>{
        axios.get('/team').then(async res=>{
            if (res.status===200) {
                var temp=[]
                await res.data.team.map((t,index)=>{
                    // console.log(t.admin)
                    if(t.admin[0]._id===cookies.userid){
                        
                        return temp.push(t);
                    }
                })
                setteamsadmin(temp);
                setteams(res.data.team)

            } else {
                console.log('co loi server')
            }
        })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('/team',{
            teamname: teamname,
            admin: cookies.userid
        }).then(res=>{
            if (res.status===200) {
                setteamname("")
                axios.get('/team').then(async res2=>{
                    if (res2.status===200) {
                        var temp=[]
                        await res2.data.team.map((t,index)=>{
                            // console.log(t.admin)
                            if(t.admin[0]._id===cookies.userid){
                                
                                return temp.push(t);
                            }
                        })
                        setteamsadmin(temp);
                        setteams(res2.data.team)
        
                    } else {
                        console.log('co loi server')
                    }
                })
            }
            else{
                console.log('loi khong tao dc'+res.data)
            }
        })
    }
    var leaveteam=(data)=>{
        axios.get('/remove/team/'+data.target.name).then(res=>{
            if (res.status===200) {
                setteamname("")
                axios.get('/team').then(async res2=>{
                    if (res2.status===200) {
                        var temp=[]
                        await res2.data.team.map((t,index)=>{
                            // console.log(t.admin)
                            if(t.admin[0]._id===cookies.userid){
                                
                                return temp.push(t);
                            }
                        })
                        setteamsadmin(temp);
                        setteams(res2.data.team)
        
                    } else {
                        console.log('co loi server')
                    }
                })
            }
            else{
                console.log('cos loi gif do')
            }
        })
        // alert(data.target.name)
    }
    return(
        <Router>
            {teamcurrent?<OneTeam idp={teamcurrent}/>:(
                <>
                <div className='left'>
                <div>All teams what you joined</div>
                <ul>
                    {teams?teams.map((team, index)=>{
                        return(
                            <>
                            <li key={index} onClick={e=>setteamcurrent(team._id)}><Link to={"/user/team/"+team._id}>Teamname: {team.teamname}</Link>
                            </li>
                            <button name={team._id} onClick={e=>leaveteam(e)}>Leave this team</button>
                            </>
                        )
                    }):"loading..."}
                </ul>
                <div>All teams what you is admin:</div>
                <ul>
                    {teamsadmin?teamsadmin.map((team, index)=>{
                        return(
                        <li key={index} onClick={e=>setteamcurrent(team._id)}><Link to={"/user/team/"+team._id}>Teamname: {team.teamname}</Link></li>
                        )
                    }):"loading..."}
                </ul>
                <form onSubmit={e=>handleSubmit(e)}>
                    <input type='text' name='teamname' value={teamname} placeholder='Enter name of your team: ...' onChange={e=>setteamname(e.target.value)}/>
                    <button type='submit'>Add a team</button>
                </form> 
            </div>
            <div className='right'>
                {/* <Link to={`/user/team/${teamcurrent}`}>teamcurrent</Link> */}
                {/* <h1>{teamcurrent?teamcurrent:"no state"}</h1> */}
                {/* <h1>{location.pathname?location.pathname:"no location"}</h1> */}
                <Switch>
                    <Route path='/user/team/:id' >
                        <h1>router id</h1>
                    </Route>
                </Switch>
            </div>
            </>
            )}
            
        </Router>
    )
}
export default Call;