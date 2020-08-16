import React from 'react';

const Users = props => {
    console.log(typeof props.users)
    if (props.users === undefined){
        return <div></div>
    }
    else{
        return (
                <div className="card" key={props.users.data.id}>
                    <h2>{props.users.data.name}</h2>
                </div> 
        )
    }
}

export default Users;

{/* 
Component Users

display what gets entered on the form

div .card-list container
    Render each user on a card 
    each user gets .card class 

*/}