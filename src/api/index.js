import axios from 'axios'

const Studenturl = 'http://localhost:5000/students'
const Appurl = 'http://localhost:5000/App'
const Clerkurl = 'http://localhost:5000/clerk'


export const createVisa =(newApp,token) =>axios.post(Appurl+'/visa',newApp,{
    
    headers: {
      'Content-Type': 'multipart/form-data'
  ,'Authorization' :`Bearer ${token}`

    }
})


export const creatI_kad=(newApp,token)=>axios.post(Appurl+'/ikad',newApp,{
  headers: {
    'Content-Type': 'multipart/form-data'
    ,'Authorization' :`Bearer ${token}`
  }
})


export const getAppByUserId = (  token,userId) => axios.get(Appurl+'/user/'+userId  ,{
  headers: {
    'Content-Type': 'multipart/form-data'
    ,'Authorization' :`Bearer ${token}`
  }
})


export const re_Upload =(token , app,appId ) =>axios.patch(Appurl+'/upload/'+appId,app,

{headers: {
  'Content-Type': 'multipart/form-data'
  ,'Authorization' :`Bearer ${token}`
}})
export const check =(token , app,appId ) =>axios.patch(Appurl+'/check/'+appId,
app,

{headers: {
  'Content-Type': 'application/form-data'
  ,'Authorization' :`Bearer ${token}`
}})
export const Payment =(token , appId,app ) =>axios.patch(Appurl+'/payment/'+appId,app,

{headers: {
  'Content-Type': 'multipart/form-data'
  ,'Authorization' :`Bearer ${token}`
}})
export const LoginStudent=(user) => axios.post(`${Studenturl}/login`,user);

export  const LoginClerk=(user)=>axios.post(`${Clerkurl}/clogin`,user)

export const getAllStudent=()=>axios.get(`${Studenturl}/`)
export const getStudent=(userId)=>axios.get(Studenturl+`/`+userId)

export const getAllApps=(token)=>axios.get(`${Appurl}/all`,
{headers: {
 
  'Authorization' :`Bearer ${token}`
}}



)

