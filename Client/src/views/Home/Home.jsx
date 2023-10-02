import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { getProperty } from "../../redux/actions";

export default function Home() {
const dispatch = useDispatch();
const properties = useSelector(state => state.properties)

useEffect(()=>{
	dispatch(getProperty())	
	},[dispatch])

useEffect(()=>{
	//// VOLVER A LA PAG 1 CUANDO CAMBIE EL ESTADO DE PROPERTIES
},[properties])


	return (
		<div>
			<div>
				<NavBar />
			</div>
			<div></div>
			<div>
				<Footer />
			</div>
		</div>
	);
}
