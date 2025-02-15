
import { useState } from "react";
import { Alert, Button, CloseButton } from "react-bootstrap";



export function AlertBan(props){
  
    return(
      <>

      <Alert show={props.warn}  variant="warning" className="difficulty-warning d-flex justify-content-between" style={{zIndex:'9999', width:'50vw', left:'25vw', position: 'fixed'}}>
        You have to select difficulty first!
        <CloseButton onClick={()=>props.setWarn(false)} />
      </Alert>
      
      </>
    )
  }
  export default AlertBan;