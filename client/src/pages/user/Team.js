import React,{useState, useEffect, useImperativeHandle} from 'react'
import axios from 'axios'
import { useCookies} from 'react-cookie'
import { useRouteMatch } from 'react-router-dom';
function Call(){
    const [cookies, setCookie] = useCookies(['userid']);
    const [teams, setteams] = useState();
    const [teamsadmin, setteamsadmin] = useState();
    const [teamname, setteamname] = useState();
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
    return(
        <div>
        <div>All teams what you joined</div>
        <ul>
            {teams?teams.map((team, index)=>{
                return(
                <li key={index}>Teamname: {team.teamname}</li>
                )
            }):"loading..."}
        </ul>
        <div>All teams what you is admin:</div>
        <ul>
            {teamsadmin?teamsadmin.map((team, index)=>{
                return(
                <li key={index}>Teamname: {team.teamname}</li>
                )
            }):"loading..."}
        </ul>
        <form onSubmit={e=>handleSubmit(e)}>
            <input type='text' name='teamname' value={teamname} placeholder='Enter name of your team: ...' onChange={e=>setteamname(e.target.value)}/>
            <button type='submit'>Add a team</button>
        </form> 
        </div>
    )
}
export default Call;