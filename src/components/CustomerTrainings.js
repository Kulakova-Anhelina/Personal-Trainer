import React, { useState, useEffect} from "react";

export default function CustomerTrainings(props) {

const [trainings, setTrainings] = useState('')

useEffect(()=>{
fetchData()
},[])

const fetchData = (link) =>{

    fetch(link)
    .then(response => response.json())
    .then(responseData =>{
        setTrainings(responseData.content)
        console.log(responseData.content)
    })


}




return (
   <div></div>
)
}