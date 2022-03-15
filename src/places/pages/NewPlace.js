import "./NewPlace.css";

import { useFormik } from "formik";
import * as Yup  from "yup"; 

import axios from "../../axios";
import ImageUpload from '../../UI/formElement/imageUpload';

import { AuthContext } from "../../store/auth-context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPlace = () => {

  const navigate = useNavigate();

  const [image,setImage] = useState();

  const authCtx = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      address: ""
    },
    validationSchema:Yup.object({
        title:Yup.string().min(3,"3 characters minimum").required('Title is required'), 
        description:Yup.string().min('10',"10 characters minimum").required('Description is required'),
        address:Yup.string().required('Address is required')
    }),
    onSubmit:async (values) => {
      const formData = new FormData();
      formData.append('title',values.title)
      formData.append('description',values.description)
      formData.append('address',values.address)
      formData.append('creator', authCtx.userId)
      formData.append('image',image);
        try {
          await axios.post("places",formData,{headers: {
            'Authorization': `Bearer ${authCtx.token}` 
          }});
          navigate('/');
        } catch (error) {
          console.log(error.response);
        }
    }
  });

  function handleImage(image){
    setImage(image);
  }

  return (
    <div className="container-contact100">git remote add origin https://github.com/AhmedBenSaberDev/Places-react-node-js.git
      <div className="wrap-contact100">
        <form onSubmit={formik.handleSubmit} className="contact100-form validate-form">
          <span className="contact100-form-title">Add place</span>
          
          <ImageUpload onInput={handleImage}></ImageUpload>
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

          <div className={`wrap-input100 validate-input ${formik.errors.address ? 'alert-validate' : ''}`}>
          <span className={`label-input100 ${formik.errors.address ? 'invalid-input' : ''}`} >{formik.errors.address ? formik.errors.address : 'Adress'}</span>
            <input
              className="input100 has-val"
              type="text"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              placeholder="Address"
            />
            <span className="focus-input100"></span>
          </div>

          <div className="container-contact100-form-btn">
            <div className="wrap-contact100-form-btn">
              <div className="contact100-form-bgbtn"></div>
              <button type="submit" className="contact100-form-btn">
                <span>
                  Submit
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
  );
};

export default NewPlace;
