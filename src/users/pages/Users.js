import React, { useEffect, useState } from 'react';
import axios from '../../axios';

import UsersList from '../components/usersList';
import Backdrop from '../../UI/Backdrop';

const Users = () => {

    const [users,setUsers] =  useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(async () => {
        setIsLoading(true)
        try {
            const response = await axios.get('users');
            console.log(response);
            setUsers(response.data.users)
        } catch (error) {
            console.log(error.response);
        }
        setIsLoading(false)
    },[])

    return (
        <React.Fragment>
            {isLoading && <Backdrop mode='loader'></Backdrop>}
            {!isLoading && <UsersList users={users}/>}
        </React.Fragment>
    )
} 


export default Users;