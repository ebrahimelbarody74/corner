import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CreateTenant({ setUpdateProjects, updateProjects }) {
  const [open, setOpen] = useState(false);
  const [subdomain, setSubdomain] = useState(false);
  const { user, error } = useSelector((state) => state.auth);
  const toast = useRef(null);
  const params = useParams().name;

  const [project_name, setproject_name] = useState("");
  const create = async () => {
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
        `https://${params}.almnew.online/api/create-tenant`,
        { subdomain: subdomain },
        config
      );
      //   setLoading(false);
      if (res.status === 200) {
        setUpdateProjects(!updateProjects);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Created Successful",
          life: 3000,
        });
      }
      console.log(res);
      return res.data;
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Name is duplicate",
        life: 3000,
      });
      // return custom error message from backend if present
      console.log(error);
      //   setLoading(false);
    }
  };
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
  const [allCurrency, setAllCurrency] = useState("");
  const [oneCurrency, setOneCurrency] = useState("");
  const handleGetAllCurrency = async (page) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`https://restcountries.com/v3.1/all`, config);
      console.log("currency-all", res);
      if (res.status === 200) {
        setAllCurrency(res.data);
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
    handleGetAllCurrency();
  }, []);

  const [myCuurency, setMyCurrency] = useState("");
  const handlemyCurrency = async (page) => {
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
        `https://${params}.almnew.online/api/currency-all
`,
        config
      );
      console.log("first", res);
      if (res.status === 200) {
        setMyCurrency(res.data.currency[0]);
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
    handleGetAllCurrency();
    handlemyCurrency();
  }, []);
  const currencySend = async () => {
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
        `https://${params}.almnew.online/api/currency-set/${params}`,
        { currency: oneCurrency.name.common, setNameDone: 1 },
        config
      );
      //   setLoading(false);
      if (res.status === 200) {
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
    <>
      <div className="cursor-pointer mx-3" onClick={() => setOpen(true)}>
        Create Project
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
        <div className="field mb-4">
          <label htmlFor="name1" className="font-bold">
            Create Project
          </label>

          <div class="form-floating mb-4">
            <input
              id="name"
              type="text"
              placeholder="Text Input"
              onChange={(e) => setSubdomain(e.target.value)}
              required
              //   autoFocus
              //   defaultValue={editRow.name}
              class="form-control"
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              label="Save"
              icon="pi pi-check"
              className="w-20 m-auto"
              onClick={() => create()}
            />
          </div>
        </div>
        {/* <div className="field">
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
        </div> */}

        {myCuurency.setCurrency != "1" && (
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Project Currency ?
            </label>
            <div class="form-floating mb-4">
              <Dropdown
                value={oneCurrency}
                onChange={(e) => setOneCurrency(e.value)}
                options={allCurrency}
                optionLabel={"name.common"}
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <Button
                label="Update"
                icon="pi pi-check"
                className="w-20 m-auto"
                onClick={() => currencySend()}
              />
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}

export default CreateTenant;
