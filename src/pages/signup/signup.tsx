import ReusableForm from '../../components/form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '../../config/Firebase'

const SignUp = () => {

    const initialValues = {
        email:"",
        password:"",
        repassword:""
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
        },
        {
            id:2,
            name:"repassword",
            type:'password',
        }
    ]
    const handleSubmit = async (values: any) => {
        const auth = firebaseAuth;
        try {
          const handleSignup = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = handleSignup.user;
          console.log(user);
        } catch (err) {
          console.log(err);
        }
      };

  return (

    <ReusableForm handleSubmit={handleSubmit} initialValues={initialValues} fields={fields} submitBtn='Sign up' title="Join us !" 
    caption={{
        text:"already have an account,",
        linktext:"Login",
        link:"/login"
    }}
    />
  )
}

export default SignUp