import classes from './Backdrop.module.css';
import  ReactDOM  from 'react-dom';

import loader from '../assets/spinner.svg';

const Backdrop = props => {

    let content;

    if(props.mode == 'loader'){
        content = 
        <div onClick={ props.onClick } className={classes.backdrop}>
            <img src={loader} />
        </div>;
    }else{
        content = <div onClick={ props.onClick } className={classes.backdrop}></div>;
    }
    

    return ReactDOM.createPortal(content,document.getElementById('backdrop')) 
}



export default Backdrop;