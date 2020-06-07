import axios from 'axios';

export default function checkToken(){
    return axios.get('/private').then(res=>{
        if (res.status===200){
          console.log('ok')
        }
        else if(res.status===400){
          console.log("loi")
        }
        console.log(res.data)
      })
}