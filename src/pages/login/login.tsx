import React from 'react'
import ReusableForm from '../../components/form'
import { Button, Typography } from '@mui/material'
import { firebaseAuth } from '../../config/Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { login } from '../../sotre/authSlice'
import { redirect, useNavigate } from 'react-router-dom'

const Login = () => {
    const initialValues = {
        email:"",
        password:""
    }
    const fields =[
        {
            id:0,
            name:"email",
            type:'email',
        },
        {
            id:1,
            name:"password",
            type:'password',
        }
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (values: any) => {
        const auth = firebaseAuth;
        try {
          const handleSignin = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = handleSignin.user;
          const accessToken = user?.stsTokenManager?.accessToken;

          dispatch(login({
            id:user.uid,
            email:user.email,
            token:accessToken
          }))
          navigate('/favorites')
          console.log(user);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <>
    <ReusableForm handleSubmit={handleSubmit} initialValues={initialValues} fields={fields} submitBtn='Login' title='Login' caption={{
        text:"Doesn't have an account,",
        linktext:"Register",
        link:"/registeration"
    }} />



    </>
  )
}

export default Login