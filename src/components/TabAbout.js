/* eslint-disable no-redeclare */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";
import { useSupabase } from "../context/SupabaseContext";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import MapComponent from "./MapComponent";
import { useTranslation } from "react-i18next";

function TabAbout({ policeData }) {
  const [stars, setStars] = useState([]);
  const { allPolice } = useSupabase();
  const { t } = useTranslation();

  useEffect(() => {
    let number = 0;
    for (var i = 0; i < allPolice.length; i++) {
      if (allPolice[i].policeStation === policeData.name) {
        number = allPolice[i].ps_Rating;
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
  }, [policeData, allPolice]);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row w-[52%] justify-between">
        <h1 className="text-xl md:text-3xl font-semibold text-[#8C4E1D]">
          {policeData.name}
        </h1>
        <Text color="blue.600" className="flex mt-1">
          {stars.map((tag, index) => (
            <span className="text-xl md:text-2xl" key={index}>
              {tag}
            </span>
          ))}
        </Text>
      </div>
      <Text fontSize="md" className="mt-4">
        <div className="text-lg md:text-xl flex flex-col">
          {" "}
          <span className="text-[#8c4e1d] font-semibold">
            {t("single.pincode")}
          </span>{" "}
          <span className="mt-1">{policeData.address}</span>{" "}
        </div>
      </Text>
      <div className="map-container mt-5">
        <h1 className="text-[#8c4e1d] text-lg md:text-xl font-semibold">
          {t("single.location")}
        </h1>
        <MapComponent
          latitude={27.658927968783715}
          longitude={76.59560895116964}
        />
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-2">
        <div className="flex flex-row gap-2">
          <IoCallOutline />
          <span className="text-[#8c4e1d] font-semibold">{`${t(
            "single.contactNumber"
          )}: `}</span>
        </div>
        <a
          href={"tel:" + policeData.Phone_Number}
          className="ml-[8%] md:ml-0 hover:text-[#886ef1] duration-200"
        >
          {policeData.Phone_Number}
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-2 mt-2">
        <div className="flex flex-row gap-2">
          <IoMailOutline />
          <span className="text-[#8c4e1d] font-semibold">{`${t(
            "single.contactEmail"
          )}: `}</span>
        </div>
        <a
          href={"mailto:" + policeData.email}
          className="ml-[8%] md:ml-0 hover:text-[#886ef1] duration-200"
        >
          {policeData.email}
        </a>
      </div>
    </div>
  );
}

export default TabAbout;
