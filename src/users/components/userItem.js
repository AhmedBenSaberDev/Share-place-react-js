import classes from "./userItem.module.css";
import { useNavigate } from "react-router-dom";

const UserItem = (props) => {

    const navigate = useNavigate();

    function clickHandler(){
        navigate(`${props.id}/places`);
    }

  return (

    <div className="col-md-4 py-5" onClick={clickHandler}>
      <div className={`${classes["profile-card-4"]} text-center `}>
        <img
          src={`http://localhost:5000/${props.image}`}
          className="img img-responsive"/>
        <div className={classes["profile-content"]}>
          <div className={classes["profile-name"]}>{props.name}</div>
          <div className="row">
            <div className={`${classes["profile-overview"]} offset-5`}>
              <p>PLACES</p>
              <h4>{props.places.length}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
