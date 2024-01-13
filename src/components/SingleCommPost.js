import React, { useState } from "react";
import { useEffect } from "react";
import { Text, Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import ImageCard from "./ImageCard";
import { useSupabase } from "../context/SupabaseContext";


function SingleCommPost({ item }) {

  const {allPolice}=useSupabase();
  const[stars,setStars]=useState([]);
  // console.log(allPolice);
 
 useEffect(()=>{
let number=0;

  for(var i=0; i<allPolice.length; i++){

    if(allPolice[i].policeStation===item.name){
     
      number=allPolice[i].ps_Rating;
    
      break;
    }
  }
  const temp = [];
  for (var i = 0; i < 5; i++) {
    if (i < number) {
      temp.push(
        <span key={i}>
          <BsStarFill color="gold" />
        </span>
      );
    } else {
      temp.push(
        <span key={i}>
          <BsStarFill color="grey" />
        </span>
      );
    }
  }
  setStars(temp);

 },[allPolice])
  

 

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  return (
    <div data-aos="fade-up">
      <ImageCard ImgSrc={item.image}>
        <div className="w-full h-full flex justify-between items-center">
          <div>
            <h1 className="font-sans font-bold text-2xl">{item.name}</h1>
            <div className="flex w-full items-center justify-start">
              <Text className="mr-2">{item.address}</Text>
              <Text color="blue.600" fontSize="sm" className="flex">
                {stars.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </Text>
            </div>
          </div>
          <div className="flex justify-end">
            <ButtonGroup>
              <Link to={`/single/${item.id}`}>
                <Button variant="solid" bg="#F4BC77" fontWeight="bold">
                  View more
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </ImageCard>
    </div>
  );
}

export default SingleCommPost;
