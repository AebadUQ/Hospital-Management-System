import Axios from "axios";
import React, {useState,useEffect} from "react";
import {Table,Modal,Button} from 'react-bootstrap';

function Bills() {
    const [show, setShow] = useState(false);
    const [Bill,setBill] = useState([]);
    const [id,setid]= useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const Roomupdate = ()=>{
        Axios.post("http://localhost:3001/RoomUpdate",{id : id}).then(()=>{

        })
    }

    useEffect(()=>{
        Axios.get("http://localhost:3001/Showbill").then((result)=>{
          setBill(result.data);
        })
      
      },[])
    return(
        <>
        <Table>
          <thead>
              <tr>
                <th>Patient</th>
                
                <th>Generate</th>
              </tr>
          </thead>
          <tbody>
            {
              Bill.map((e)=>{
                 
                    return(
                      <tr>
                          <td>{e.pid}</td>
                         
                          <Button variant="primary" onClick={()=>{handleShow();setid(e.pid) }}>Generate</Button>
                      </tr>
                    )
                  
              })
            }
          </tbody>
      </Table>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
              Bill.map((e)=>{
                 if(e.pid == id){
                    return(
                     <div style={{display: "flex" , flexDirection: "column",margin: "10vh"}}>
                         <Button disabled={true} >Patient_ID : {e.pid}</Button>
                         <Button disabled={true} >Number Of Days : {e.num_days}</Button>
                         <Button disabled={true} >Doctor Charges : {e.doctor_charges}</Button>
                         <Button disabled={true} >Drug Charges : {e.drug_charges}</Button>
                         <Button disabled={true} >Total : {e.total}</Button>
                      </div>
                    )
                    }
              })
            }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={()=>{handleClose();Roomupdate()}}>
                Discharge
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default Bills;