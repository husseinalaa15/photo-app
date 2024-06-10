import ReusableForm from "../../components/form";
import { firebaseAuth } from "../../config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../sotre/authSlice";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState } from "react";
import { Box } from "@mui/material";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
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
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [err, setError] = useState<boolean>(false);
  const [errMsg, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: any) => {
    const auth = firebaseAuth;
    setLoading(true);
    try {
      const handleSignin = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user: any = handleSignin.user;
      const accessToken: any = user?.stsTokenManager?.accessToken;

      dispatch(
        login({
          id: user.uid,
          email: user.email,
          token: accessToken,
        })
      );
      navigate("/");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(true);
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/invalid-credential":
          setErrorMessage("email or password is invalid.");
          break;
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/user-disabled":
          setErrorMessage(
            "This email address is disabled by the administrator."
          );
          break;
        case "auth/user-not-found":
          setErrorMessage("This email address is not registered.");
          break;
        case "auth/wrong-password":
          setErrorMessage(
            "The password is invalid or the user does not have a password."
          );
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
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
        width: "500px",
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
        error={err}
        loading={loading}
        validationSchema={loginValidationSchema}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        fields={fields}
        submitBtn="Login"
        title="Login"
        caption={{
          text: "Doesn't have an account,",
          linktext: "Register",
          link: "/registeration",
        }}
      />
    </>
  );
};

export default Login;
