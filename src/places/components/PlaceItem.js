import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { AuthContext } from '../../store/auth-context';

const PlaceItem = props => {
  console.log(props);
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  function showMapHandler(){
    props.onShow();
  }

  async function deletePlaceHandler(){
    try {
      const response = await axios.delete(`places/${props.id}`,{headers: {
        'Authorization': `Bearer ${authCtx.token}` 
      }});
      console.log(response);
      navigate('/')
    } catch (error) {
      console.log(error.response);
    }
  }

  function editPlaceHandler(e){
    e.preventDefault();
    navigate(`/${props.id}/update`)
  }

    return(
    
    <div className="col-lg-6 mb-6 mt-5 pt-5">
      <div className="card">
        <img
          src={`http://localhost:5000/${props.image}`}
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title"> { props.title }</h5>
          <p className="card-text">
            { props.description }
          </p>
          <div className="offset-lg-2 offset-md-1 col-lg-8 col-md-10  d-flex justify-content-between">
            <button onClick={ showMapHandler } href="" className="btn btn-outline-success btn-sm px-3">View on map</button>
            { authCtx.userId === props.creator ? 
            <div>
            <button onClick={editPlaceHandler} className="btn btn-outline-warning btn-sm px-3">Edit</button>
            <button onClick={deletePlaceHandler} className="btn btn-outline-danger btn-sm px-3">Delete</button>
            </div> : ''
            }
            
        </div>

        </div>
      </div>
    </div>

    )
}


export default PlaceItem;