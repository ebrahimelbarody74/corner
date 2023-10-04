// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";
import Footer from "Component/Footer/Footer";
import Header from "Component/Header/Header";
// Assets
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
import axios from "axios";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { dominStatus } from "rtk/slices/authSlice";
import Project from "views/admin/profile/components/Project";

function Projects({ setDomin }) {
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  const [data, setData] = useState([]);
  const dispatch = useDispatch("");
  const params = useParams("").name;
  const getData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
        },
      };
      const res = await axios.get(
        `https://${params}.almnew.online/api/tenant`,

        config
      );
      console.log(res);
      if (res.status === 200) {
        setData(res.data.tenants);
        setDomin(true);
        dispatch(dominStatus(true));
      } else {
        dispatch(dominStatus(false));
        setDomin(false);
        console.log(res);
      }
    } catch (error) {
      // setLoading(false);
      setDomin(false);
      dispatch(dominStatus(false));
      console.log(error);

      //  setError(true);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header project={"true"} />
      <div
        className=" d-flex algin-items-center justify-content-center container"
        style={{ height: "100vh",zIndex:"1" }}
      >
        <div className="col-12 col-lg-8 col-xxl-6 m-auto ">
          <Card mb={{ base: "0px", "2xl": "20px" }}>
            <Text
              color={textColorPrimary}
              fontWeight="bold"
              fontSize="2xl"
              mt="10px"
              mb="4px"
              className="w-100 text-center c-green"
            >
              All projects
            </Text>
            <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
              {/* Here you can find more details about your projects. Keep you user
            engaged by providing meaningful information. */}
            </Text>
            {data?.map((e, index) => (
              <div className="card   my-2 p-4">
                <div className="d-flex justify-content-between">
                  <div className="">{e.id}</div>
                  <div className="">
                    <Link
                      to={`/${e.id}/login`}
                      className="gradient-button"
                      style={{ lineHeight: "initial" }}
                    >
                      <div id="modal_trigger" href="#modal" className="active">
                        <i className="fa fa-sign-in-alt" /> Sign In Now
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {/* <Project
            boxShadow={cardShadow}
            mb="20px"
            // image={Project2}
            ranking="2"
            link="#"
            title="Gsdf"
          />
          <Project
            mb="20px"
            boxShadow={cardShadow}
            // image={Project3}
            ranking="3"
            link="#"
            title="Most essential tips for Burnout"
          /> */}
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Projects;
