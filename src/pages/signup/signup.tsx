import ReusableForm from "../../components/form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../config/Firebase";
import { useState } from "react";
import { Box } from "@mui/material";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const initialValues = {
    email: "",
    password: "",
    repassword: "",
  };
  const fields = [
    {
      id: 0,
      name: "email",
      type: "email",
    },
    {
      id: 1,
      name: "password",
      type: "password",
    },
    {
      id: 2,
      name: "repassword",
      type: "password",
    },
  ];
  const [err,setError] = useState<boolean>(false)
  const [errMsg,setErrorMessage] = useState<string>()
  const [loading,setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleSubmit = async (values: any) => {
    const auth = firebaseAuth;
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setLoading(false)
      navigate('/login')
    } catch (err:any) {
      const errorMessage = err.message;
      const errorCode = err.code;
      setLoading(false)
      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email address is already in use by another account."
          );
          break;
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
    }
  };
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

  return (
    <>
    {err && 
    (
      <Box
      sx={{
        backgroundColor: '#EE4E4E',
        padding: "10px",
        borderRadius: "8px",
        width: { xs: "100%", sm: "400px", md: "500px" },
        boxShadow: 1,
        marginBottom: "10px",
        color:"white"
      }}
    >
      {errMsg}
    </Box>
    )
    
    }
    <ReusableForm
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      fields={fields}
      error={err}
      loading={loading}
      validationSchema={validationSchema}
      submitBtn="Sign up"
      title="Join us !"
      caption={{
        text: "already have an account,",
        linktext: "Login",
        link: "/login",
      }}
    />
    </>
  );
};

export default SignUp;
