import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import Map from "../../UI/Map";
import React, { useEffect, useState } from "react";
import Backdrop from "../../UI/Backdrop";

import axios from '../../axios';

const UserPlaces = () => {

  const userId = useParams().userId;

  const [modalVisibility, setModalVisibility] = useState(false);

  const [loadedplaces,setLoadedPlaces] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get(`places/user/${userId}`);
      setLoadedPlaces(response.data.places)
    } catch (error) {
      if(error.response.data.message === "Could't not find a place for the provided user id"){
        console.log("no places found");
      }
      // console.log();
    }
  },[setLoadedPlaces])

  function closeMapHandler() {
    setModalVisibility(false);
  }

  function showMapHandler() {
    setModalVisibility(true);
  }

  return (
    <React.Fragment>
      {modalVisibility && (
        <React.Fragment>
          <Backdrop onClick = { closeMapHandler }></Backdrop> 
          <Map onClose={closeMapHandler}></Map>
        </React.Fragment>
      )}
      <PlaceList onShowMap={showMapHandler} items={loadedplaces}></PlaceList>
    </React.Fragment>
  );
};

export default UserPlaces;
