import React, { useEffect, useRef, useState } from "react";

// Chakra imports
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { loginSuccess } from "rtk/slices/authSlice";
import ExportAll from "pages/ExportAll/ExportAll";
import img from "../../../assets/img/logo-removebg-preview.png"
export function SidebarBrand() {
  const { user, error } = useSelector((state) => state.auth);

  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  const [open, setOpen] = useState(false);
  const [subdomain, setSubdomain] = useState(false);
  const [project, setProduct] = useState("");
  const toast = useRef(null);
  const params = useParams().name;
  const [project_name, setproject_name] = useState("");
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(
        `https://${params}.almnew.online/api/Project-get`,

        config,
        config
      );

      console.log(res);
      if (res.status === 200) {
        setProduct(res.data.data[0]);
      }
      console.log(res);
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      //   setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const update = async () => {
    console.log(project_name);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post(
        `https://${params}.almnew.online/api/Project-update`,
        { project_name },
        config
      );

      //   setLoading(false);
      if (res.status === 200) {
        setOpen(false);
        getUser();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Edit Successful",
          life: 3000,
        });
      }
      console.log(res);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Network Error",
        life: 3000,
      });
      // return custom error message from backend if present
      console.log(error);
      //   setLoading(false);
    }
  };
  return (
    <Flex align="center" direction="column">
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <img src={img} className=" mb-3" style={{ width: "40%" }} />
      {/* <h1>Corner Edge</h1> */}

      <div className="d-flex align-items-center justify-content-between w-100">
        <h1 className="fs-30">{project.project_name}</h1>
        <i
          onClick={() => setOpen(true)}
          class="uil uil-edit fs-25 text-blue cursor-pointer"
          icon="pi pi-pencil mr-2"
          // onClick={() => editProduct(rowData)}
        ></i>
      </div>
      <Dialog
        visible={open}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={" Create Project"}
        modal
        className="p-fluid"
        footer={
          <React.Fragment>
            <Button
              label="Cancel"
              icon="pi pi-times"
              outlined
              onClick={() => setOpen(false)}
            />
            {/* <Button label="Save" icon="pi pi-check" onClick={() => create()} /> */}
          </React.Fragment>
        }
        onHide={() => setOpen(false)}
      >
        <Toast ref={toast} />

        <div className="field">
          <label htmlFor="name1" className="font-bold">
            Update Your Project
          </label>
          <div class="form-floating mb-4">
            <input
              id="name"
              type="text"
              placeholder="Text Input"
              onChange={(e) => setproject_name(e.target.value)}
              required
              //   autoFocus
              //   defaultValue={editRow.name}
              class="form-control"
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              label="Update"
              icon="pi pi-check"
              className="w-20 m-auto"
              onClick={() => update()}
            />
          </div>
        </div>
      </Dialog>
      <HSeparator mb="20px" />

      <div className="">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <ExportAll />
        </Box>
        {/* <Box mt="60px" mb="40px" borderRadius="30px">
          <SidebarCard />
        </Box> */}
      </div>
    </Flex>
  );
}

export default SidebarBrand;
