import Axios from "axios";
import React, {useEffect, useState } from "react";
import {Table,Modal,Button} from 'react-bootstrap';

function Lab() {

  const [Lab,setLab] = useState([]);

    useEffect(()=>{
        Axios.get("http://localhost:3001/Getlab").then((result)=>{
            setLab(result.data);
        })
    
    },[])
  return (
    <>
      <Table>
          <thead>
              <tr>
                <th>Patient Id</th>
                <th>Diagnose</th>
                <th>Date</th>
                <th>Doctor Id</th>
              </tr>
          </thead>
          <tbody>
            {
              Lab.map((e)=>{
                    return(
                      <tr>
                          <td>{e.p_id}</td>
                          <td>{e.diagnosis}</td>
                          <td>{e.date}</td>
                          <td>{e.doc_id}</td>
                      </tr>
                    )
              })
            }
          </tbody>
      </Table>
    </>
  );
}

export default Lab;