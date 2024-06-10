import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useTheme } from "@mui/material/styles";
import TitleForm from "./titleForm";
import { Link } from "react-router-dom";

type Field = {
  id: number;
  name: string;
  type: string;
};
type Caption = {
  text: string;
  link: string;
  linktext: string;
};
type IProps = {
  initialValues: any;
  fields: Field[];
  submitBtn: string;
  title?: string;
  caption?: Caption;
  error: boolean;
  loading: boolean;
  validationSchema: any;
  handleSubmit: (values: any, setStatus: (status?: any) => void) => Promise<void>;
};

const ReusableForm: React.FC<IProps> = ({
  initialValues,
  fields,
  submitBtn,
  title,
  caption,
  loading,
  handleSubmit,
  validationSchema
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: "16px",
        borderRadius: "8px",
        width: { xs: "100%", sm: "400px", md: "500px" },
        boxShadow: 1,
      }}
    >
      {title && <TitleForm title={title} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus }) => {
          try {
            await handleSubmit(values, setStatus);
          } catch (error:any) {
            setStatus({ backendError: error.message });
          }
        }}
      >
        {({ values, handleChange, isValid, isSubmitting, errors, touched, status, setStatus }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {fields.map((field) => (
                <TextField
                  key={field.id}
                  id={field.name}
                  label={field.name}
                  variant="standard"
                  type={field.type}
                  value={values[field.name]}
                  name={field.name}
                  onChange={(e) => {
                    handleChange(e);
                    setStatus(undefined); // Clear the backend error when the user changes any field
                  }}
                  color="secondary"
                  error={touched[field.name] && Boolean(errors[field.name])}
                />
              ))}
              {status && status.backendError && (
                <Typography color="error">{status.backendError}</Typography>
              )}
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                disabled={!isValid || isSubmitting || loading}
              >
                {loading ? <CircularProgress size={24} color="secondary" /> : submitBtn}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {caption && (
        <Box sx={{ padding: "10px 0px" }}>
          <Typography variant="caption" component="div">
            {caption.text}{" "}
            <Link to={caption.link} style={{ color: "#a26248" }}>
              {caption.linktext}
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ReusableForm;
