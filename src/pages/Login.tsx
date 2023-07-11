import LoginForm from "../components/atoms/LoginForm";
import AuthLayout from "../components/templates/AuthLayout";
import { ROUTES } from "../constants/routes";

const Login = () => {
  return (
    <>
      <AuthLayout
        messageTransKey="message.signUp"
        messageRoute={ROUTES.SIGNUP}
        titleTransKey="cardTitle.login"
      >
        <LoginForm/>
      </AuthLayout>
    </>
  );
};

export default Login;