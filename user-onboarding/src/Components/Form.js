import React, { useState, useEffect } from 'react';
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
    password: yup
        .string()
        .min(6, "Passwords must be at least 6 characters long")
        .required("Please enter a password"),
    terms: yup
        .boolean()
        .oneOf([true], "Please agree to terms of use")
        .required("You must accept Terms of Service")
})

const Form = () => {
    const initialFormValues = {
        id: '',
        name: "",
        email: "",
        role: "",
        password: "",
        terms: false
     }
const [userList, setUserList] = useState([])
const [buttonDisabled, setButtonDisabled] = useState(true)
const [formState, setFormState] = useState(initialFormValues)

const [errorState, setErrorState] = useState({...initialFormValues, terms: ""})

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
    
    setFormState({ ...formState, [event.target.name]: value, id: Date.now()})
    console.log("input changed!", value)
};

const submitForm = (event) => {
    event.preventDefault(); 
    console.log("form submitted!")
    axios.post("https://reqres.in/api/users", formState)
        .then(response => {
            const usersFromApi = response.data
            setUserList([...userList, usersFromApi])
            console.log(response)
            setFormState(initialFormValues) //This doesn't work 
        })
        .catch(error => console.log(error))
  };

useEffect(() => {
    formSchema.isValid(formState)
    .then(valid => {
        setButtonDisabled(!valid);
    });
}, [formState])


return (
    <div>
    <form onSubmit={submitForm}>
        <label htmlFor="name">Name*
            <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formState.name}
            onChange={handleChanges}
            />
            {errorState.name.length > 0 ? <p className="error">{errorState.name}</p> : null}
        </label>
        <label htmlFor="email">Email*
            <input
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={formState.email}
            onChange={handleChanges}
            />
            {errorState.email.length > 0 ? <p className="error">{errorState.email}</p> : null}
        </label>
        <label htmlFor="password">Password*
            <input
            id="password"
            type="password"
            placeholder="Enter password"
            name="password"
            value={formState.password}
            onChange={handleChanges}
            />
            {errorState.password.length > 0 ? <p className="error">{errorState.password}</p> : null}
        </label>
        <label > What is your role?
            <select 
            value={formState.role}
            name="role"
            id="role"
            onChange={handleChanges}>
                <option value="">Enter role</option>
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Instructor">Instructor</option>
            </select>
        </label>
        <label>Terms & Conditions*
            <input 
            type="checkbox" 
            id="terms"
            name="terms"
            checked={formState.value}
            onChange={handleChanges}/>
            {/* {errorState.terms ? null : <p className="error">{errorState.terms}</p>}  */}
        </label>
        <p>{/*Placeholder*/}</p>
        <label>
        <button 
            id="button"
            name="button"
            value={formState.button}
            disabled={buttonDisabled} 
            type="submit">
            Add User
        </button>
        </label>
    </form>
    <Users users={userList} />
    </div>
)
}

export default Form;