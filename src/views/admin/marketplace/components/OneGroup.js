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
import img from "../../../../assets/img/Announcement.png"
import "jspdf-autotable";
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
  {
    id: "1001",
    code: "nvklal433",
    name: "Black Watch",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "black-watch.jpg",
    price: 72,
    category: "Accessories",
    quantity: 61,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1002",
    code: "zz21cz3c1",
    name: "Blue Band",
    CONTACTS: "Product CONTACTS",
    price: 79,
    category: "Fitness",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1003",
    code: "244wgerg2",
    name: "Blue T-Shirt",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "blue-t-shirt.jpg",
    price: 29,
    category: "Clothing",
    quantity: 25,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1004",
    code: "h456wer53",
    name: "Bracelet",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "bracelet.jpg",
    price: 15,
    category: "Accessories",
    quantity: 73,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1005",
    code: "av2231fwg",
    name: "Brown Purse",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "brown-purse.jpg",
    price: 120,
    category: "Accessories",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4,
  },
  {
    id: "1006",
    code: "bib36pfvm",
    name: "Chakra Bracelet",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "chakra-bracelet.jpg",
    price: 32,
    category: "Accessories",
    quantity: 5,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1007",
    code: "mbvjkgip5",
    name: "Galaxy Earrings",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "galaxy-earrings.jpg",
    price: 34,
    category: "Accessories",
    quantity: 23,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1008",
    code: "vbb124btr",
    name: "Game Controller",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "game-controller.jpg",
    price: 99,
    category: "Electronics",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 4,
  },
  {
    id: "1009",
    code: "cm230f032",
    name: "Gaming Set",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "gaming-set.jpg",
    price: 299,
    category: "Electronics",
    quantity: 63,
    inventoryStatus: "INSTOCK",
    rating: 3,
  },
  {
    id: "1010",
    code: "plb34234v",
    name: "Gold Phone Case",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "gold-phone-case.jpg",
    price: 24,
    category: "Accessories",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4,
  },
  {
    id: "1011",
    code: "4920nnc2d",
    name: "Green Earbuds",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "green-earbuds.jpg",
    price: 89,
    category: "Electronics",
    quantity: 23,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1012",
    code: "250vm23cc",
    name: "Green T-Shirt",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "green-t-shirt.jpg",
    price: 49,
    category: "Clothing",
    quantity: 74,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1013",
    code: "fldsmn31b",
    name: "Grey T-Shirt",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "grey-t-shirt.jpg",
    price: 48,
    category: "Clothing",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 3,
  },
  {
    id: "1014",
    code: "waas1x2as",
    name: "Headphones",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "headphones.jpg",
    price: 175,
    category: "Electronics",
    quantity: 8,
    inventoryStatus: "LOWSTOCK",
    rating: 5,
  },
  {
    id: "1015",
    code: "vb34btbg5",
    name: "Light Green T-Shirt",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "light-green-t-shirt.jpg",
    price: 49,
    category: "Clothing",
    quantity: 34,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1016",
    code: "k8l6j58jl",
    name: "Lime Band",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "lime-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 12,
    inventoryStatus: "INSTOCK",
    rating: 3,
  },
  {
    id: "1017",
    code: "v435nn85n",
    name: "Mini Speakers",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "mini-speakers.jpg",
    price: 85,
    category: "Clothing",
    quantity: 42,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1018",
    code: "09zx9c0zc",
    name: "Painted Phone Case",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "painted-phone-case.jpg",
    price: 56,
    category: "Accessories",
    quantity: 41,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1019",
    code: "mnb5mb2m5",
    name: "Pink Band",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "pink-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 63,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1020",
    code: "r23fwf2w3",
    name: "Pink Purse",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "pink-purse.jpg",
    price: 110,
    category: "Accessories",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4,
  },
  {
    id: "1021",
    code: "pxpzczo23",
    name: "Purple Band",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "purple-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 6,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1022",
    code: "2c42cb5cb",
    name: "Purple Gemstone Necklace",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "purple-gemstone-necklace.jpg",
    price: 45,
    category: "Accessories",
    quantity: 62,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1023",
    code: "5k43kkk23",
    name: "Purple T-Shirt",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "purple-t-shirt.jpg",
    price: 49,
    category: "Clothing",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 5,
  },
  {
    id: "1024",
    code: "lm2tny2k4",
    name: "Shoes",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "shoes.jpg",
    price: 64,
    category: "Clothing",
    quantity: 0,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1025",
    code: "nbm5mv45n",
    name: "Sneakers",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "sneakers.jpg",
    price: 78,
    category: "Clothing",
    quantity: 52,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1026",
    code: "zx23zc42c",
    name: "Teal T-Shirt",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "teal-t-shirt.jpg",
    price: 49,
    category: "Clothing",
    quantity: 3,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1027",
    code: "acvx872gc",
    name: "Yellow Earbuds",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "yellow-earbuds.jpg",
    price: 89,
    category: "Electronics",
    quantity: 35,
    inventoryStatus: "INSTOCK",
    rating: 3,
  },
  {
    id: "1028",
    code: "tx125ck42",
    name: "Yoga Mat",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "yoga-mat.jpg",
    price: 20,
    category: "Fitness",
    quantity: 15,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1029",
    code: "gwuby345v",
    name: "Yoga Set",
    CONTACTS: "Product CONTACTS",
    lastImportDate: "yoga-set.jpg",
    price: 20,
    category: "Fitness",
    quantity: 25,
    inventoryStatus: "INSTOCK",
    rating: 8,
  },
];

export default function OneGroup() {
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

  const exportCSV = () => {
    dt.current.exportCSV();
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

  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product["category"] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };
  const parms = useParams();
  const exportToExcel = () => {
    // const selectedRows = selectedProducts.map((product) =>
    //   products.find((p) => p.id === product)
    // );

    const exportData = selectedProducts.map((product) => ({
      id: product?.id || "", // Use optional chaining and default value
      Name: product?.name || "",
      Price: product?.price || 0,
      Category: product?.category || "",
      Rating: product?.rating || 0,
      InventoryStatus: product?.inventoryStatus || "",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    XLSX.writeFile(wb, "exported_products.xlsx");
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
          className="btn btn-secondary cursor-pointer text-white rounded-xl mx-1 fs-14 mb-2"
        >
          Upload
          <i class="uil uil-export  mx-2"></i>
        </button>{" "}
        <button
          label="Export Selected to Excel"
          icon="pi pi-file-excel"
          onClick={exportToExcel}
          className="btn btn-info cursor-pointer text-white  rounded-xl mx-1 mb-2 fs-14"
          disabled={!selectedProducts || !selectedProducts.length}
        >
          Export Excel
          <i class="uil uil-import mx-2"></i>
        </button>{" "}
       
        <button
          label="Export Selected to Excel"
          icon="pi pi-file-excel"
          onClick={exportPDF}
          className="btn btn-info cursor-pointer text-white  rounded-xl mx-1 mb-2 fs-14"
          disabled={!selectedProducts || !selectedProducts.length}
        >
          Export Pdf
          <i class="uil uil-import mx-2"></i>
        </button>{" "}
      </div>
    );
  };

  // const rightToolbarTemplate = () => {
  //   return (
  //     <Button
  //       label="Export"
  //       icon="pi pi-upload"
  //       className="p-button-help"
  //       onClick={exportCSV}
  //     />
  //   );
  // };

  // const imageBodyTemplate = (rowData) => {
  //   return (
  //     <img
  //       src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
  //       alt={rowData.image}
  //       className="shadow-2 border-round"
  //       style={{ width: "64px" }}
  //     />
  //   );
  // };

  // const priceBodyTemplate = (rowData) => {
  //   return formatCurrency(rowData.price);
  // };

  // const ratingBodyTemplate = (rowData) => {
  //   return <Rating value={rowData.rating} readOnly cancel={false} />;
  // };

  // const statusBodyTemplate = (rowData) => {
  //   return (
  //     <Tag
  //       value={rowData.inventoryStatus}
  //       severity={getSeverity(rowData)}
  //     ></Tag>
  //   );
  // };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className="d-flex align-items-center gap-2">
          <i
            class="uil uil-edit fs-17 text-blue cursor-pointer"
            icon="pi pi-pencil mr-2"
            onClick={() => editProduct(rowData)}
          ></i>
          <AiOutlineDelete
            class="uil uil-backspace fs-17 text-red cursor-pointer"
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
      <button
        label="New"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
        className="btn btn-primary rounded-xl mx-1 fs-14 "
      >
        Add Contact
        <i class="uil uil-plus mx-2"></i>
      </button>{" "}
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
  const [uploadedExcelData, setUploadedExcelData] = useState([]);

  const handleUploadExcel = (event) => {
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
  doc.text("Date Issued : 2023-09-22", marginLeft, marginTop + imgHeight + 45);
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

  const [importExcel, setImportExcel] = useState(false);
  return (
    <div className="p-2">
      <Toast ref={toast} />

      <div className="card-body">
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

        {/* <div>
          <Button
            label="Upload Excel"
            icon="pi pi-upload"
            onClick={() =>
              document.getElementById("upload-excel-input").click()
            }
          />
          <Button
            label="Add Excel to Table"
            icon="pi pi-plus"
            onClick={addExcelToTable}
            disabled={uploadedExcelData.length === 0}
          />
        </div> */}
        <input
          id="upload-excel-input"
          type="file"
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          onChange={handleUploadExcel}
        />

        <DataTable
          width={"100%"}
          ref={dt}
          value={products}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          // dataKey="id"
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          selectionMode={"checkbox"}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            className="fs-13 "
            field="CONTACTS"
            header="Contacts"
            sortable
            style={{ minWidth: "4rem" }}
          ></Column>

          <Column
            className="fs-13"
            // body={nameBodyTemplate}
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>

          <Column
            className="fs-13"
            field="category"
            header="Created At"
            sortable
            style={{ minWidth: "6rem" }}
          ></Column>
          <Column
            className="fs-13"
            // field="inventoryStatus"
            header="Status"
            body={statusBodyTemplate2}
            // sortable
            style={{ minWidth: "4rem" }}
          ></Column>

          <Column
            className="fs-13"
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            // style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Add"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name1" className="font-bold">
            Name
          </label>
          <div class="form-floating mb-4">
            <input
              id="name"
              type="text"
              placeholder="Text Input"
              onChange={(e) => onInputChange(e, "name")}
              required
              //   autoFocus
              value={product.name}
              class="form-control"
            />
            {submitted && !product.name && (
              <small className="p-error">Name is required.</small>
            )}
            {/* <label for="name">Name</label> */}
          </div>
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Phone
          </label>
          <div class="form-floating mb-4">
            <input
              id="textInputExample"
              type="text"
              class="form-control"
              placeholder="Text Input"
              value={product.CONTACTS}
              onChange={(e) => onInputChange(e, "CONTACTS")}
              required
            />
            {submitted && !product.phone && (
              <small className="p-error">Phone is required.</small>
            )}
            {/* <label for="textInputExample">Phone</label> */}
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
        footer={productDialogFooter}
        onHide={() => setImportExcel(false)}
      >
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
            //   onChange={handleUploadExcel}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
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
        footer={deleteProductsDialogFooter}
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
