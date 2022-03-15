import "../../places/pages/NewPlace.css";

import { useFormik } from 'formik';
import * as Yup  from "yup"; 
import { useContext, useState } from "react";

import axios from "../../axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";

import ImageUpload from "../../UI/formElement/imageUpload";

const Auth = () => {

  const [image,setImage] = useState();

  const authCtx = useContext(AuthContext);

  let navigate = useNavigate();

    async function sendRequest(data){

      if(!data.status){
        const formData = new FormData();
        formData.append('email',data.email)
        formData.append('password', data.password)
        formData.append('name',data.name)
        formData.append('image',image)

        console.log(handleImage());
        try {
              await axios.post('users/signup',formData);
              navigate('/');
            } catch (error) {
              console.log(error.response.data.message);
            }
            
      }else{

        

        try {
          const response = await axios.post('users/login',{email: data.email , password: data.password})
          setErrors();
          authCtx.login(response.data.userId,response.data.token)
          navigate('/');
        } catch (error) {
          if(error.response.data.message){
            setErrors({message:error.response.data.message})
            }
          }
      }
 
    }

    const [logginMode,setLogginMode] = useState(true);
    const [errors,setErrors] = useState();

    function handleLoginMode(){
        setLogginMode(!logginMode);
    }

    function handleImage(image,validity){
      setImage(image)
    }

    let formik = useFormik({
      enableReinitialize:true,
        initialValues: {
          name:"",
          email: "",
          password: "",
          status:logginMode
        
        },
        validationSchema:Yup.object().shape({
            name:Yup.string().when("status",{is:false ,then:Yup.string().min(3,"3 characters minimum").required('Name is required')}), 
            email:Yup.string().email("Invalid email").required('Email is required'),
            password:Yup.string().min(6,'6 characters minimum').required('Password is required')
        }),
        onSubmit:(values) => {
          sendRequest(values)
        }
    });

    return (
        <div className="container-contact100">
         
        <div className="wrap-contact100">
          <form encType="multipart/form-data" onSubmit={formik.handleSubmit} className="contact100-form validate-form">
            
            <span className="contact100-form-title">{ logginMode ? 'Login' : 'Sign Up' }</span>
            { errors && <div className="alert alert-danger ">{ errors.message }</div> }

            

            { !logginMode && 
            <div>
            <ImageUpload onInput={handleImage}></ImageUpload>
            <div className={`wrap-input100 validate-input ${formik.errors.name ? 'alert-validate' : ''}`}> 
            <span className={`label-input100 ${formik.errors.name ? 'invalid-input' : ''}`} >{formik.errors.name ? formik.errors.name : 'Name'}</span>
            <input
              className="input100"
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Name"
            />
            <span className="focus-input100"></span>
          </div>
          </div>
            }
 
            <div className={`wrap-input100 validate-input ${formik.errors.email ? 'alert-validate' : ''}`}> 
              <span className={`label-input100 ${formik.errors.email ? 'invalid-input' : ''}`} >{formik.errors.email ? formik.errors.email : 'Email'}</span>
              <input
                className="input100"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Email"
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className={`wrap-input100 validate-input ${formik.errors.password ? 'alert-validate' : ''}`}>
            <span className={`label-input100 ${formik.errors.password ? 'invalid-input' : ''}`} >{formik.errors.password ? formik.errors.password : 'Password'}</span>
              <input
                className="input100"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
              />
              <span className="focus-input100"></span>
            </div>
  
            <div className="container-contact100-form-btn">
              <div className="wrap-contact100-form-btn">
                <div className="contact100-form-bgbtn"></div>
                <button type="submit" className="contact100-form-btn">
                  <span>
                  { logginMode ? 'Login' : 'Sign Up' }
                    <i
                      className="fa fa-long-arrow-right m-l-7"
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
              </div>
            </div>
          </form>
          <button onClick={handleLoginMode} >{ logginMode ? 'Don\'t have an account ? ' : 'Login' }</button>
        </div>
      </div>
    )
}


export default Auth;