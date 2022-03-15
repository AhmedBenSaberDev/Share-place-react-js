import classes from "./Map.module.css";
import ReactDOM from "react-dom";

import React from "react";

const Map = (props) => {
  function closeMapHandler() {
    props.onClose();
  }

  const content = (
    <div className={classes.modal}>
        <iframe
        className={classes.map}
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
        </iframe>
        <button className={`${classes['map-button']} btn btn-outline-danger btn-sm px-3`}  onClick={closeMapHandler}> Close </button>
      
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("map"));
};

export default Map;
