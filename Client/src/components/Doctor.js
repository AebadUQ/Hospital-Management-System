import React, { useEffect } from "react";
import  {useState} from 'react';
import {Button,Modal,Table} from 'react-bootstrap';
import Top from './Doctor/Top';
import Demo from './Doctor/Second/demo';
import Third from './Doctor/Third';
// import FAQs from './Doctor/FAQs/FAQ';
import "./styles.css";
import Axios from 'axios'
// import { params } from "../../../server/routes/main";
// var p=0;
function Doctor(props) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handle1Close = () => setShow2(false);
  const handle1Show = () => setShow2(true);
  
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [Drugname,SetDrugname] = useState([]);
  const [Drugs,setDrugs] =useState([]);
  const [Dept,setDept] = useState(""); 
  const [Name,setName] = useState("");
  const [Roomlist,setRoomlist] = useState ([]);
  const [data,setdata] = useState([]);
  const [id,setid] = useState(0);
  const [Docprice,setDocprice] = useState()
  const [Pdata,setPdata] = useState([]);
  const [Pidlist,setPidlist] = useState([]);
  const [Did,setDid] = useState([]);
  const [e,sete] =useState("");
  const [Rid,setRid] = useState(0);
  const [Docid,setDocid] = useState(0);
  const [Diagnosis,setDiagnosis] = useState("")
  
  const Submit =()=>{
    Axios.post("http://localhost:3001/Doctor",{Name: Name,Department : Dept}).then(()=>{
      alert("Update Success!");
    })
    sete("!");
  }
  
  const Bookroom = ()=>{
  
    Axios.post("http://localhost:3001/Booking",{id : id,rid : Rid }).then(()=>{
        alert("Booked!")
    })
    
  }
  const getData = ()=>{
      
      Axios.get("http://localhost:3001/DoctorGetPatientDetail",{params:{id: id}}).then((result)=>{
          setPdata(result.data);
      })
      sete("!");
  }

  
  const getbill = async ()=>{
    let promises=[];
    var p =0 ;
    // console.log(Drugs)
    setDrugs([])
    for(var i=0;i<Drugs.length;i++){
    promises.push(
        await Axios.get(("http://localhost:3001/getBill"),{params : {array : Drugs[i]}}).then((result)=>{
          p = p + result.data[0].price; 
        })
        
        ,
        // console.log(p)
    )
    Promise.all(promises);
    }
    p = parseInt(p);
   setid (parseInt(id));
     let total = parseInt(Docprice) + p;
    Axios.post(("http://localhost:3001/Filldrugprice"),{id : id,doc : Docprice,dp : p,total : total},(err,result)=>{
      console.log(typeof(total),typeof(p));
    })
    Axios.post(("http://localhost:3001/Numdays"),{id : id},(err,result)=>{});
    Axios.post("http://localhost:3001/Genlab",{id : id,d : Docid,dia : Diagnosis }).then(()=>{

    })
  }
  useEffect(()=>{
    Axios.get("http://localhost:3001/getDoctor").then((resultt)=>{
      setdata(resultt.data);
    //   console.log(resultt.data)
    })
    Axios.get("http://localhost:3001/DoctorGetPatient").then((result)=>{
        setPidlist(result.data);
    })
    Axios.get("http://localhost:3001/DoctorId").then((result)=>{
        setDid(result.data);
    })
    Axios.get("http://localhost:3001/Dlist").then((result)=>{
        SetDrugname(result.data);
    })
    Axios.get("http://localhost:3001/getRoom").then((result)=>{
        setRoomlist(result.data);
    })
  },[])
  useEffect(()=>{
    
    Axios.get("http://localhost:3001/getDoctor").then((resultt)=>{
      setdata(resultt.data);

    })
    Axios.get("http://localhost:3001/DoctorGetPatient").then((result)=>{
        setPidlist(result.data);
    }
    )
    Axios.get("http://localhost:3001/Dlist").then((result)=>{
        SetDrugname(result.data);
    })
    Axios.get("http://localhost:3001/DoctorId").then((result)=>{
        setDid(result.data);
    })
    
  },[e])
  
  return (
    <>
      <Top/>
      <Demo/>
      <Third/>
      <Button variant="primary" onClick={handleShow}>
        + Add Doctor
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
            <lable>Department</lable>
            <input name="Dept" type="text" onChange={(e)=>{setDept(e.target.value)}}></input>
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
        {/* {console.log(Pdata)} */}
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>DEPARTMENT</th>
    </tr>
  </thead>
  <tbody>
      { data.map((e)=>{
          return(
              <tr>
                  <td>{e.d_id}</td>
                  <td>{e.d_name}</td>
                  <td>{e.dept}</td>
              </tr>
          )
      })

      }
        </tbody>
    </Table>
    <hr/>
    {/* {console.log(Totalprice)} */}
    <hr/>
      <select onChange={(e)=>{setid(e.target.value)}}>
          <option value="none">Select Id</option>
          {
              Pidlist.map((e)=>{
                return(
                    <option value={e.pid} >{e.pid}</option>
                )
              })
          }
      </select>
        <button onClick={getData}>Get Detail</button>
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>ADDRESS</th>
                <th>SEX</th>
                <th>CONTACT</th>
                <th>Doctor Id</th>
                <th>Check</th>
            </tr>
        </thead>
        <tbody>
            {
                Pdata.map((e)=>{
                    return(
                        <tr>
                            <td>{e.name}</td>
                            <td>{e.address}</td>
                            <td>{e.sex}</td>
                            <td>{e.contact}</td>
                            <td>
                                <select onChange={(e)=>{setDocid(e.target.value)}}>
                                    <option  value="-">Select Doctor Id</option>
                                    {Did.map((e)=>{
                                        return(
                                            <option value={e.d_id}>{e.d_id}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td>
                            <Button variant="primary" onClick={handle1Show}>
                              check
                            </Button>

                            <Modal show={show2} onHide={handle1Close}>
                              <Modal.Header closeButton>
                                <Modal.Title>LabReport and BILL</Modal.Title>
                              </Modal.Header>
                              <Modal.Body >
                                <div style={{display: "flex" , flexDirection : "column"}}>

                                  <lable>Diagnosis</lable>
                                  <input type="text" name="Diagnosis" onChange={(e)=>{setDiagnosis(e.target.value)}}></input>
                                </div>
                                <div style={{display: "flex",flexDirection: "column"}}>
                                      {
                                        Drugname.map((e)=>{
                                          return(
                                            <div>
                                              <input type="radio" key={e.drug_id} value={e.d_name} onChange={(e)=>(setDrugs([...Drugs,e.target.value]))}/>{e.d_name}
                                              
                                            </div>
                                          )
                                          
                                        })
                                        
                                      }
                                </div>
                                <div>
                                  <select onChange={(e)=>{setRid(e.target.value)}}>
                                      <option>Select Room</option>
                                      {
                                        Roomlist.map((e)=>{
                                          return(
                                            <option value={e.room_id}>{e.room_id}</option>
                                          )
                                        })
                                      }
                                  </select>
                                </div>
                                <label>Price</label>
                                <input type={"number"} onChange={(e)=>{setDocprice(e.target.value)}}></input>
                               
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handle1Close}>
                                  Close
                                </Button>
                                <Button variant="primary" onClick={() => {handle1Close(); getbill(); Bookroom();} }>
                                  Submit
                                </Button>
                              </Modal.Footer>
                            </Modal>
                 
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </Table>
    </>
  );
  
}

export default Doctor;