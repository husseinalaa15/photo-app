import { Box, Button, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import { firebaseAuth } from "../../config/Firebase";
import { useTheme } from '@mui/material/styles';
import TitleForm from "./titleForm";
import { Link } from "react-router-dom";

type Field = {
  id: number;
  name: string;
  type: string;
};
type Caption = { 
  text:string;
  link:string;
  linktext:string;
}
type IProps = {
  initialValues: any;
  fields: Field[];
  submitBtn : string;
  title?:string;
  caption?:Caption 
  handleSubmit: (values: any) => Promise<void>;

}

const ReusableForm: React.FC<IProps> = ({ initialValues, fields,submitBtn ,title,caption,handleSubmit}) => {
  const theme = useTheme();


  return (

    <Box
    sx={{
      backgroundColor: theme.palette.primary.main,
      padding: '16px', 
      borderRadius: '8px', 
      width:"500px"
    }}
    >
        {title && (
       <TitleForm title={title} />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any) => {
          handleSubmit(values);
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap:'15px'
              }}
            >
              {fields.map((field) => (
                <TextField
                  key={field.id}
                  id="standard-basic"
                  label={field.name}
                  variant="standard"
                  type={field.type}
                  value={values[field.name]}
                  name={field.name}
                  onChange={handleChange}
                  color="secondary"
                />
              ))}
              <Button color="secondary"  variant="contained" type="submit"  >{submitBtn}</Button>

            </Box>


          </Form>
        )}
      </Formik>
      {caption && (
        <Box >

            <Typography variant="caption" component="div">
            {caption.text} <Link  to={caption.link} >
            {caption.linktext}
            </Link>
        </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReusableForm;
