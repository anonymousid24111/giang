import React from 'react'
function Call(){
    return(
        <div>
            <div className="left">1callcallcallcallcallcall
            callcallcallcallcallcall
            callcallcallcallcallcallcallcall
            callcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcallcall</div>
            <div className="right">
            1callcallcallcallcallcall
            callcallcallcallcallcall
            callcallcallcallcallcallcallcall
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
            callcallcallcallcallcallcallc
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
        </div>
    )
}
export default Call;