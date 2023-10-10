import { TextField } from "@mui/material";
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
  const builder = (column) => {
    switch (column.type) {
      case "text":
        return (
          <TextField
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
      case "array":
        return <></>;
      default:
        // return <div>Unsupported field</div>
        return <></>;
    }
  };

  return (
    <>
      {columns.map((c) => {
        return builder(c);
      })}
    </>
  );
};

export default MyRecursiveContainer;
