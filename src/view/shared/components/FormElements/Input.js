import React ,{useReducer ,useEffect}from "react";
import { validate } from "../../util/validator";
import './Input.css'
const Input =props=>{

const inputReducer =(state , action)=>{
    switch(action.type){
        case 'CHANGE' :
            return {...state ,
            value :action.val,
        isValid:validate(action.val ,action.validators)}
case 'TOUCH':
    return ({...state,
        isTouch:true});
        default :
        return state;
    }
}

    const [inputState,dispatch]=useReducer
    (inputReducer , {value :props.intialValue||'' ,isValid:props.intialValid ||false,isTouch:false});
    const changeHandler=event=>{
dispatch({type:'CHANGE' ,val :event.target.value ,validators :props.validators})
    }
    const TouchHandler =event=>{
        dispatch({type:'TOUCH'});
    }


    const {id , onInput}=props;
const {value , isValid} =inputState
useEffect(()=>{onInput(id 
    ,value ,
     isValid)},
     [id , value , isValid ,onInput])
     
    const element =props.element ==='input' ?
    <input type={props.type} 
    placeholder={props.placeholder}
    id={props.id}
    onBlur={TouchHandler}
    onChange={changeHandler}
    value={inputState.value}/> 
    :
    <textarea id ={props.id} 
    rows ={props.rows || 3}
    onBlur={TouchHandler}

    onChange={changeHandler}
    value={inputState.value}/>



    return(<div
         className={`form-control
    ${!inputState.isValid &&inputState.isTouch &&'form-control--invalid'}`}>
        <lable htmlFor={props.id}>{props.label}</lable>
        {element}
        {!inputState.isValid && inputState.isTouch &&<p>{props.errorText}</p>}
    </div>)
}
export default Input;