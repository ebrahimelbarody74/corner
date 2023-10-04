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
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import jsPDF from "jspdf";
import img from "../../assets/img/Announcement.png";
import "jspdf-autotable";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";
const ProductService = [
  {
    id: "1000",
    // code: "f230fh0g3",
    name: "Bamboo Watch",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
];

export default function OneDepartmentTable() {
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

  useEffect(() => {
    setProducts(ProductService);
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };

      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
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

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
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

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
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

  const header = (
    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between w-100 col-12">
      <span className="p-input-icon-left col-12 w-50">
        <i className="pi pi-search" />
        <div class="form-floating ">Department List</div>
      </span>
      {/* <Link to={"/add-level"}
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
        className="btn btn-green rounded-xl mx-1 fs-14 "
      >
        Add Levels
        <i class="uil uil-plus mx-2"></i>
      </Link>{" "} */}
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
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
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
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
  // const saveProduct = () => {
  //   setSubmitted(true);

  //   if (product.name.trim()) {
  //     let _products = [...products];
  //     let _product = { ...product };

  //     if (product.id) {
  //       const index = findIndexById(product.id);

  //       _products[index] = _product;
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Successful",
  //         detail: "Product Updated",
  //         life: 3000,
  //       });
  //     } else {
  //       _product.id = createId();
  //       _product.image = "product-placeholder.svg";
  //       _products.push(_product);
  //       toast.current.show({
  //         severity: "success",
  //         summary: "Successful",
  //         detail: "Product Created",
  //         life: 3000,
  //       });
  //     }

  //     setProducts(_products);
  //     setProductDialog(false);
  //     setProduct(emptyProduct); // Reset the product state
  //   }
  // };

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
    doc.text(
      "Ratings By : Building Name",
      marginLeft,
      marginTop + imgHeight + 75
    );

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
  const { user, error } = useSelector((state) => state.auth);
  const params = useParams("").name;
  const paramsId = useParams("").id;

  const [importExcel, setImportExcel] = useState(false);
  const [data, setData] = useState([]);
  const getData = async (page) => {
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
        `https://${params}.almnew.online/api/dept/${paramsId}`, // Increment the page by 1

        config
      );
      console.log(res);

      if (res.status === 200) {
        setData([res.data]);
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
    getData();
  }, []);
  return (
    <div className="p-2">
      <div className="card-body">
        <DataTable width={"100%"} ref={dt} value={data} header={header}>
          <Column
            className="fs-16"
            field="name"
            header="Department Name"
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          <Column
            className="fs-16"
            field="code"
            header="Department Code"
            // body={statusBodyTemplate2}
            // sortable
            // style={{ minWidth: "4rem" }}
          ></Column>
          <Column
            className="fs-16"
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
            field="code"
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
      </div>
    </div>
  );
}
