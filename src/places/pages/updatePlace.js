import { useParams } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup  from "yup"; 
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../store/auth-context';

import axios from '../../axios';

const UpdatePlace = () => {

  const authCtx = useContext(AuthContext);

    const placeId = useParams().placeId;

    const [place,setPlace] = useState({title:'',description:''});

    useEffect(async () => {
        try {
            const response = await axios.get(`places/${placeId}`);
            setPlace(response.data.place);

        } catch (error) {
            console.log(error.response);
        }
    },[placeId]);
  


    let formik = useFormik({
        enableReinitialize:true,
        initialValues: {
          title: place.title,
          description: place.description,
        },
        validationSchema:Yup.object({
            title:Yup.string().min(3,"3 characters minimum").required('Title is required'), 
            description:Yup.string().min('10',"10 characters minimum").required('Description is required'),
        }),
        onSubmit:async (values) => {
            try {
                const response = await axios.patch(`places/${placeId}`,{title:values.title,description:values.description},{headers: {
                  'Authorization': `Bearer ${authCtx.token}` 
                }});
                console.log(response.data);
            } catch (error) {
                console.log(error.response)
            }
        }
      });

    return(
        <div className="container-contact100">
      <div className="wrap-contact100">
        <form onSubmit={formik.handleSubmit} className="contact100-form validate-form">
          <span className="contact100-form-title">Update Place</span>

          <div className={`wrap-input100 validate-input ${formik.errors.title ? 'alert-validate' : ''}`}> 
            <span className={`label-input100 ${formik.errors.title ? 'invalid-input' : ''}`} >{formik.errors.title ? formik.errors.title : 'Title'}</span>
            <input
              className="input100"
              type="text"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Title"
            />
            <span className="focus-input100"></span>
          </div>

          <div className={`wrap-input100 validate-input ${formik.errors.description ? 'alert-validate' : ''}`}>
          <span className={`label-input100 ${formik.errors.description ? 'invalid-input' : ''}`} >{formik.errors.description ? formik.errors.description : 'Description'}</span>
            <textarea
              className="input100"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Description ..."
            ></textarea>
            <span className="focus-input100"></span>
          </div>


          <div className="container-contact100-form-btn">
            <div className="wrap-contact100-form-btn">
              <div className="contact100-form-bgbtn"></div>
              <button type="submit" className="contact100-form-btn">
                <span>
                  Update
                  <i
                    className="fa fa-long-arrow-right m-l-7"
                    aria-hidden="true"
                  ></i>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    )
}

export default UpdatePlace;