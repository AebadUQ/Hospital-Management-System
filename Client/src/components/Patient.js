import React, { useEffect } from "react";
import  {useState} from 'react';
import {Button,Modal,Table} from 'react-bootstrap';
import TopP from './Patient/TopP';
import Demo1 from './Patient/SecondP/demo1';
import FAQs from './Patient/FAQs/App';
import "./styles.css";
import Axios from 'axios'

function Doctor() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Name,setName] = useState(""); 
  const [Date,setDate] = useState(""); 
  const [Sex,setSex] = useState(""); 
  const [Address,setAddress] = useState(""); 
  const [Contact,setContact] = useState(""); 
  const [data,setdata] = useState([]);
  // const [tab, setTab] = useState({});
  const Submit =()=>{
    Axios.post("http://localhost:3001/Patient",{Name: Name,Date : Date,Sex :Sex,Address:Address,Contact:Contact}).then(()=>{
      alert("Update Success!");
    })
  }
  
  useEffect(()=>{
    
    Axios.get("http://localhost:3001/getPatient").then((resultt)=>{
      setdata(resultt.data);
      // console.log(data)
    })
  },[])
  
  return (
    <>
       <TopP/>
       <Demo1/>
       <FAQs/>
      <Button variant="primary" onClick={handleShow}>
        + Add Patient
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
            <lable>Name</lable>
            <input name="name" type="text" onChange={(e)=>{setName(e.target.value)}}></input>
            <lable>Date-Admitted</lable>
            <input name="Date-A" type="date" onChange={(e)=>{setDate(e.target.value)}}></input>
            {/* <lable>Date-Discharged</lable>
            <input name="Date-A" type="date"></input> */}
            <lable>Address</lable>
            <textarea name="Address" rows="3" col="20" onChange={(e)=>{setAddress(e.target.value)}}></textarea>
            <lable>Sex</lable>
            <select name="sex" onChange={(e)=>{setSex(e.target.value)}}>
              <option value="O">Select Gender</option>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="O">O</option>
            </select>
            <lable>Contact</lable>
            <input name="contact" type="number" onChange={(e)=>{setContact(e.target.value)}}></input>
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
      <th>ADDRESS</th>
      <th>SEX</th>
      <th>CONTACT</th>
    </tr>
  </thead>
  <tbody>
        {data.map((val)=>{
            return(
              <tr key={val.pid}>
                <td>{val.pid}</td>
                <td>{val.name}</td>
                <td>{val.address}</td>
                <td>{val.sex}</td>
                <td>{val.contact}</td>
              </tr>
            )
        })}
  </tbody>
</Table>
    </>
  );
  
}

export default Doctor;