import React from "react";
import "./styles.css";
import Img from './Img';
import Service from './Service';
import Team from './Team';
// import Footer from './components/Home/footer';
import Feature from './Feature';

export default function App() {
  return (
    <div className="App">
     <Img/>
     <Feature/>
     <Service/>
     <Team/>
   
     {/* <Footer/> */}
    </div>
  );
}