import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Routes,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";

import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import NFTMarketplace from "views/admin/marketplace";

import { BrowserRouter } from "react-router-dom";
import Profile from "pages/Profile";
import SignIn from "pages/SignIn";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "rtk/store";
import SignUp from "pages/SignUp";
import Home from "pages/Home";
import Projects from "pages/Projects/Projects";
import axios from "axios";
import { dominStatus } from "rtk/slices/authSlice";
import About from "Component/About";
import Header from "Component/Header/Header";
import Footer from "Component/Footer/Footer";
import Services from "Component/Services";
import Contact from "Component/Contact";
import Service from "Component/Services/Service_1/Service";
function App() {
  const { user, error, msg } = useSelector((state) => state.auth);
  const params = useParams("").name;
  console.log(params, "par");
  // const { user, error, msg, domin } = useSelector((state) => state.auth);
  const [domin, setDomin] = useState("");
  const dispatch = useDispatch("");
  const path = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    if (path) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            withCredentials: false,
          },
        };
        const res = await axios.get(
          `https://${path}.almnew.online/api/tenant`,

          config
        );
        setLoading(false);
        if (res.status === 200) {
          setDomin(true);
        } else {
          setDomin(false);
        }
      } catch (error) {
        // setLoading(false);
        setDomin(false);
        setLoading(false);

        console.log(error);

        //  setError(true);
      }
    }
  };
  useEffect(() => {
    console.log(path);
    getData();
  }, [path, domin, navigate]);
  console.log(domin);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home setDomin={setDomin} />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About setDomin={setDomin} />
              <Footer />
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <Header />
              <Services setDomin={setDomin} /> <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Header />
              <Contact setDomin={setDomin} /> <Footer />
            </>
          }
        />
        <Route path="/services/1" element={<Service setDomin={setDomin} />} />
        {/* <Route path="/:home" element={<Home setDomin={setDomin} />} /> */}
        {domin && (
          <>
            <Route path="/:name" element={<Projects setDomin={setDomin} />} />
            <Route
              path="/:name/login"
              element={user ? <Navigate to={`/${path}/default`} /> : <SignIn />}
            />
            <Route path="/:name/register" element={<SignUp />} />
            <Route
              path="/:name/users"
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />

            <Route
              path={`/:name/default`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/items`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/items/:id`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/edit-items/:id`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/add-items`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/user-info/:id`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/department`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/add-department`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/department/:id`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/new-map`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/rooms`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/add-rooms`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/rooms/:id`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/levels`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/add-level`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/levels/:id`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/ali`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/buildings-list`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
            <Route
              path={`/:name/profile`}
              element={
                user ? <AdminLayout /> : <Navigate to={`/${path}/login`} />
              }
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
