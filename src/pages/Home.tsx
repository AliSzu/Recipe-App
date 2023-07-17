import { useAppSelector } from "../store/store";

const Home = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return <div>Welcome Home {userInfo.email}</div>;
  // PLACEHOLDER
};

export default Home;
