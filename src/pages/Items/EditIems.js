import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function EditIems() {
  const [infoEdit, setInfoEdit] = useState();
  const { user, error, msg } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const params = useParams("").name;
  const paramsId = useParams("").id;
  

  const getById = async () => {
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
        `https://${params}.almnew.online/api/item/${paramsId}`, // Increment the page by 1

        config
      );
      if (res.status === 200) {
        console.log("edit", res.data);
        setName(res.data.name);
        setcode(res.data.code);
        setgroup_category(res.data.group_category);
        setquantity(res.data.quantity);
        settransfer(res.data.transfer);
        setunit_cost(res.data.unit_cost);
        settotal_cost(res.data.total_cost);
        setrequirement_qty(res.data.requirement_qty);
        setdata(res.data.data);
        setBim_id(res.data.Bim_id);
        setmounting(res.data.mounting);
        setweight(res.data.weight);
        setindicatir(res.data.indicatir);
        setcontact_name(res.data.contact_name);
        setcontact_number(res.data.contact_number);
        setcomments(res.data.comments);
        setimage(res.data.image);
        setdetailed_spec_document(res.data.detailed_spec_document);
        setrevit_model(res.data.revit_model);
        setcode_model(res.data.code_model);
        seto2(res.data.o2);
        setdimension(res.data.dimension);
        setair(res.data.air);
        settool_air(res.data.tool_air);
        setgeneral_specs(res.data.general_specs);
        setelectrical(res.data.electrical);
        setvaccum(res.data.vaccum);
        setagss(res.data.agss);
        setwater(res.data.water);
        setdrain(res.data.drain);
        setsteam(res.data.name);
        setselectOneBuild(res.data.build.code);
        setselectOneLevel(res.data.level.code);
        setselectOneDepart(res.data.dept.code);
        setselectOneRoom(res.data.room.code);
        console.log(res.data.group_id);
        setselectOneGroup(res.data.group_id);
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
    getById();
  }, []);
  const [name, setName] = useState(infoEdit && infoEdit.name);
  const [code, setcode] = useState(infoEdit?.code);

  const [image, setimage] = useState(infoEdit?.image);
  const [group_category, setgroup_category] = useState(
    infoEdit?.group_category
  );
  const [quantity, setquantity] = useState(infoEdit?.quantity);
  const [transfer, settransfer] = useState(infoEdit?.transfer);
  const [requirement_qty, setrequirement_qty] = useState(
    infoEdit?.requirement_qty
  );
  const [unit_cost, setunit_cost] = useState(infoEdit?.unit_cost);
  const [total_cost, settotal_cost] = useState(infoEdit?.total_cost);
  const [comments, setcomments] = useState(infoEdit?.comments);
  const [general_specs, setgeneral_specs] = useState(infoEdit?.general_specs);
  const [detailed_spec_document, setdetailed_spec_document] = useState(
    infoEdit?.detailed_spec_document
  );
  const [revit_model, setrevit_model] = useState(infoEdit?.revit_model);
  const [code_model, setcode_model] = useState(infoEdit?.code_model);
  const [Bim_id, setBim_id] = useState(infoEdit?.Bim_id);
  const [electrical, setelectrical] = useState(infoEdit?.electrical);
  const [data, setdata] = useState(infoEdit?.data);
  const [o2, seto2] = useState(infoEdit?.o2);
  const [air, setair] = useState(infoEdit?.air);
  const [tool_air, settool_air] = useState(infoEdit?.tool_air);
  const [vaccum, setvaccum] = useState(infoEdit?.vaccum);
  const [agss, setagss] = useState(infoEdit?.agss);
  const [water, setwater] = useState(infoEdit?.water);
  const [drain, setdrain] = useState(infoEdit?.drain);
  const [steam, setsteam] = useState(infoEdit?.steam);
  const [mounting, setmounting] = useState(infoEdit?.mounting);
  const [weight, setweight] = useState(infoEdit?.weight);
  const [dimension, setdimension] = useState(infoEdit?.dimension);
  const [indicatir, setindicatir] = useState(infoEdit?.indicatir);
  const [contact_name, setcontact_name] = useState(infoEdit?.contact_name);
  const [contact_number, setcontact_number] = useState(
    infoEdit?.contact_number
  );

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
        console.log("level", res);
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
    console.log( selectOneGroup);
    setLoading(true);

    // e.preventDefualt();
    let allData = {
      name,
      code,

      building_code: selectOneBuild,

      level_code: selectOneLevel,

      department_code: selectOneDepart,

      room_code: selectOneRoom,

      group_category,

      group_id: selectOneGroup,

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
        `https://${params}.almnew.online/api/item-update/${paramsId}`,
        allData,
        config
      );
      console.log(res);
      if (res.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: res.data.message,
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
              value={name}
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
              defaultValue={code}
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
              defaultValue={group_category}
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
              defaultValue={quantity}
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
              defaultValue={transfer}
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
              defaultValue={unit_cost}
              onChange={(e) => setunit_cost(e.target.value)}
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
              defaultValue={total_cost}
              onChange={(e) => settotal_cost(e.target.value)}
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
              defaultValue={requirement_qty}
              onChange={(e) => setrequirement_qty(e.target.value)}
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
              defaultValue={data}
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
              defaultValue={general_specs}
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
              defaultValue={Bim_id}
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
              defaultValue={mounting}
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
              defaultValue={weight}
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
              defaultValue={indicatir}
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
              defaultValue={contact_name}
              onChange={(e) => setcontact_name(e.target.value)}
            />
          </div>{" "}
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Contact Number
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
              defaultValue={contact_number}
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
              defaultValue={comments}
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
              defaultValue={image}
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
              defaultValue={detailed_spec_document}
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
              defaultValue={revit_model}
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
              defaultValue={code_model}
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
                placeholder={selectOneGroup}
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
                placeholder={selectOneBuild}
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
                placeholder={selectOneLevel}
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
                placeholder={selectOneDepart}
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
                placeholder={selectOneRoom}
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
              defaultValue={quantity}
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
              defaultValue={o2}
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
              defaultValue={dimension}
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
              defaultValue={air}
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
              defaultValue={tool_air}
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
              defaultValue={electrical}
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
              defaultValue={vaccum}
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
              defaultValue={agss}
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
              defaultValue={water}
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
              defaultValue={drain}
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
              defaultValue={steam}
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

export default EditIems;
