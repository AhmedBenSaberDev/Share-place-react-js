import UserItem from "./userItem";


const UsersList = (props) => {
    return(
        <div className="container py-5">
            <div className="row">
                { props.users.map(user => <UserItem key={user._id} id={user._id} name={user.name} image={user.image} places={user.places} ></UserItem> ) }
            </div>
        </div>
        
    )
}

export default UsersList;