import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, FieldArray } from "formik";
import React, { useMemo } from "react";

const MyRecursiveContainer = ({
  columns,
  formik,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
}) => {
  const builder = (column, index) => {
    switch (column.type) {
      case "text":
        return (
          <TextField
            key={index}
            fullWidth
            variant="filled"
            type="text"
            label={column.headerName}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[column.field]}
            name={column.field}
            error={!!touched[column.field] && !!errors[column.field]}
            helperText={touched[column.field] && errors[column.field]}
            sx={{ gridColumn: "span 12" }}
          />
        );
      case "password":
        return (
          <TextField
            key={index}
            fullWidth
            variant="filled"
            type="password"
            label={column.headerName}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[column.field]}
            name={column.field}
            error={!!touched[column.field] && !!errors[column.field]}
            helperText={touched[column.field] && errors[column.field]}
            sx={{ gridColumn: "span 12" }}
          />
        );
      case "number":
        return (
          <TextField
            key={index}
            fullWidth
            variant="filled"
            type="number"
            label={column.headerName}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[column.field]}
            name={column.field}
            error={!!touched[column.field] && !!errors[column.field]}
            helperText={touched[column.field] && errors[column.field]}
            sx={{ gridColumn: "span 12" }}
          />
        );
      case "tel":
        return (
          <TextField
            key={index}
            fullWidth
            variant="filled"
            type="tel"
            label={column.headerName}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[column.field]}
            name={column.field}
            error={!!touched[column.field] && !!errors[column.field]}
            helperText={touched[column.field] && errors[column.field]}
            sx={{ gridColumn: "span 12" }}
          />
        );
      case "email":
        return (
          <TextField
            key={index}
            fullWidth
            variant="filled"
            type="email"
            label={column.headerName}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values[column.field]}
            name={column.field}
            error={!!touched[column.field] && !!errors[column.field]}
            helperText={touched[column.field] && errors[column.field]}
            sx={{ gridColumn: "span 12" }}
          />
        );
      case "object":
        const row = values[column.field];
        const keys = Object.keys(values[column.field]);
        const keysFil = keys.filter((k) => typeof row[k] != "object");
        return (
          <div className="col-span-full">
            {keysFil.map((key, index) => {
              return (
                <Field
                  as={TextField}
                  name={`${column.field}.${key}`}
                  key={index}
                  type={typeof row[key]}
                ></Field>
              );
            })}
          </div>
        );
      case "arrayProductSizes":
        if (values.sizes == undefined || values.sizes == null)
          values.sizes = [
            { name: "S", quantity: 0 },
            { name: "M", quantity: 0 },
            { name: "L", quantity: 0 },
            { name: "XL", quantity: 0 },
          ];
        return (
          <FieldArray
            name={column.field}
            render={() => {
              return (
                <Box sx={{ gridColumn: "span 12" }} id="sizesContainer">
                  {values[column.field].map((i, index) => {
                    return (
                      <div key={index}>
                        <Field
                          as={TextField}
                          name={`${column.field}.${index}.quantity`}
                          type="number"
                        />
                        <Field
                          type="select"
                          as={Select}
                          name={`${column.field}.${index}.name`}
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                        </Field>
                      </div>
                    );
                  })}

                  {/* <div>
                    <Button variant="contained" onClick={()=>{
                      let test = document.createElement("p");test.innerText='Testing';
                      document.getElementById('sizesContainer').appendChild(test);
                    }}>More</Button>
                  </div> */}
                  {/* <div>
                    <TextField
                    id="sizeQuantityMore"
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Quantity"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <TextField
                      id="sizeNameMore"
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Size Name"
                      sx={{ gridColumn: "span 1" }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => {
                        let name = document.getElementById('sizeNameMore').value;
                        let quantity = +document.getElementById('sizeQuantityMore').value;
                        values.sizes = [
                          ...values.sizes,
                          { name, quantity},
                        ];
                      }}
                    >
                      More
                    </Button>
                  </div> */}
                </Box>
              );
            }}
          ></FieldArray>
        );
      case "select":
        return (
          //Available for primitive type options like string, number. Not allow array, object... cause formik compare object by reference

          // column{
          //   field: "category",
          //   type: "select",
          //   headerName: "Category",
          //   options:['men','women']
          // }
          // <Field type="select" as={Select} name={column.field} label={column.headerName}>
          //   {column.options.map((o, index) => {
          //       return <MenuItem value={o} key={index}>{o}</MenuItem>;
          //     })}
          // </Field>

          //  {category:{selected:'men', options:['men','women']}}
          <Field type="select" as={Select} name={`${column.field}.selected`}>
            {values[column.field].options.map((c, index) => {
              return (
                <MenuItem value={c} key={index}>
                  {c}
                </MenuItem>
              );
            })}
          </Field>
        );
      case "selectCategoryProduct":
        return (
          <FormControl fullWidth sx={{ gridColumn: "span 12" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.category}
              label="Category"
              name="category"
              onChange={handleChange}
            >
              {values["categories"].map((c, index) => {
                return (
                  <MenuItem
                    value={c.id === values.category?.id ? values.category : c}
                    key={index}
                  >
                    {"1." +
                      c.parentCategory.parentCategory.name +
                      " - 2." +
                      c.parentCategory.name +
                      " - 3." +
                      c.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );
      default:
        // return <div>Unsupported field</div>
        return <></>;
    }
  };

  return (
    <>
      {columns.map((c, index) => {
        return builder(c, index);
      })}
    </>
  );
};

export default MyRecursiveContainer;
