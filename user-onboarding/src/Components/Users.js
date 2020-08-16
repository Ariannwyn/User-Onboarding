import React from 'react';

const Users = props => {
    console.log(props)
    return (
        <div className="card-list">
           {/* {props.users.map(users => (
                <div className="card" key={users.id}>
                    <h2>{users.name}</h2>
                </div>
           ))} */}
        </div>
    )
}

export default Users;
{/* 
Component Users

display what gets entered on the form

div .card-list container
    Render each user on a card 
    each user gets .card class 

*/}