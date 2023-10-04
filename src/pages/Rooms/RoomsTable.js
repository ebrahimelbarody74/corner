import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ProductService } from "./ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import * as XLSX from "xlsx";
import { Link, useParams } from "react-router-dom";
import { InputSwitch } from "primereact/inputswitch";
import { AiOutlineDelete } from "react-icons/ai";
import jsPDF from "jspdf";
import img from "../../assets/img/Announcement.png";
import "jspdf-autotable";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paginator } from "primereact/paginator";
import Moment from "react-moment";
import { Dropdown } from "primereact/dropdown";

export default function RoomsTable() {
  let emptyProduct = {
    phone: "",
    name: "",
    CONTACTS: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: "INSTOCK",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const { user, error } = useSelector((state) => state.auth);
  const [selectOneBuild, setselectOneBuild] = useState(null);
  const [selectOneLevel, setselectOneLevel] = useState(null);
  const [selectOneDepart, setselectOneDepart] = useState(null);
  // get Select building
  const [building_code, setbuilding_code] = useState();
  const [allCodeLevels, setAllCodeLevels] = useState("");
  const [allCodeDepart, setAllCodeDepart] = useState("");
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

  //////////////////////get//////////////////////
  const [name, setName] = useState("");
  const [code, setcode] = useState("");
  const [image, setimage] = useState("");
  const [data, setData] = useState([]);
  const params = useParams("").name;
  const [editRow, setEditRow] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const ITEMS_PER_PAGE = 10;
  const getData = async (page) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          withCredentials: false,
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(
        `https://${params}.almnew.online/api/room-all?page=${page}`, // Increment the page by 1

        config
      );
      console.log(res);
      if (res.status === 200) {
        setData(res.data.room.data);
        setTotalPages(res.data.room.last_page);
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
    getData(currentPage);
  }, [currentPage]);
  const onPageChange = (event) => {
    setCurrentPage(event.page + 1); // Add 1 because PrimeReact Paginator starts indexing from 0
  };

  const searchData = async () => {
    const data = {
      query: globalFilter,
    };
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
        `https://${params}.almnew.online/api/room-search`,
        data,
        config
      );
      console.log(res);
      if (res.status === 200) {
        setData(res.data.rooms);
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
    searchData();
  }, [globalFilter]);

  /////////////////////////////////////////
  ////////////////////create//////////////////\
  const create = async () => {
    setSubmitted(false);
    setProductDialog(false);
    const data = {
      name,
      code,
      building_code: selectOneBuild?.code,
      level_code: selectOneLevel?.code,
      department_code: selectOneDepart?.code,
      // image,
    };
    const formDataWithImages = new FormData();
    formDataWithImages.append("image", image);
    formDataWithImages.append("name", data.name);
    formDataWithImages.append("code", data.code);
    formDataWithImages.append("building_code", data.building_code);
    formDataWithImages.append("level_code", data.level_code);
    formDataWithImages.append("department_code", data.department_code);
    // if (image) {
    //   data.image = image;
    // }
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
        `https://${params}.almnew.online/api/room-create`,
        formDataWithImages,

        config
      );
      console.log(res);
      if (res.status === 201) {
        getData();
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Created Successful",
          life: 3000,
        });
      } else {
        console.log(res);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
      toast.current.show({
        severity: "error",
        // summary: "Successful",
        detail: "Error",
        life: 3000,
      });

      //  setError(true);
    }
  };

  /////////////////////////////
  ////////////////////editHandle//////////////////\
  const editHandle = async () => {
    setProductDialog(false);
    setSubmitted(true);
    const data = {
      name: name ? name : editRow.name,
      code: code ? code : editRow.code,
      building_code: selectOneBuild?.code
        ? selectOneBuild?.code
        : editRow.build.code,
      level_code: selectOneLevel?.code
        ? selectOneLevel?.code
        : editRow.level.code,

      department_code: selectOneDepart?.code
        ? selectDepart.code
        : editRow.dept.code,
    };
    if (image) {
      data.image = image;
    }
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
        `https://${params}.almnew.online/api/room-update/` + editRow.id,
        data,

        config
      );
      console.log(res);
      if (res.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Edit Successful",
          life: 3000,
        });
        setEditRow("");
        getData();
      } else {
        console.log(res);
        setEditRow("");
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
      setEditRow("");

      //  setError(true);
    }
  };

  /////////////////////////////
  ////////////////////removeHandle//////////////////\
  const deleteHandle = async () => {
    setSubmitted(true);

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
      const res = await axios.delete(
        `https://${params}.almnew.online/api/room-destroy/` + editRow.id,

        config
      );
      console.log(res);
      if (res.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Deleted Successful",
          life: 3000,
        });
        setEditRow("");
        getData();
        setDeleteProductDialog(false);
      } else {
        console.log(res);
        setEditRow("");
        setDeleteProductDialog(false);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
      setEditRow("");
      setDeleteProductDialog(false);

      //  setError(true);
    }
  };

  /////////////////////////////
  //////////////////upload///////////
  const [uploadExcel, setUploadExcel] = useState("");
  const saveProduct = async () => {
    setSubmitted(false);
    setProductDialog(false);
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
          `https://${params}.almnew.online/api/room-import`,
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
          getData();
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
  ////////////////////////////

  ////////////////////////////deleteMulti/////////////

  const deleteMultipleHandle = async () => {
    hideDeleteProductsDialog();
    setSubmitted(true);

    console.log(data);
    const idArray = selectedProducts.map((item) => item.id);
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
        `https://${params}.almnew.online/api/room-deleteMultiple`,
        { id: idArray },
        config
      );
      console.log(res);
      if (res.status === 200) {
        setEditRow("");
        getData();
        setDeleteProductDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Deleted Successful",
          life: 3000,
        });
      } else {
        console.log(res);
        setEditRow("");
        setDeleteProductDialog(false);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);
      setEditRow("");
      setDeleteProductDialog(false);

      //  setError(true);
    }
  };
  //////////////////////////////////////
  ////////////export excel//////////
  const parms = useParams();

  const [loading, setLoading] = useState(false);
  const [exp, setExport] = useState("");
  const exportToExcel = () => {
    if (exp) {
      const blob = new Blob([exp], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "room-export.xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch(`https://${params}.almnew.online/api/room-export`, {
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
        setExport(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [user.token, data]);
  ///////////////////////////////

  const [expPdf, setExportPdf] = useState("");
  const exportToPdf = () => {
    if (expPdf) {
      const blob = new Blob([expPdf], {
        type: "application/pdf", // Set the MIME type for PDF
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "building-export.pdf";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetch(`https://${params}.almnew.online/api/pdf-room-convert`, {
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
        setExportPdf(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [user.token, data]);
  useEffect(() => {
    setProducts([]);
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
    setEditRow("");
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const editProduct = (product) => {
    setProductDialog(true);
    setEditRow(product);
  };

  const confirmDeleteProduct = (product) => {
    setEditRow(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="d-flex align-items-center  flex-wrap fs-5 gap-2">
        <button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
          className="btn btn-danger rounded-xl  fs-14   mb-2"
        >
          Delete All Selected
          <i class="uil uil-shopping-basket mx-2"></i>
        </button>
        <button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={() => setImportExcel(true)}
          className="btn btn-primary cursor-pointer text-white rounded-xl mx-1 fs-14 mb-2"
        >
          Upload
          <i class="uil uil-export  mx-2"></i>
        </button>{" "}
        <button
          label="Export Selected to Excel"
          icon="pi pi-file-excel"
          onClick={exportToExcel}
          className="btn btn-green cursor-pointer text-white  rounded-xl mx-1 mb-2 fs-14"
          // disabled={!selectedProducts || !selectedProducts.length}
        >
          Export Excel
          <i class="uil uil-import mx-2"></i>
        </button>{" "}
        <button
          label="Export Selected to Excel"
          icon="pi pi-file-excel"
          onClick={exportToPdf}
          className="btn btn-green cursor-pointer text-white  rounded-xl mx-1 mb-2 fs-14"
          // disabled={!selectedProducts || !selectedProducts.length}
        >
          Export Pdf
          <i class="uil uil-import mx-2"></i>
        </button>{" "}
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center gap-2">
          <i
            class="uil uil-edit fs-25 text-blue cursor-pointer"
            icon="pi pi-pencil mr-2"
            onClick={() => editProduct(rowData)}
          ></i>
          <AiOutlineDelete
            class="uil uil-backspace fs-25 text-red cursor-pointer"
            onClick={() => confirmDeleteProduct(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const header = (
    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between w-100 col-12">
      <span className="p-input-icon-left col-12 w-50">
        <i className="pi pi-search" />
        <div class="form-floating ">
          <input
            id="textInputExample"
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            class="form-control"
          />
          {/* <label for="textInputExample">Search...</label> */}
        </div>
      </span>
      {user?.user?.status != "0" && (
        <button
          label="New"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
          className="btn btn-green rounded-xl mx-1 fs-14 "
        >
          Add Rooms
          <i class="uil uil-plus mx-2"></i>
        </button>
      )}
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const productDialogFooter2 = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  // const deleteProductDialogFooter = (

  // );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  const exportSelectedToExcel = () => {
    if (selectedProducts && selectedProducts.length > 0) {
      const selectedRows = products.filter((product) =>
        selectedProducts.includes(product.id)
      );

      const exportData = selectedRows.map((product) => ({
        Name: product.name,
        Description: product.description,
        Price: product.price,
        Category: product.category,
        Rating: product.rating,
        InventoryStatus: product.inventoryStatus,
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SelectedProducts");

      XLSX.writeFile(wb, "selected_products.xlsx");
    }
  };
  const nameBodyTemplate = (rowData) => {
    return <Link to={`/smspro-groups_grid/${rowData.id}`}>{rowData.name}</Link>;
  };
  const [checked, setChecked] = useState(false);

  const handleToggleChange = (rowData, value) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowData.id]: value,
    }));
  };

  const statusBodyTemplate2 = (rowData) => {
    return (
      <InputSwitch
        checked={checkedRows[rowData.id] || false}
        onChange={(e) => handleToggleChange(rowData, e.value)}
      />
    );
  };

  const [checkedRows, setCheckedRows] = useState({});
  const handleExcelUpload = (event) => {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming first sheet

      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setProducts((prevProducts) => [...prevProducts, ...jsonData]);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Data Imported",
        life: 3000,
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const [uploadedExcelData, setUploadedExcelData] = useState([]);

  const handleUploadExcel = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setUploadedExcelData(jsonData);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Excel Data Uploaded",
        life: 3000,
      });
    };

    reader.readAsArrayBuffer(file);
  };
  const addExcelToTable = () => {
    setProducts((prevProducts) => [...prevProducts, ...uploadedExcelData]);
    setUploadedExcelData([]);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Excel Data Added to Table",
      life: 3000,
    });
  };

  // Rest of your code...
  // ...

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const marginLeft = 40;
    const marginTop = 30; // Adjusted margin-top for the title and additional information
    const marginBottom = 20;
    const doc = new jsPDF("p", unit, size);

    // Logo image (replace 'logo.png' with the actual path to your logo image)
    const logoImage = img; // Replace with your logo image path

    // Load the logo image
    const imgWidth = 50; // Adjust the width of the logo
    const imgHeight = 50; // Adjust the height of the logo
    doc.addImage(logoImage, "PNG", marginLeft, marginTop, imgWidth, imgHeight);

    // Title and additional information with styles
    doc.setFontSize(15);
    // doc.setFontStyle("bold");
    doc.text(
      "Corner Edge Group",
      marginLeft + imgWidth + 10,
      marginTop + imgHeight / 2
    );

    doc.setFontSize(12);
    // doc.setFontStyle("normal");
    doc.text(
      "HOSPITAL EQUIPMENT PLANNING SYSTEM (HEPS) GEHU Endoscopy & Procedure Unit Expansion: FF&E Master List",
      marginLeft,
      marginTop + imgHeight + 15
    );
    doc.text(
      "with Make and Model and Price",
      marginLeft,
      marginTop + imgHeight + 30
    );
    doc.text(
      "Date Issued : 2023-09-22",
      marginLeft,
      marginTop + imgHeight + 45
    );
    doc.text("Project Name : Set Name", marginLeft, marginTop + imgHeight + 60);
    doc.text("Ratings By : Rooms Name", marginLeft, marginTop + imgHeight + 75);

    const columns = [
      "ID",
      "Name",
      "Price",
      "Category",
      "Rating",
      "Inventory Status",
    ];
    const data = products.map((product) => [
      product.id,
      product.name,
      product.price,
      product.category,
      product.rating,
      product.inventoryStatus ? "In Stock" : "Out of Stock",
    ]);

    const startY = marginTop + imgHeight + 90; // Adjusted startY position
    doc.autoTable({
      head: [columns],
      body: data,
      startY: startY + marginBottom,
    });

    doc.save("products.pdf");
  };
  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.lastImportDate}`}
        alt={product.image}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const [importExcel, setImportExcel] = useState(false);
  return (
    <div className="p-2">
      <Toast ref={toast} />

      <div className="card-body">
        {user?.user?.status != "0" && (
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        )}{" "}
        <input
          id="upload-excel-input"
          type="file"
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          onChange={(e) => {
            console.log(e);
            setUploadExcel(e.target.files[0]);
          }}
        />
        <DataTable
          width={"100%"}
          ref={dt}
          value={data}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          // dataKey="id"
          rows={10}
          header={header}
          selectionMode={"checkbox"}
          totalRecords={20}
        >
          {user?.user?.status != "0" && (
            <Column selectionMode="multiple" exportable={false}></Column>
          )}
          {user?.user?.status != "0" && (
            <Column
              className="fs-16"
              header="Actions"
              body={actionBodyTemplate}
              exportable={false}
              // style={{ minWidth: "8rem" }}
            ></Column>
          )}
          <Column
            header="Image"
            body={(rowData) => {
              return (
                <>
                  {rowData.image ? (
                    <img
                      src={`https://${params}.almnew.online/api/images/build/${rowData.image}`}
                      alt={product.image}
                      className="w-6rem shadow-2 border-round"
                    />
                  ) : (
                    "Not Found"
                  )}
                </>
              );
            }}
            style={{ maxWidth: "6rem" }}
          ></Column>
          <Column
            className="fs-16"
            field="name"
            header="Rooms Name"
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          <Column
            className="fs-16"
            field="code"
            header="Rooms Code"
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          <Column
            className="fs-16"
            field="code"
            header="Building Name"
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div className="d-flex align-items-center gap-2">
                    {rowData.build.name}
                  </div>
                </React.Fragment>
              );
            }}
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          <Column
            className="fs-16"
            header="Levels Name"
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div className="d-flex align-items-center gap-2">
                    {rowData.level.name}
                  </div>
                </React.Fragment>
              );
            }}
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          \
          <Column
            className="fs-16"
            header="Department Name"
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div className="d-flex align-items-center gap-2">
                    {rowData.dept.name}
                  </div>
                </React.Fragment>
              );
            }}
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          <Column
            className="fs-16"
            // field="created_at"
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div className="d-flex align-items-center gap-2">
                    <Moment
                      format="YYYY/MM/DD"
                      date={rowData.created_at}
                      style={{ marginTop: "-10px" }}
                    />{" "}
                  </div>
                </React.Fragment>
              );
            }}
            header="Created At"
            sortable
            // style={{ minWidth: "rem" }}
          ></Column>
          <Column
            className="fs-16 "
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div className="d-flex align-items-center gap-2">
                    <Moment
                      format="YYYY/MM/DD"
                      date={rowData.updated_at}
                      style={{ marginTop: "-10px" }}
                    />{" "}
                  </div>
                </React.Fragment>
              );
            }}
            header="Updated At"
            sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
        </DataTable>
        {/* <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5} // Adjust as needed
          marginPagesDisplayed={2} // Adjust as needed
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
        /> */}
      </div>
      <Paginator
        first={currentPage * 10 - 10} // Adjust the '10' to match the number of items per page
        rows={10} // Set the number of items per page
        totalRecords={totalPages * 10} // Assuming there are 10 items per page, and 'totalPages' is the total number of pages
        onPageChange={onPageChange}
      />

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={editRow ? "Edit Rooms" : "Add Rooms"}
        modal
        className="p-fluid"
        footer={
          <React.Fragment>
            <Button
              label="Cancel"
              icon="pi pi-times"
              outlined
              onClick={hideDialog}
            />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={() => (editRow ? editHandle() : create())}
            />
          </React.Fragment>
        }
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name1" className="font-bold">
            Rooms Name
          </label>
          <div class="form-floating mb-4">
            <input
              id="name"
              type="text"
              placeholder="Text Input"
              onChange={(e) => setName(e.target.value)}
              required
              //   autoFocus
              defaultValue={editRow.name}
              class="form-control"
            />

            {submitted && !name && (
              <small className="p-error">Rooms Name is required.</small>
            )}
            {/* <label for="name">Name</label> */}
          </div>
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Rooms Code
          </label>
          <div class="form-floating mb-4">
            <input
              id="textInputExample"
              type="text"
              class="form-control"
              placeholder="Text Input"
              defaultValue={editRow.code}
              onChange={(e) => setcode(e.target.value)}
              required
            />
            {!editRow && (
              <>
                {submitted && !code && (
                  <small className="p-error">Rooms Code is required.</small>
                )}
              </>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Room Image
          </label>
          <div class="form-floating mb-4">
            <input
              id="textInputExample2"
              type="file"
              class="form-control"
              placeholder="Text Input"
              required
              onChange={(e) => setimage(e.target.files[0])}
            />
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
              placeholder={editRow ? editRow.build.name : "Select a City"}
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
              placeholder={editRow ? editRow.level.name : "Select a City"}
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
              placeholder={editRow ? editRow.dept.name : "Select a City"}
              className="w-100 md:w-14rem"
            />{" "}
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={importExcel}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Upload Excel"
        modal
        className="p-fluid"
        footer={productDialogFooter2}
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

      <Dialog
        visible={deleteProductDialog}
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
              onClick={hideDeleteProductDialog}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              severity="danger"
              onClick={deleteHandle}
            />
          </React.Fragment>
        }
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{editRow.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
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
              onClick={hideDeleteProductsDialog}
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              severity="danger"
              onClick={deleteMultipleHandle}
            />
          </React.Fragment>
        }
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
