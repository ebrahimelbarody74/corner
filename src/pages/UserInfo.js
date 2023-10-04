import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UserInfo() {
  const [oneCurrency, setOneCurrency] = useState("");

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [role, setrole] = useState("");

  const toast = useRef(null);
  const params = useParams().name;
  const paramsId = useParams().id;
  const { user, error } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState("");
  const Navigate = useNavigate("");
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
        `https://${params}.almnew.online/api/user/${paramsId}`,

        config
      );

      console.log(res);
      if (res.status === 200) {
        setUserInfo(res.data);
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
    console.log(role);
    const data = {
      name: name ? name : userInfo?.user?.name,
      email: email ? email : userInfo?.user?.email,
      password,
      password_confirmation,
      role: role?.id ? role?.id : userInfo?.user?.admin,
    };
    console.log(data);
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
        `https://${params}.almnew.online/api/users-update/${paramsId}`,
        data,
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

  const [deleteElement, setDelete] = useState(false);

  const deleteHandle = async () => {
    // console.log(data);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.delete(
        `https://${params}.almnew.online/api/user-destroy/` + paramsId,

        config
      );
      // console.log(res);
      if (res.status === 200) {
        Navigate(`/${params}/users`);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Deleted Successful",
          life: 3000,
        });

        setDelete(false);
      } else {
        // console.log(res);

        setDelete(false);
      }
    } catch (error) {
      // setLoading(false);
      // console.log(error);

      setDelete(false);

      //  setError(true);
    }
  };
  return (
    <div className="col-sm-12 mt-17">
      <Toast ref={toast} />
      {/* <div className="p-2">
        <form className="mb-30 bg-light rounded-3 p-6">
          <h6 className="mb-4">Change User Info</h6>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Actions
            </label>
            <div class="form-floating mb-4">
              <Dropdown
                value={oneCurrency}
                onChange={(e) => setOneCurrency(e.value)}
                options={[
                  { name: "Super Admin" },
                  { name: "Admin" },
                  { name: "user" },
                ]}
                optionLabel="name"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirmation New Password
            </label>
            <input
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
              className="form-control"
              fdprocessedid="1sryb"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            fdprocessedid="ghacal"
          >
            update Now
          </button>
        </form>
      </div> */}
      <div className="p-2">
        <form
          className="mb-30 bg-light rounded-3 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <h6 className="mb-4">Change Password to user Name</h6>
          <input
            type="hidden"
            name="_token"
            defaultValue="xtTUJvPocEdfzYF8rvXQa8z1Ti9mZY4zd6SjPqrG"
          />
          <input type="hidden" name="_method" defaultValue="put" />{" "}
          <div class="mb-3" fdprocessedid="dkc10e">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              name="text"
              type="text"
              autoComplete="new-password"
              className="form-control "
              defaultValue={userInfo?.user?.name}
              fdprocessedid="hsfv5q"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="mb-3" fdprocessedid="dkc10e">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              name="text"
              type="text"
              autoComplete="new-password"
              defaultValue={userInfo?.user?.email}
              className="form-control "
              fdprocessedid="hsfv5q"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div class="mb-3" fdprocessedid="dkc10e">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              className="form-control "
              fdprocessedid="hsfv5q"
              defaultValue={userInfo?.user?.password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirmation New Password
            </label>
            <input
              name="password_confirmation"
              type="password"
              autoComplete="new-password"
              className="form-control"
              fdprocessedid="1sryb"
              defaultValue={userInfo?.user?.password}
              onChange={(e) => setpassword_confirmation(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Actions
            </label>
            <div class="form-floating mb-4">
              <Dropdown
                value={role}
                onChange={(e) => setrole(e.value)}
                options={[
                  { name: "Super Admin", id: 2 },
                  { name: "Admin", id: 1 },
                  { name: "user", id: 0 },
                ]}
                optionLabel="name"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            fdprocessedid="ghacal"
          >
            update Now
          </button>
        </form>

        <form
          className="mb-30 bg-light rounded-3 p-6 mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            setDelete(true);
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <h2>Delete Account</h2>
            <button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={() => setDelete(true)}
              className="btn btn-danger rounded-xl  fs-14   mb-2"
            >
              Delete
              <i class="uil uil-shopping-basket mx-2"></i>
            </button>
          </div>
          <Dialog
            visible={deleteElement}
            style={{ width: "32rem" }}
            breakpoints={{ "960px": "75vw", "641px": "90vw" }}
            header="Confirm"
            modal
            footer={
              <React.Fragment>
                <Button
                  label="No"
                  icon="pi pi-times"
                  outlined
                  onClick={() => setDelete(false)}
                />
                <Button
                  label="Yes"
                  icon="pi pi-check"
                  severity="danger"
                  onClick={deleteHandle}
                />
              </React.Fragment>
            }
            onHide={() => setDelete(false)}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {/* {product && ( */}
              <span>Are you sure you want to delete ?</span>
              {/* )} */}
            </div>
          </Dialog>
        </form>
      </div>
    </div>
  );
}

export default UserInfo;
