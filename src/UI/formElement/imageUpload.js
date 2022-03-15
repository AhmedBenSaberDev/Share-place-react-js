import classes from './imageUpload.module.css';
import imageDownload from '../../assets/image.png'
import { useRef, useState, useEffect } from "react";

const ImageUpload = props => {

    const[file,setFile] = useState();
    const[fileUrl,setFileUrl] = useState();
    const[fileIsValid,setFileIsValid] = useState();

    const filePickerRef = useRef();

    useEffect(() => {
        if(!file){
            return
        };

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setFileUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file)
    },[file])

    function pikedHandler(e){
        let pickedFile;
        let fileValididty = fileIsValid;

        if(e.target.files && e.target.files.length === 1 ){
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setFileIsValid(true);
            fileValididty = true;
        }else{
            setFileIsValid(false);
            fileValididty = false
        }

        props.onInput(pickedFile,fileValididty)
    }

    function pickImageHandler(){
        filePickerRef.current.click()
    }

    return(
        <div>
        <div className={classes.wrapper} >
            <input onChange={pikedHandler} ref={filePickerRef} id={props.id} type="file" style={{display:'none'}} accept=".jgp,.jpeg,.png" ></input>
            <div className={classes.preview}>
                { !fileUrl &&   <img className={classes['preview-img']} onClick={pickImageHandler} src={imageDownload} alt=''></img>}
                { fileUrl && <img className={classes['preview-img']} onClick={pickImageHandler} src={fileUrl} alt=''></img> }
                
            </div>
            
        </div>
        <button className={`${classes['preview-button']} btn btn-success`} type="button" onClick={pickImageHandler}>Pick an image</button>
        </div>
    )
};

export default ImageUpload;