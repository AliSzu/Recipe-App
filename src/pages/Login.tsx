import LoginForm from "../components/organisms/LoginForm";
import AuthLayout from "../components/templates/AuthLayout";
import { ROUTES } from "../constants/Routes";

const Login = () => {
  return (
    <AuthLayout
      messageTransKey="message.signUp"
      messageRoute={ROUTES.SIGNUP}
      titleTransKey="card.login"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
