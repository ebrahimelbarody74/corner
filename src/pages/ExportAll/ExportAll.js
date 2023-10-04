import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ExportAll() {
  const { user, error, msg } = useSelector((state) => state.auth);
  const toast = useRef(null);
  const [loading, setLoading] = React.useState(false);
  const params = useParams("").name;
  const [exp, setExport] = useState("");

  const exportToExcel = async () => {
    await fetch(`https://${params}.almnew.online/api/all-export`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((data) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "All.xlsx";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  //  useEffect(() => {
  //    setLoading(true);

  //  }, [user.token]);
  const [importExcel, setImportExcel] = useState(false);
  const [uploadExcel, setUploadExcel] = useState("");
  const saveProduct = async () => {
    // setProductDialog(false);
    console.log(uploadExcel);

    if (uploadExcel) {
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
          `https://${params}.almnew.online/api/all-import`,
          { file: uploadExcel },

          config
        );
        console.log(res);
        if (res.status === 201) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Excel Data Added to Table",
            life: 3000,
          });
          // getData();
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
  return (
    <div className="d-flex align-items-center ">
      <Toast ref={toast} />
      <button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={() => exportToExcel()}
        className="btn btn-green rounded-xl mx-1 fs-14 mb-2"
      >
        Export All
        <i class="uil uil-plus mx-2"></i>
      </button>{" "}
      <button
        label="New"
        icon="pi pi-plus"
        severity="success"
        // onClick={openNew}
        onClick={() => setImportExcel(true)}
        className="btn btn-primary rounded-xl mx-1 fs-14 mb-2"
      >
        Import All
        <i class="uil uil-plus mx-2"></i>
      </button>{" "}
      <Dialog
        visible={importExcel}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Upload Excel"
        modal
        className="p-fluid"
        footer={
          <React.Fragment>
            <Button
              label="Cancel"
              icon="pi pi-times"
              outlined
              onClick={() => setImportExcel(false)}
            />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
          </React.Fragment>
        }
        onHide={() => setImportExcel(false)}
      >
        <>
          {!uploadExcel && (
            <div className="d-flex align-items-center justify-content-between ">
              <div class="form-select-wrapper col-3 d-md-block d-none">
                <label className="text-orange ">Upload Excel </label>
              </div>
              <div>
                <button
                  label="Upload Excel"
                  icon="pi pi-upload"
                  className="btn btn-primary rounded-xl mx-1 fs-14"
                  onClick={() =>
                    document.getElementById("upload-excel-input").click()
                  }
                >
                  Upload
                  <i class="uil uil-export  mx-2"></i>
                </button>
              </div>

              <input
                id="upload-excel-input"
                type="file"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={(e) => {
                  setUploadExcel(e.target.files[0]);
                }}
                //   onChange={handleUploadExcel}
              />
            </div>
          )}
          {uploadExcel && (
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <svg
                  className="fs-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <rect
                    width="16"
                    height="9"
                    x="28"
                    y="15"
                    fill="#21a366"
                  ></rect>
                  <path
                    fill="#185c37"
                    d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"
                  ></path>
                  <rect
                    width="16"
                    height="9"
                    x="28"
                    y="24"
                    fill="#107c42"
                  ></rect>
                  <rect
                    width="16"
                    height="9"
                    x="12"
                    y="15"
                    fill="#3fa071"
                  ></rect>
                  <path
                    fill="#33c481"
                    d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z"
                  ></path>
                  <path
                    fill="#21a366"
                    d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z"
                  ></path>
                  <path
                    d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z"
                    opacity=".05"
                  ></path>
                  <path
                    d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z"
                    opacity=".07"
                  ></path>
                  <path
                    d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,2.56V32.44C24.667,33.854,23.52,35,22.106,35z"
                    opacity=".09"
                  ></path>
                  <linearGradient
                    id="flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1"
                    x1="4.725"
                    x2="23.055"
                    y1="14.725"
                    y2="33.055"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#18884f"></stop>
                    <stop offset="1" stop-color="#0b6731"></stop>
                  </linearGradient>
                  <path
                    fill="url(#flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1)"
                    d="M22,34H6c-1.105,0-2-0.895-2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"
                  ></path>
                </svg>
                <div>{uploadExcel.name}</div>
              </div>
              <button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                onClick={() => setUploadExcel("")}
                className="btn btn-danger rounded-xl  fs-20   mb-2"
              >
                <i class="uil uil-shopping-basket "></i>
              </button>
            </div>
          )}
        </>
      </Dialog>
    </div>
  );
}

export default ExportAll;
