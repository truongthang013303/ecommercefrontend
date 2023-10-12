import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
                  keys={index}
                  type={typeof row[key]}
                ></Field>
              );
            })}
          </div>
        );
      case "array":
        return (
          <FieldArray
            name={column.field}
            render={() => {
              return (
                <Box sx={{ gridColumn: "span 12" }}>
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
                return <MenuItem value={c} key={index}>{c}</MenuItem>;
              })}
          </Field>
        );
      case "selectCategoryProduct":
        // return (
        //   <Field type="select" as={Select} name="category">
        //     {values['categories'].map((c, index) => {
        //         return (
        //           <MenuItem value={c} selected={index===1?true:false}>{c.name+'-'+c.parentCategory.name+'-'+c.parentCategory.parentCategory.name}</MenuItem>
        //         )
        //       })}
        //   </Field>
        // );
        return (
          <FormControl fullWidth  sx={{ gridColumn: "span 12" }}>
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
                  <MenuItem value={c.id===values.category?.id?values.category:c} key={index}>
                    {'3.'+c.name +
                      " - 2." +
                      c.parentCategory.name +
                      " - 1." +
                      c.parentCategory.parentCategory.name}
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
