import React,{useState, useEffect} from 'react'
import Axios from 'axios'
function Assignment(){
    const [assignments , setassignments ] = useState()
    useEffect(()=>{
        Axios.get('/assignment').then(res=>{
            if (res.status===200) {
                if(res.data) setassignments(res.data.assignment)
            } else {
                console.log('loi')
            }
        })
    },[])
    return(
        <div><div>All of assignments:</div>
        <ul>
        {assignments?assignments.map((assignment, index)=>{
            return <>
                <li key={index}>
                {assignment.title}<br/>
                {assignment.sender.admin[0].username} sent an assignment: {assignment.content}
                <br/>
                DEADLINE: {assignment.deadline}
                <br/>
                STATUS: {assignment.status}
                </li>
            </>
        }):"loading..."}

        </ul>
        </div>
    )
}
export default Assignment;