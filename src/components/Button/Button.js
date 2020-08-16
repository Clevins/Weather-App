import React from 'react';
import { Button }  from 'react-bootstrap';

import RemoveIcon from '../../assets/icons8-close.png';
import classes from "./Button.module.css";

//Primary Button, Used as Search
const ButtonMain = ( props ) => (
  <Button
    onClick={props.buttonHandler}
    className={classes.ButtonMain}>
    {props.title}
  </Button>
)

//Button To Remove Location
const ButtonRemove = ( props ) => (
  <button
    className={classes.ButtonRemove}
    onClick={props.buttonHandler}>
   <img
     src={RemoveIcon}
     alt="Remove Icon"
     className={classes.RemoveIcon}/>
  </button>
)

export  {
  ButtonMain,
  ButtonRemove
};
