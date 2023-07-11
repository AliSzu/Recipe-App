
import SignUpFrom from "../components/organisms/SignUpForm";
import AuthLayout from "../components/templates/AuthLayout";
import { ROUTES } from "../constants/routes";

const SignUp = () => {
  return (
    <>
      <AuthLayout messageTransKey="message.login" titleTransKey="cardTitle.signUp" messageRoute={ROUTES.LOGIN}>
        <SignUpFrom />
      </AuthLayout>
    </>
  );
};

export default SignUp;
