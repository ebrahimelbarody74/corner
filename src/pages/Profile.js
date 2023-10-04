import axios from "axios";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Profile() {
  const { user, error } = useSelector((state) => state.auth);
  const params = useParams().name;

  const [image, setImage] = useState("");
  const [current_password, setcurrent_password] = useState("");
  const [password, setpassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const toast = useRef(null);
  const createImage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post(
        `https://${params}.almnew.online/api/profile/image/${user.user.id}`,
        { image },
        config
      );
      //   setLoading(false);
      if (res.status === 200) {
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
  const updatePassword = async () => {
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
        `https://${params}.almnew.online/api/profile/password`,
        { current_password, password, password_confirmation },
        config
      );
      //   setLoading(false);
      if (res.status === 200) {
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
  const updateInfo = async () => {
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
        `https://${params}.almnew.online/api/profile/update/${user.user.id}`,
        { name, email },
        config
      );
      //   setLoading(false);
      if (res.status === 200) {
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
        detail: "Error Network",
        life: 3000,
      });
      // return custom error message from backend if present
      console.log(error);
      //   setLoading(false);
    }
  };
  return (
    <div className="container-fluid pt-4 px-4 mt-10">
      <Toast ref={toast} />
      <div className=" g-4 m-auto">
        <div className="col-sm-12 col-xl-12 ">
          <div className=" rounded h-100 p-4">
            <form
              className="mt-6 space-y-6 container-fluid  text-center bg-light rounded-3 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                createImage();
              }}
            >
              <h6 className="mb-4">Update User Image</h6>
              <input type="hidden" name="_method" defaultValue="patch" />{" "}
              <div className="mb-3">
                <img
                  className="rounded-circle me-lg-2 m-auto "
                  src="https://hhhh.san-1.shop/images/User-image/logo192.png"
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <div className="mb-3 w-50 m-auto text-center">
                <input
                  name="image"
                  type="file"
                  required
                  autoComplete="username"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary text-center"
                fdprocessedid="0o123u"
              >
                Update Now
              </button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-xl-6">
            <div className=" h-100 p-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateInfo();
                }}
                className="h-100 rounded-3 bg-light p-6"
              >
                <h6 className="mb-4">Update User Informetion</h6>
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="xtTUJvPocEdfzYF8rvXQa8z1Ti9mZY4zd6SjPqrG"
                />{" "}
                <input type="hidden" name="_method" defaultValue="patch" />{" "}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <input
                    className="form-control "
                    id="exampleInputEmail1"
                    name="name"
                    type="text"
                    defaultValue="Eng Mohamed Abdelrahman"
                    required
                    autofocus
                    autoComplete="name"
                    fdprocessedid="8uikxs"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue="mohamedmansor0155@gmail.com"
                    required
                    autoComplete="username"
                    className="form-control "
                    id="exampleInputPassword1"
                    fdprocessedid="utb9w"
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  fdprocessedid="6gw8hl"
                >
                  Update Now
                </button>
              </form>
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className=" h-100 p-2">
              <form
                className="mb-30 bg-light rounded-3 p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePassword();
                }}
              >
                <h6 className="mb-4">Basic Form</h6>
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="xtTUJvPocEdfzYF8rvXQa8z1Ti9mZY4zd6SjPqrG"
                />
                <input type="hidden" name="_method" defaultValue="put" />{" "}
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Current Password
                  </label>
                  <input
                    className="form-control"
                    id="exampleInputPassword1"
                    name="current_password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setcurrent_password(e.target.value)}
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
                    id="exampleInputPassword1"
                    fdprocessedid="hsfv5q"
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
                    id="exampleInputPassword1"
                    fdprocessedid="1sryb"
                    onChange={(e) => setpassword_confirmation(e.target.value)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
