import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import TabAbout from "../components/TabAbout";
import TabReviews from "../components/TabReviews";
import TabData from "../components/TabData";
import { useSupabase } from "../context/SupabaseContext";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
function Single() {
  const { id } = useParams();
  const { tableData: policeStations } = useSupabase();
  const { setIndividual } = useSupabase();
  const [policeData, setPoliceData] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    if (policeStations) {
      setPoliceData(policeStations[Number(id) - 1]);
    }
  }, [id, policeStations]);
  if (!policeData) return null;
  const handleClick = () => {
    setIndividual(policeData.name);
    navigator("/newVisit");
  };

  return (
    <div>
      <Button size={"lg"} className="customButton mt-32 ml-2">
        {" "}
        <Link to="/">
          <span className="text-lg flex items-center">
            <IoMdArrowBack />
            Back to All Post
          </span>{" "}
        </Link>
      </Button>

      <div className="container mx-auto flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-16 gap-24 w-full">
          <div className="flex items-center flex-col justify-center">
            <img
              src={policeData.image}
              alt="police station"
              className="w-full h-auto drop-shadow-lg object-cover rounded-xl"
            />
            <div className="w-[100%] mt-4 flex items-center justify-between">
              <Button size={"lg"} className="w-[48%] customButton">
                {" "}
                <span className="text-xl" onClick={handleClick}>
                  Mark as Visited
                </span>{" "}
              </Button>
              <Button size={"lg"} isDisabled={true} className="w-[48%]">
                {" "}
                <span className="text-xl">Fill Feedback</span>
              </Button>
            </div>
          </div>

          <Tabs
            isLazy
            defaultIndex={0}
            isFitted
            variant="enclosed"
            className="drop-shadow-lg"
          >
            <TabList>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">About</span>
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">Reviews</span>
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8C4E1D" }}>
                <span className="text-xl font-semibold">Data</span>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel bgColor={"#FFFFFF"}>
                <TabAbout policeData={policeData} />
              </TabPanel>
              <TabPanel bgColor={"#FFFFFF"}>
                <TabReviews />
              </TabPanel>
              <TabPanel bgColor={"#FFFFFF"}>
                <TabData />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Single;
