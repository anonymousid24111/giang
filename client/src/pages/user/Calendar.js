import React,{useState, useEffect} from 'react'
import Axios from 'axios'
function A(){
    const [calendars , setcalendars ] = useState()
    useEffect(()=>{
        Axios.get('/calendar').then(res=>{
            if (res.status===200) {
                console.log(res.data)
                setcalendars(res.data.calendar)
            } else {
                console.log('loi')
            }
        })
    },[])
    return(
        <div><div>All of calendar:</div>
        <ul>
        {calendars?calendars.map((calendar, index)=>{
            return <>
                <li key={index}>
                Team {calendar.sender.teamname} sent an calendar: {calendar.content}
                <br/>
                dateplan: {calendar.dateplan}
                </li>
            </>
        }):"loading..."}

        </ul>
        </div>
    )
}
export default A;