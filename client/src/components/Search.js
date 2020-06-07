import React,{ useState} from "react"
import axios from "axios"
import { set } from "mongoose";
function Search(){
    const [users, setusers] = useState();
    const [key, setkey] = useState();
    const [display, setdisplay] = useState('none')
    const handleChange =async (e)=>{
        // setkey(e.target.value);
        axios.get(`/search?username=${e.target.value}`).then(res=>{
            if(res.data.length){
                setusers(res.data)

            }
        });
        // setusers(data);
    }

    return(
        <div >
        <div className="topnav">
            <a className="active" href="#home"><img src='/avatar.jpg' alt='avatar'/></a>
            <div className="search-container">
                <form action="/action_page.php">
                <input type="text" autoComplete="off" placeholder="Search.." name="search" onChange={handleChange} onBlur={e=>setdisplay('none')} onFocus={e=>setdisplay('block')}/>
                <button type="submit">Submit</button>
                <div className="dropdown-content" style={{display: display}}>
                    {users?
                        users.map((user, index)=>{
                            return(
                            <p key={index}>{user.username}</p>
                            )
                        })
                    :(<></>)}
                </div>
                </form>
            </div>
            <div className='main'>
            <p>{users?users[0].username:'loading...'}</p>
            </div>
            
        </div>
        <style>{`
            // .dropdown{
            //     color: black;
            // }
            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #f9f9f9;
                min-width: 160px;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                padding: 12px 16px;
                z-index: 1;
            }
              
              .dropdown:hover .dropdown-content {
                display: block;
              }
            .topnav {
                overflow: hidden;
                background-color: #e9e9e9;
                
              }
              
              .topnav a img{
                display: block;
                float: right;
                width: 50px;
                height: 50px;
              }
              
              
              .topnav .search-container {
                float: right;
                margin-right: 5px;
              }
              
              .topnav input[type=text] {
                padding: 6px;
                // margin-top: 8px;
                font-size: 17px;
                border: none;
              }
              
              .topnav .search-container button {
                padding: 6px;
                margin-top: 8px;
                background: #ddd;
                font-size: 17px;
                border: none;
                cursor: pointer;
              }
              
              .topnav .search-container button:hover {
                background: #ccc;
              }
              
              @media screen and (max-width: 600px) {
                .topnav .search-container {
                  float: none;
                }
                .topnav a, .topnav input[type=text], .topnav .search-container button {
                  float: none;
                  display: block;
                  text-align: left;
                  width: 100%;
                  margin: 0;
                  padding: 14px;
                }
                .topnav input[type=text] {
                  border: 1px solid #ccc;  
                }
              }
        `}</style>
        </div>
    )
}
export default Search;