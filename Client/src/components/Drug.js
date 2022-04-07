import React, { useEffect } from "react";
import  {useState} from 'react';
import {Button,Modal,Table} from 'react-bootstrap';
import "./styles.css";
import Axios from 'axios'

function Drug() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [id,setId] = useState(0); 
  const [Name,setName] = useState(""); 
  const [Price,setPrice] = useState(0); 
  const [data,setdata] = useState([]);
  const Submit =()=>{
    Axios.post("http://localhost:3001/Drug",{id : id,Name: Name, Price : Price}).then(()=>{
      alert("Update Success!");
    })
  }
  
  useEffect(()=>{
    
    Axios.get("http://localhost:3001/getDrug").then((resultt)=>{
    //   setdata(resultt.data);
      setdata(resultt.data);
    //   console.log(resultt.data)
    })
  })
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add Drug
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{display :"flex" ,flexDirection :"column"}}>
            <lable>Drug Id</lable>
            <input name="drug" type="number" onChange={(e)=>{setId(e.target.value)}}></input>
            <lable>Name</lable>
            <input name="name" type="text" onChange={(e)=>{setName(e.target.value)}}></input>
            <lable>Price</lable>
            <input name="Dept" type="number" onChange={(e)=>{setPrice(e.target.value)}}></input>
          </div> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{handleClose() ; Submit()}}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
      { data.map((e)=>{
          return(
              <tr>
                  <td>{e.drug_id}</td>
                  <td>{e.d_name}</td>
                  <td>{e.price}</td>
              </tr>
          )
      })

      }
  </tbody>
</Table>
    </>
  );
  
}

export default Drug;