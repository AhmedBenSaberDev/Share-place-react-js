

import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="offset-lg-3 col-lg-6 offset-md-2 col-md-8 offset-sm-1 col-sm-10 mb-6 mt-5 pt-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">This user has no place added yet</h5>
          </div>
        </div>
      </div>
    );
  }

  function showMapHandler() {
    props.onShowMap();
  }

  return (
    <div className="container mt-5 pt-5">
      <div class="row">
        {props.items.map((place) => (
          <PlaceItem
            onShow={showMapHandler}
            key={place._id}
            id={place._id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creator={place.creator}
            coordinates={place.location}
          ></PlaceItem>
        ))}
      </div>
    </div>
  );
};

export default PlaceList;
