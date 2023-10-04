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
import { useSelector } from "react-redux";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export default function NewMapTable() {
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
  const params = useParams("").name;
  const [dataBuilding, setDataBuilding] = useState([]);
  const [dataLevel, setDataLevel] = useState([]);
  const [dataDepart, setDataDepart] = useState([]);
  const [dataRooms, setDataRooms] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  //////////////
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
        `https://${params}.almnew.online/api/building-all`, // Increment the page by 1

        config
      );
      console.log(res);
      if (res.status === 200) {
        if (res.data.buildings.length > 0) {
          setDataBuilding(res.data.buildings);
        } else {
          toast.current.show({
            severity: "error",
            // summary: "Successful",
            detail: "Not Found Data",
            life: 3000,
          });
        }
        setDataBuilding(res.data.buildings);
        // setTotalPages(res.data.buildings.last_page);
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
  // Include 'hasMore' as a dependency to re-trigger when it changes.
  const [importExcel, setImportExcel] = useState(false);
  const [itemBuild, setItemBuild] = useState("");
  const [itemroom, setItemroom] = useState("");
  const [itemlevel, setItemlevel] = useState("");
  const [itemitem, setItemitem] = useState("");
  const [itemdept, setItemdept] = useState("");
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const getDataLevel = async (e) => {
    if (e) {
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
          `https://${params}.almnew.online/api/get-level/${e.id}?page=${page}`,

          config
        );
        console.log(res);
        if (res.status === 200) {
          if (res.data.levels.data > 0) {
            setDataLevel((prevItems) => [
              ...prevItems,
              ...res.data.levels.data,
            ]);
            console.log("first");
          } else {
            setDataLevel((prevItems) => [
              ...prevItems,
              ...res.data.levels.data,
            ]);
            toast.current.show({
              severity: "error",
              // summary: "Successful",
              detail: "Not Found Data",
              life: 3000,
            });
          }
          if (hasMore) {
            getDataLevel();
          }
          // setTotalPages(res.data.buildings.last_page);
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
  // useEffect(() => {
  //   getDataLevel(itemBuild);
  // }, [page, hasMore]);
  const loadMore = () => {
    setPage(page + 1);
  };
  const getDataDepart = async (e) => {
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
        `https://${params}.almnew.online/api/get-dept/${e.id}`, // Increment the page by 1

        config
      );
      console.log(res);
      if (res.status === 200) {
        if (res.data.departments.length > 0) {
          setDataDepart(res.data.departments);
        } else {
          setDataDepart(res.data.departments);

          toast.current.show({
            severity: "error",
            // summary: "Successful",
            detail: "Not Found Data",
            life: 3000,
          });
        }

        // setTotalPages(res.data.buildings.last_page);
      } else {
        console.log(res);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);

      //  setError(true);
    }
  };

  const getDataRoom = async (e) => {
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
        `https://${params}.almnew.online/api/get-room/${e.id}`, // Increment the page by 1

        config
      );
      console.log(res);
      if (res.status === 200) {
        if (res.data.rooms.length > 0) {
          setDataRooms(res.data.rooms);
        } else {
          setDataRooms(res.data.rooms);

          toast.current.show({
            severity: "error",
            // summary: "Successful",
            detail: "Not Found Data",
            life: 3000,
          });
        }

        // setTotalPages(res.data.buildings.last_page);
      } else {
        console.log(res);
      }
    } catch (error) {
      // setLoading(false);
      console.log(error);

      //  setError(true);
    }
  };

  const getDataIems = async (e) => {
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
        `https://${params}.almnew.online/api/get-item/${e.id}`, // Increment the page by 1

        config
      );
      console.log(res);
      if (res.status === 200) {
        setDataItems(res.data.items);
        if (res.data.items.length > 0) {
          setDataItems(res.data.items);
        } else {
          toast.current.show({
            severity: "error",
            // summary: "Successful",
            detail: "Not Found Data",
            life: 3000,
          });
        }
        // setTotalPages(res.data.buildings.last_page);
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

  const [checked, setChecked] = useState(false);

  const handleToggleChange = (rowData, value) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowData.id]: value,
    }));
  };

  const [checkedRows, setCheckedRows] = useState({});

  const [uploadedExcelData, setUploadedExcelData] = useState([]);

  // Rest of your code...
  // ...

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${product.lastImportDate}`}
        alt={product.image}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  return (
    <div className="map p-2">
      <Toast ref={toast} />
      <div
        className=" d-flex text-center m-auto w-100"
        style={{ overflowX: "scroll" }}
      >
        <DataTable
          style={{ width: "100%" }}
          ref={dt}
          value={dataBuilding}
          // selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
        >
          <Column
            className="fs-18 cursor-pointer "
            field=""
            header="Buildings"
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div
                    // className="d-flex align-items-center gap-2"
                    className={
                      itemBuild.id == rowData.id
                        ? "cursor-pointer text-primary h-100 d-flex align-items-center"
                        : "cursor-pointer  h-100 d-flex align-items-center"
                    }
                    onClick={() => {
                      setDataItems([]);
                      setDataRooms([]);
                      setDataDepart([]);
                      setPage(0);
                      setDataLevel("");
                      setItemBuild(rowData);
                      getDataLevel(rowData);
                    }}
                  >
                    {rowData.name}
                  </div>
                </React.Fragment>
              );
            }}
            style={{ width: "max-content", height: "6rem" }}
          ></Column>
        </DataTable>

          <DataTable
            style={{ width: "100%", height: "6rem" }}
            ref={dt}
            value={dataLevel}
            // selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
          >
            <Column
              className="fs-18"
              header="Levels"
              style={{ width: "max-content", height: "6rem" }}
              body={(rowData) => {
                return (
                  <React.Fragment>
                    <div
                      className={
                        itemlevel.id == rowData.id
                          ? "cursor-pointer text-primary  h-100 d-flex align-items-center bg-dengar"
                          : "cursor-pointer  h-100 d-flex align-items-center"
                      }
                      onClick={() => {
                        setDataItems([]);
                        setDataRooms([]);

                        setItemlevel(rowData);
                        getDataDepart(rowData);
                      }}
                    >
                      {rowData.name}
                      <Link
                        to={"/" + params + "/levels/" + rowData.id}
                        class="mx-2 text-danger"
                      >
                        (Show)
                      </Link>{" "}
                    </div>
                  </React.Fragment>
                );
              }}
            ></Column>
          </DataTable>
 

        <DataTable
          style={{ width: "100%" }}
          ref={dt}
          value={dataDepart}
          // selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
        >
          <Column
            className="fs-18"
            // field="inventoryStatus"
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div
                    className={
                      itemdept.id == rowData.id
                        ? "cursor-pointer text-primary  h-100 d-flex align-items-center bg-dengar"
                        : "cursor-pointer  h-100 d-flex align-items-center"
                    }
                    onClick={() => {
                      setItemdept(rowData);
                      setDataItems([]);
                      getDataRoom(rowData);
                    }}
                  >
                    {rowData.name}
                    <Link
                      class="mx-2 text-danger"
                      to={"/" + params + "/department/" + rowData.id}
                    >
                      (show)
                    </Link>{" "}
                  </div>
                </React.Fragment>
              );
            }}
            style={{ width: "max-content", height: "6rem" }}
            header="Departments"
          ></Column>
        </DataTable>
        <DataTable
          style={{ width: "100%" }}
          ref={dt}
          value={dataRooms}
          // selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
        >
          <Column
            className="fs-18"
            style={{ width: "max-content", height: "6rem" }}
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div
                    className={
                      itemroom.id == rowData.id
                        ? "cursor-pointer text-primary  h-100 d-flex align-items-center bg-dengar"
                        : "cursor-pointer  h-100 d-flex align-items-center"
                    }
                    onClick={() => {
                      setItemroom(rowData);
                      getDataIems(rowData);
                    }}
                  >
                    {rowData.name}
                    <Link
                      class="mx-2 text-danger"
                      to={"/" + params + "/rooms/" + rowData.id}
                    >
                      (show)
                    </Link>{" "}
                  </div>
                </React.Fragment>
              );
            }}
            header="Rooms"
          ></Column>
        </DataTable>
        <DataTable
          style={{ width: "100%", height: "6rem" }}
          ref={dt}
          value={dataItems}
          // selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
        >
          <Column
            body={(rowData) => {
              return (
                <React.Fragment>
                  <div
                    className="cursor-pointer"
                    // onClick={() => getDataDepart(rowData)}
                  >
                    {rowData.name}
                    <Link
                      class="mx-2 text-danger"
                      to={"/" + params + "/items/" + rowData.id}
                    >
                      (show)
                    </Link>{" "}
                  </div>
                </React.Fragment>
              );
            }}
            className="fs-18"
            field="inventoryStatus"
            header="Items"
            style={{ height: "6rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header={product.name ? "Edit Building" : "Add Building"}
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name1" className="font-bold">
            Building Name
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
              <small className="p-error">Building Name is required.</small>
            )}
            {/* <label for="name">Name</label> */}
          </div>
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Building Code
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
              <small className="p-error">Building Code is required.</small>
            )}
            {/* <label for="textInputExample">Phone</label> */}
          </div>
        </div>
        <div className="field">
          <label htmlFor="description" className="font-bold">
            Building Image
          </label>
          <div class="form-floating mb-4">
            <input
              id="textInputExample2"
              type="file"
              class="form-control"
              placeholder="Text Input"
              // value={product.cate(show)ry}
              // onChange={(e) => onInputChange(e, "category")}
              required
            />
            {submitted && !product.phone && (
              <small className="p-error">Building Name is required.</small>
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
