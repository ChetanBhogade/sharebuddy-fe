import { ProductCategories } from "@/constants/common";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import style from "./product.module.scss";
import { useEffect, useState } from "react";

export default function ProductsForm({
  open = false,
  handleClose,
  handleSubmit,
  dialogType,
  editData
}) {
  const [formData, setFormData] = useState({
    prdName: "",
    description: "",
    category: "",
    price: "",
    imageFile: "",
  });

  useEffect(()=>{
    if(editData !== null){
      setFormData({
        prdName: editData.name,
        description: editData.description,
        category: editData.category,
        price: parseFloat(editData.price),
        imageFile: "",
      })
    }
    else {
      setFormData({
        prdName: "",
        description: "",
        category: "",
        price: "",
        imageFile: "",
      })
    }
  },[editData])

  const handleInputChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData({
        ...formData,
        imageFile: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log(formData)

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ paddingBottom: 0 }}>{dialogType === "Add" ? "Add New Product" : "Update Product"}</DialogTitle>
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <DialogContent>
          <TextField
            autoFocus
            name="prdName"
            label="Product Name"
            value={formData.prdName}
            type="text"
            fullWidth
            variant="standard"
            size="small"
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            value={formData.description}
            size="small"
            variant="standard"
            fullWidth
            multiline
            onChange={handleInputChange}
            required
          />
          <FormControl
            fullWidth
            variant="standard"
            className={style.selectFormContrrol}
          >
            <InputLabel id="product-category-select">Category</InputLabel>
            <Select
              labelId="product-category-select"
              name="category"
              value={formData.category}
              label="Category"
              margin="dense"
              displayEmpty
              size="small"
              variant="standard"
              onChange={handleInputChange}
              required
            >
              {ProductCategories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="price"
            label="Price"
            value={formData.price}
            type="number"
            fullWidth
            variant="standard"
            size="small"
            onChange={handleInputChange}
            required
          />
          <span className={style.uploadImage}>Upload Image</span>
          <TextField
            autoFocus
            margin="dense"
            name="imageFile"
            // value={formData.imageFile}
            placeholder="Upload"
            type="file"
            fullWidth
            variant="standard"
            size="small"
            onChange={handleInputChange}
            inputProps={{ accept: 'image/*' }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{dialogType==="Add" ? "Add" : "Update"}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
