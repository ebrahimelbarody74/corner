import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

function AddLevel() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  return (
    <div className="card col-sm-12 mt-17">
      <div className="p-2">
        <form className="mb-30 bg-light rounded-3 p-6">
          <h6 className="mb-4 text-center fs-30 fw-bold  ">Add New Level</h6>
          <input
            type="hidden"
            name="_token"
            defaultValue="xtTUJvPocEdfzYF8rvXQa8z1Ti9mZY4zd6SjPqrG"
          />
          <input type="hidden" name="_method" defaultValue="put" />{" "}
          <div class="mb-3" fdprocessedid="dkc10e">
            <label htmlFor="exampleInputPassword1" className="form-bold">
              Level Name
            </label>
            <input
              name="text"
              type="text"
              autoComplete="new-text"
              className="form-control "
              //   id="exampleInputtext1"
              fdprocessedid="hsfv5q"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputtext1" className="form-bold">
              Level Code
            </label>
            <input
              name="text_confirmation"
              type="text"
              autoComplete="new-text"
              className="form-control"
              //   id="exampleInputtext1"
              fdprocessedid="1sryb"
            />
          </div>
          <div className="field">
            <label htmlFor="description" className="font-bold">
              Building Name
            </label>

            <div class="form-floating mb-4">
              <Dropdown
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLevel;
