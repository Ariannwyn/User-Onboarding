import React, { useState } from 'react';
import Users from './Users'
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is a required field"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Email is a required field"),
    role: yup
        .string(),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to terms of use")
})

const Form = () => {
const [userList, setUserList] = useState()
const [users, setUsers] = useState([{ 
    id: '',
    name: "",
    email: "",
    role: "",
    terms: false
}])


const [errorState, setErrorState] = useState({
    name: "",
    email: "",
    role: "",
    terms: ""
})

const validate = (event) => {
     yup.reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(valid=>{
            setErrorState({
                ...errorState,
                [event.target.name]: ""
            })
        })
        .catch(error =>{
            console.log(error.errors)
            setErrorState({
                ...errorState, 
                [event.target.name]: error.errors[0]
            })
        })
}

const handleChanges = (event) => {
    event.persist()
    validate(event)
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setUsers({ ...users, [event.target.name]: event.target.value, id: Date.now()})
    console.log("input changed!", event.target.value)
};

const submitForm = (event) => {
    event.preventDefault(); 
    console.log("form submitted!")
    axios.post("https://reqres.in/api/users", users)
        .then(response => 
            setUserList(response),
            //console.log(response)
            )
        .catch(error => console.log(error))
  };

return (
    <div>
    <form onSubmit={submitForm}>
        <label htmlFor="name">Name
            <input
            id="name"
            type="text"
            placeholder="Enter name*"
            name="name"
            value={users.name}
            onChange={handleChanges}
            />
            {errorState.name.length > 0 ? <p className="error">{errorState.name}</p> : null}
        </label>
        <label htmlFor="email">Email
            <input
            id="email"
            type="email"
            placeholder="Enter email*"
            name="email"
            value={users.email}
            onChange={handleChanges}
            />
            {errorState.email.length > 0 ? <p className="error">{errorState.email}</p> : null}
        </label>
        <label>
            <select 
            value={users.role}
            name="role"
            id="role"
            onChange={handleChanges}>
                <option value="">What is your role?</option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Instructor">Instructor</option>
            </select>
        </label>
        <label>
            <input 
            type="checkbox" 
            id="terms"
            name="terms"
            checked={users.value}
            onChange={handleChanges}/>
            Terms & Conditions*
        </label>
        <p>{/*Placeholder*/}</p>
        <button type="submit">Add User</button>
    </form>
    <Users users={userList} />
    </div>
)
}

export default Form;

{/* 
FORM LAYOUT
-Name textbox
-Email emailbox
-Password passwordbox
-Terms of Service checkbox
-Submit button

Component <Users users={users}/>

users = {
    name: 
    email: 
    etc
}

On submit the info gets placed as a new object in array
*/}