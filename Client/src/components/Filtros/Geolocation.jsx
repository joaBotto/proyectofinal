import axios from "axios";
// import { GoogleMap, Marker } from "@react-google-maps/api"



 function getUserCurrenPosition(){
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( ({coords:{latitude,longitude}})=>{
        
        const coords ={
            lati:latitude,
            lng:longitude,
        }
        console.log(coords)
    },
    ()=>{
        alert(ErrorEvent)
    })
} else {
    "Tu navegador no Dispone de Geolocalizacion"
}

}

window.initMap = function () {
    const coordUbicaction = { lat: 0, lng: 0 }; 
    const mapDiv = document.getElementById("map"); // este map va  con el ID del  contenedor de mapa en cards
    const map = new window.google.maps.Map(mapDiv, {
      zoom: 10,
      center: coordUbicaction
    });
    const marker = new window.google.maps.Marker({
      position: coordUbicaction,
      map: map
    });
  }
  
  



export default {getUserCurrenPosition}

{/* <title>Maps</title>
	<link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
	<div id="map"></div>
<script src="script.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMap"></script> */}