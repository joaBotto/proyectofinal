import axios from "axios";
// import { GoogleMap, Marker } from "@react-google-maps/api"



 function getUserCurrenPosition(){
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( ({coords:{latitude,longitude}})=>{
        console.log(coords)
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



 














// window.initMap = function () {
//     const coordUbicaction = { lat: 0, lng: 0 }; 
//     const mapDiv = document.getElementById("map"); // este map va  con el ID del  contenedor de mapa en cards
//     const map = new window.google.maps.Map(mapDiv, {
//       zoom: 10,
//       center: coordUbicaction
//     });
//     const marker = new window.google.maps.Marker({
//       position: coordUbicaction,
//       map: map
//     });
//   }
  
  



export default {getUserCurrenPosition}

{/* <title>Maps</title>
	<link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
	<div id="map"></div>
<script src="script.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMap"></script> */}



// const handleAddressChange = (address) => {
//     setFieldValue("address.street", address);
  
//     geocodeByAddress(address)
//       .then(results => {
//         // Encuentra el componente de dirección (calle)
//         const streetComponent = results[0]?.address_components.find(component => component.types.includes("route"));
//         // Encuentra el componente de ciudad
//         const cityComponent = results[0]?.address_components.find(component => component.types.includes("locality"));
//         // Encuentra el componente de estado
//         const stateComponent = results[0]?.address_components.find(component => component.types.includes("administrative_area_level_1"));
  
//         // Actualiza los campos correspondientes
//         if (streetComponent) {
//           setFieldValue("address.street", streetComponent.long_name);
//         }
//         if (cityComponent) {
//           setFieldValue("address.city", cityComponent.long_name);
//         }
//         if (stateComponent) {
//           setFieldValue("address.state", stateComponent.short_name);
//         }
//       })
//       .then(latLng => {
//         console.log("Coordenadas:", latLng);
//       })
//       .catch(error => console.error("Error al obtener coordenadas:", error));
//   };
  
//   window.initMap = function () {
//     // Asegúrate de que values no sea undefined y tenga la estructura esperada
//     if (values && values.address) {
//       const address = values.address.street + ', ' + values.address.city + ', ' + values.address.state;
  
//       // Utiliza geocodeByAddress para obtener las coordenadas de la dirección
//       geocodeByAddress(address)
//         .then(results => getLatLng(results[0]))
//         .then(latLng => {
//           console.log("Coordenadas:", latLng);
  
//           // Actualiza el estado del formulario con las coordenadas
//           setFieldValue("coordinates", latLng);
  
//           // Crear un objeto con las coordenadas
//           const coordUbicaction = { lat: latLng.lat, lng: latLng.lng };
  
//           // Obtén el elemento del DOM donde se mostrará el mapa
//           const mapDiv = document.getElementById("map");
  
//           // Crea un nuevo mapa de Google en el elemento mapDiv
//           const map = new window.google.maps.Map(mapDiv, {
//             zoom: 10,
//             center: coordUbicaction
//           });
  
//           // Agrega un marcador al mapa en la ubicación de las coordenadas
//           const marker = new window.google.maps.Marker({
//             position: coordUbicaction,
//             map: map
//           });
//         })
//         .catch(error => console.error("Error al obtener coordenadas:", error));
//     } else {
//       console.error("Error: 'values' es undefined o no tiene la estructura esperada.");
//     }
//   };
  