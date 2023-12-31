/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Heading, Image, Stack } from "@chakra-ui/react";
import { encrypt,decrypt } from "n-krypta";
const SECRET_KEY='ABC'

function SingleFeedbackPost({ item, ImgLinks, addressLinks }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);


  const formatTimestamp = (timestamp) => {
    const date = timestamp ? new Date(timestamp) : null;

    if (date) {
      // Set options for formatting
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata",
      };

      const formattedDateTime = date.toLocaleString("en-IN", options);
      return formattedDateTime;
    }

    return "N/A";
  };

  return (
    <div data-aos="fade-up">
      <Card 
        direction={{base: 'column', sm: 'row'}}  
        overflow='hidden'
        variant='outline'
        className="my-4 mx-10 md:mx-20 rounded-2xl shadow-md hover:scale-105 duration-300"
        background='#F0F0F0'
        borderRadius='[20px]'
        border={"solid"}
        borderColor={"#8C4E1D"}
      >
        <Image 
          objectFit='cover'
          maxW={{base:'100%', sm:'30%'}}
          src={ImgLinks.get(item.policeStation)}
          alt={`${item.name} Police Station Picture`}
        />

        <Stack>
          <CardBody>
            <Heading size='md'>{item.policeStation}</Heading>
            <p className="py-2">
              <span className="font-semibold">Address </span>{addressLinks.get(item.policeStation)}
            </p>
            <p className="py-2">
            <span className="font-semibold">Reporting Date & Time - </span>{formatTimestamp(item.created_at)}
            </p>
          </CardBody>
          <CardFooter>
            <div>
              <p className="font-semibold">Feedback:</p>
              <p className={` ${
            item.Feel < 0 ? "text-red-600" : "text-green-700"
            }`}>{decrypt(item.feedback,toString(process.env.SECRET_KEY))}</p>
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default SingleFeedbackPost;
