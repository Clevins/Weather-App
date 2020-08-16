import React from 'react';
import { InputGroup, FormControl}  from 'react-bootstrap';

import classes from "./SearchLocation.module.css";
import { ButtonMain } from "../Button/Button";

let location = '';

// Componet Input Group That handles location search
const SearchLocation = ( props ) => (
  <InputGroup className={`mx-auto ${classes.LocationInputGroup}`} >
      <FormControl
        required
        type="text"
        placeholder="Search/Add Location"
        className={classes.LocationInput}
        isInvalid={props.searchError}
        onChange={e => location = e.target.value}/>
      <InputGroup.Append>
        <ButtonMain
          buttonHandler={() => props.onclick(location)}
          title={'Search'}
        ></ButtonMain>
      </InputGroup.Append>
      {props.searchError ?
        <FormControl.Feedback type="invalid">
          {props.searchErrorMsg}
        </FormControl.Feedback>
        : null
      }

    </InputGroup>
)

export default SearchLocation;
