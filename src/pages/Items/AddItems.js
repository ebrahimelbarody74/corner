import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AddItems() {
  const { user, error, msg } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const params = useParams("").name;
  const [name, setName] = useState("");
  const [code, setcode] = useState("");
  const [build_id, setbuild_id] = useState("");
  const [level_id, setlevel_id] = useState("");
  const [dept_id, setdept_id] = useState("");
  const [room_id, setroom_id] = useState("");
  const [image, setimage] = useState("");
  const [group_category, setgroup_category] = useState("");
  const [group_id, setgroup_id] = useState("");
  const [quantity, setquantity] = useState("");
  const [transfer, settransfer] = useState("");
  const [requirement_qty, setrequirement_qty] = useState("");
  const [unit_cost, setunit_cost] = useState("");
  const [total_cost, settotal_cost] = useState("");
  const [comments, setcomments] = useState("");
  const [general_specs, setgeneral_specs] = useState("");
  const [detailed_spec_document, setdetailed_spec_document] = useState("");
  const [revit_model, setrevit_model] = useState("");
  const [code_model, setcode_model] = useState("");
  const [Bim_id, setBim_id] = useState("");
  const [electrical, setelectrical] = useState("");
  const [data, setdata] = useState("");
  const [o2, seto2] = useState("");
  const [air, setair] = useState("");
  const [tool_air, settool_air] = useState("");
  const [vaccum, setvaccum] = useState("");
  const [agss, setagss] = useState("");
  const [water, setwater] = useState("");
  const [drain, setdrain] = useState("");
  const [steam, setsteam] = useState("");
  const [mounting, setmounting] = useState("");
  const [weight, setweight] = useState("");
  const [dimension, setdimension] = useState("");
  const [indicatir, setindicatir] = useState("");
  const [contact_name, setcontact_name] = useState("");
  const [contact_number, setcontact_number] = useState("");

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const toast = useRef(null);

  const [selectOneBuild, setselectOneBuild] = useState(null);
  const [selectOneLevel, setselectOneLevel] = useState(null);
  const [selectOneDepart, setselectOneDepart] = useState(null);
  const [selectOneRoom, setselectOneRoom] = useState(null);
  const [selectOneGroup, setselectOneGroup] = useState(null);
  // get Select building
  const [building_code, setbuilding_code] = useState();
  const [allCodeLevels, setAllCodeLevels] = useState("");
  const [allCodeDepart, setAllCodeDepart] = useState("");
  const [allCodeRoom, setAllCodeRoom] = useState("");
  const [allGroup, setAllGroup] = useState("");
  const selectOneBuilding = async (page) => {
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
        `https://${params}.almnew.online/api/building-all?page=${page}`, // Increment the page by 1

        config
      );
      console.log("select", res);
      if (res.status === 200) {
        setbuilding_code(res.data.buildings);
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
    selectOneBuilding();
  }, []);

  const [level_code, setlevel_code] = useState();
  const selectLevel = async (page) => {
    if (selectOneBuild) {
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
          `https://${params}.almnew.online/api/get-level-ajax/${selectOneBuild.id}`, // Increment the page by 1

          config
        );
        console.log(selectOneBuild.id);
        console.log("levelsssssssss", res);
        if (res.status === 200) {
          setAllCodeLevels(res.data.states);
        } else {
          console.log(res);
        }
      } catch (error) {
        // setLoading(false);
        console.log(error);

        //  setError(true);
      }
    }
  };
  useEffect(() => {
    selectLevel();
  }, [selectOneBuild]);
  const selectDepart = async (page) => {
    if (selectOneBuild) {
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
          `https://${params}.almnew.online/api/get-dept-ajax/${selectOneLevel.id}`, // Increment the page by 1

          config
        );
        console.log(selectOneBuild.id);
        console.log("de", res);
        if (res.status === 200) {
          setAllCodeDepart(res.data.depts);
        } else {
          console.log(res);
        }
      } catch (error) {
        // setLoading(false);
        console.log(error);

        //  setError(true);
      }
    }
  };
  useEffect(() => {
    selectDepart();
  }, [selectOneLevel]);
  const selectRoom = async (page) => {
    // console.log("idDepart", selectOneDepart.id, selectOneDepart.code);
    if (selectOneBuild) {
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
          `https://${params}.almnew.online/api/get-room-ajax/${selectOneDepart.id}`, // Increment the page by 1

          config
        );
        console.log("room", res);
        if (res.status === 200) {
          setAllCodeRoom(res.data.rooms);
        } else {
          console.log(res);
        }
      } catch (error) {
        // setLoading(false);
        console.log(error);

        //  setError(true);
      }
    }
  };
  useEffect(() => {
    selectRoom();
  }, [selectOneDepart]);

  const selectGroups = async (page) => {
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
        `https://${params}.almnew.online/api/item-group-get`, // Increment the page by 1

        config
      );
      console.log(res);
      if (res.status === 200) {
        setAllGroup(res.data.data);
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
    selectGroups();
  }, []);

  const handleSubmit = async () => {
    console.log("sadasdsadsadsaddsaasddsa",selectOneGroup);
    setLoading(true);

    // e.preventDefualt();
    let allData = {
      name,
      code,

      building_code: selectOneBuild?.code,

      level_code: selectOneLevel?.code,

      department_code: selectOneDepart?.code,

      room_code: selectOneRoom?.code,

      group_category,

      group_id: selectOneGroup.name,

      quantity,

      transfer,

      requirement_qty,

      unit_cost,

      total_cost,

      comments,

      general_specs,

      detailed_spec_document,

      revit_model,

      code_model,

      Bim_id,

      electrical,

      data,

      o2,

      air,

      tool_air,

      vaccum,

      agss,

      water,

      drain,

      steam,

      mounting,

      weight,

      dimension,

      indicatir,

      contact_name,

      contact_number,
      
    };
    if (image) {
      allData.image = image;
    }
    console.log(allData);
    setLoading(true);
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
        `https://${params}.almnew.online/api/item-create`,
        allData,
        config
      );
      console.log(res)
       if (res.status === 201) {
         toast.current.show({
           severity: "success",
           summary: "Successful",
           detail: "Created Successful",
           life: 3000,
         });
       }
      setLoading(false);
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
         toast.current.show({
           severity: "error",
           summary: "Error",
           detail: "Error in Network",
           life: 3000,
         });
       
      setLoading(false);
    }

    // dispatch(registerUser(user));
    // await dispatch(loginUser({ user, setLoading, params }));
  };
  const [group, setGroup] = useState("");
  const handleCreateGroup = async () => {
    const data = {
      group: group,
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
        `https://${params}.almnew.online/api/item-group-create`,
        data,
        config
      );
      console.log(res);
      if (res.status === 201) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Created Successful",
          life: 3000,
        });
      }
      setLoading(false);
      return res.data;
    } catch (error) {
      // return custom error message from backend if present
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="card col-sm-12 mt-17">
      <Toast ref={toast} />

      <div className="p-2 ">
        <div className="d-flex align-items-center mb-5 gap-5">
          <div
            class="my-0 d-flex align-items-center  w-100"
            fdprocessedid="dkc10e"
          >
            <label htmlFor="exampleInputPassword1" className="form-bold w-20">
              Create Group
            </label>
            <input
              name="text"
              type="text"
              autoComplete="new-text"
              className="form-control w-100"
              //   id="exampleInputtext1"
              fdprocessedid="hsfv5q"
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn my-0 btn-primary"
            fdprocessedid="ghacal"
            onClick={() => handleCreateGroup()}
          >
            Create
          </button>
        </div>
        <form
          className="mb-30 bg-light rounded-3 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h6 className="mb-4 text-center fs-30 fw-bold ">Add New Item</h6>
          <input
            type="hidden"
            name="_token"
            defaultValue="xtTUJvPocEdfzYF8rvXQa8z1Ti9mZY4zd6SjPqrG"
          />
          <input type="hidden" name="_method" defaultValue="put" />{" "}
          <div class="mb-3" fdprocessedid="dkc10e">
            <label htmlFor="exampleInputPassword1" className="form-bold">
              Item Name
            </label>
            <input
              name="text"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="hsfv5q"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Item Code
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setcode(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Group Category
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setgroup_category(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Item Quantity
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setquantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Item Transfer
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => settransfer(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Unit Cost
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setunit_cost(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Requirement cost
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setrequirement_qty(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Total Cost
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => settotal_cost(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Data
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setdata(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              General Specs
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setgeneral_specs(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Bim Id
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setBim_id(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Mounting
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setmounting(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Weight
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setweight(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Indicatir
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setindicatir(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Contact Name
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setcontact_name(e.target.value)}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Contact Number
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setcontact_number(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Comments
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setcomments(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Item Image
            </label>
            <input
              name="text_confirmation"
              type="file"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              accept=".png,.jpg"
              onChange={(e) => setimage(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Detailed Specs Document
            </label>
            <input
              name="text_confirmation"
              type="file"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setdetailed_spec_document(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Revit Model
            </label>
            <input
              name="text_confirmation"
              type="file"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setrevit_model(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Code Model
            </label>
            <input
              name="text_confirmation"
              type="file"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setcode_model(e.target.files[0])}
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Group
            </label>

            <div class="form-floating mb-4">
              <Dropdown
                value={selectOneGroup}
                onChange={(e) => setselectOneGroup(e.value)}
                options={allGroup}
                optionLabel="name"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Building Name
            </label>

            <div class="form-floating mb-4">
              <Dropdown
                value={selectOneBuild}
                onChange={(e) => setselectOneBuild(e.value)}
                options={building_code}
                optionLabel="code"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Level Name
            </label>
            <div class="form-floating mb-4">
              <Dropdown
                value={selectOneLevel}
                onChange={(e) => setselectOneLevel(e.value)}
                options={allCodeLevels}
                optionLabel="code"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Department Name
            </label>
            <div class="form-floating mb-4">
              <Dropdown
                value={selectOneDepart}
                onChange={(e) => setselectOneDepart(e.value)}
                options={allCodeDepart}
                optionLabel="code"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Room Name
            </label>
            <div class="form-floating mb-4">
              <Dropdown
                value={selectOneRoom}
                onChange={(e) => setselectOneRoom(e.value)}
                options={allCodeRoom}
                optionLabel="code"
                placeholder="Select a City"
                className="w-100 md:w-14rem"
              />{" "}
            </div>
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Item Quantity
            </label>
            <input
              name="text_confirmation"
              type="number"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setquantity(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              O2
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => seto2(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label className="form-bold w-20 " style={{ width: "fitContant" }}>
              Dimension
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setdimension(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Air
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setair(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Tool Air
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => settool_air(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Electrical
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setelectrical(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Vaccum
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setvaccum(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Agss
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setagss(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Water
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setwater(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Drain
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setdrain(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex  align-items-center ">
            <label
              htmlFor="exampleInputtext1"
              className="form-bold w-20 "
              style={{ width: "fitContant" }}
            >
              Steam
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              onChange={(e) => setsteam(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            fdprocessedid="ghacal"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItems;
