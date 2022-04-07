import Axios from "axios";
import React, {useEffect, useState } from "react";
import {Table,Modal,Button} from 'react-bootstrap';

function Room() {
  const [show, setShow] = useState(false);
  const [Rtype,setRtype] = useState("");
  const [Rlist,setRlist] = useState([]);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

    const rememberMe = localStorage.getItem('Price');
    console.log(rememberMe);
  

  const RoomType = ()=>{
      Axios.post("http://localhost:3001/RoomType",{type : Rtype});
  }
  useEffect(()=>{
    Axios.get("http://localhost:3001/Roomlist").then((result)=>{
      setRlist(result.data);
      // console.log(result)
    })
  
  })
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add Room
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Room Type</label>
            <input type={"text"} onChange={(e)=>{setRtype(e.target.value)}}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>{handleClose() ; RoomType()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>Available</h1>
      <Table>
          <thead>
              <tr>
                <th>Room Id</th>
                <th>Room Type</th>
                <th>Patient Id</th>
              </tr>
          </thead>
          <tbody>
            {
              Rlist.map((e)=>{
                  if(e.status === 'A'){
                    return(
                      <tr>
                          <td>{e.room_id}</td>
                          <td>{e.room_type}</td>
                          <td>-</td>
                      </tr>
                    )
                  }
              })
            }
          </tbody>
      </Table>
      <h1>Not Available</h1>
      <Table>
          <thead>
              <tr>
                <th>Room Id</th>
                <th>Room Type</th>
                <th>Patient Id</th>
              </tr>
          </thead>
          <tbody>
            {
              Rlist.map((e)=>{
                if(e.status === 'N'){
                  return(
                    <tr>
                        <td>{e.room_id}</td>
                        <td>{e.room_type}</td>
                        <td>{e.pat_id}</td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
      </Table>
    </>
  );
}

export default Room;