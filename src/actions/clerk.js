import * as api from'../api';
export const Loginclerk=(user)=>async(dispatch)=>{
    try{
        const {data} =await api.LoginClerk(user);
        console.log(data);
        dispatch({type:'LOGIN' ,payload:data});
        console.log(data)
    }catch(err){console.log(err)}
}


export const  getAllStudents =()=>async(dispatch)=>{
try{
    const {data} = await api.getAllStudent();
    dispatch({type:'FETCH_ALL',payload:data})

}catch(err){console.log(err)}
}
export const  getAllApps =(token)=>async(dispatch)=>{
try{
    const {data} = await api.getAllApps(token);
    dispatch({type:'FETCH',payload:data})

}catch(err){console.log(err)}
}


