import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useMemo } from "react";
import MyRecursiveContainer from "./MyRecursiveContainer";
import { shallowEqual } from "../../utils";

const FormikDynamic = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log('handleFormSubmit-FormikDynamic.jsx');
    console.log(values);
    if(!shallowEqual(values, props.initialValues)){
      props.handleFormSubmit(values);
    }else{
      alert('Nothing changed to be update!!!');
    }
  };

  const isEdit = useMemo(
    (initStateFormikDialog) => (initStateFormikDialog) => {
      const keys1 = Object.keys(initStateFormikDialog);
      for (let key of keys1) {
        if (initStateFormikDialog[key] !== "") {
          return true;
        }
      }
      return false;
    },
    []
  );
  return (
    <Box m="20px">
      {isEdit(props.initialValues) == true ? (
        <Header title="UPDATE" subtitle="Update" />
      ) : (
        <Header title="CREATE" subtitle="Create" />
      )}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={props.initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            {console.log('errors validation formik-FormikDynamic.jsx:',errors)}
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <MyRecursiveContainer
                columns={props.columns} handleBlur={handleBlur} handleChange={handleChange} values={values} errors={errors} touched={touched}
              ></MyRecursiveContainer>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  // contact: yup
  //   .string()
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("required"),
  // address1: yup.string().required("required"),
  // address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default FormikDynamic;
