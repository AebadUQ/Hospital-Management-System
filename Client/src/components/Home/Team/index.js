import React from "react";
import "./style.css";

export default function CC() {
  return (
    <div >
<div className="head">
  <h1>OUR TEAM</h1>
  </div>

<div className="row">
  <div className="column">
    <div className="card">
      <img src="https://purepng.com/public/uploads/large/purepng.com-doctordoctorsdoctors-and-nursesclinicianmedical-practitionernotepadfemale-1421526857248uragw.png" alt="Jane" />
      <div className="container3">
        <h2>jenny  
</h2>
        <p className="title">NEUROSURGEON</p>
        <p>Chief Surgeon</p>
        {/* <p>example@example.com</p> */}
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvYM1uBz2gzlcOYWCZQYAJfUAvwZRO6d4SQ&usqp=CAU" alt="John" />
      <div className="container3">
        <h2>John Doe</h2>
        <p className="title">SURGEON</p>
        <p>Vp Emergency Reponse Tea</p>
        {/* <p>example@example.com</p> */}
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column">
    <div className="card">
      <img src="https://cdn.sanity.io/images/0vv8moc6/hcplive/0ebb6a8f0c2850697532805d09d4ff10e838a74b-200x200.jpg?auto=format" alt="Mike" />
      <div className="container3">
        <h2>Tom Adams</h2>
        <p className="title">CARDIOLOGY</p>
        <p>Head.</p>
        {/* <p>example@example.com</p> */}
        <p><button className="button">Contact</button></p>
      </div>
    </div>
  </div>
  
 
</div>
    </div>
  );
}
