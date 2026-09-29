import { useParams } from "react-router-dom"; 
import { useState, useEffect } from 'react'
import "./style.css"

 function Digimon(){
const { name } = useParams(); 
const [dataDigi, setDataDigi] = useState([]);

  useEffect(() => {
    fetch("https://digimon-api.vercel.app/api/digimon/${name}")
      .then(response => response.json())
      .then(responseData => setDataDigi(responseData))
      .catch(error => console.error("Error:", error));
  }, [name]);
  console.log(dataDigimon)

 }
 export default  Digimon