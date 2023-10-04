import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AllProjects({
  setUpdateProjects = { setUpdateProjects },
  updateProjects = { updateProjects },
}) {
  const [open, setOpen] = useState(false);
  const [subdomain, setSubdomain] = useState(false);
  const { user, error } = useSelector((state) => state.auth);
  const [data, setData] = useState();
  const params = useParams().name;
  const toast = useRef();
  const getAllprojects = async (page) => {
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
        `https://${params}.almnew.online/api/tenant`,
        config
      );
      console.log("Project-get", res);
      if (res.status === 200) {
        setData(res.data.tenants);
        // setbuilding_code(res.data.buildings.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);

      //  setError(true);
    }
  };
  useEffect(() => {
    getAllprojects();
  }, [updateProjects]);

  const confirmDeleteProduct = async (e) => {
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
        `https://${params}.almnew.online/api/delete-tenant/${e.id}`,
        config
      );
      console.log("Project-get", res);
      if (res.status === 200) {
        getAllprojects();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Deleted Successful",
          life: 3000,
        });
        // setbuilding_code(res.data.buildings.data);
      } else {
        console.log(res);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);

      //  setError(true);
    }
  };
  return (
    <>
      <div className="cursor-pointer mx-3" onClick={() => setOpen(true)}>
        All Project
      </div>
      <Toast ref={toast} />
      <Dialog
        visible={open}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={" All Project"}
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
        {data?.map((e, index) => (
          <div
            className="d-flex justify-content-between align-items-center mb-3 pb-3"
            style={{ borderBottom: "1px solid #ccc" }}
          >
            <span>{e.id}</span>
            <span>
              <AiOutlineDelete
                class="uil uil-backspace fs-25 text-red cursor-pointer"
                onClick={() => confirmDeleteProduct(e)}
              />
            </span>
          </div>
        ))}
      </Dialog>
    </>
  );
}

export default AllProjects;
