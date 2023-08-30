import { Container, Snackbar } from "@mui/material";
import { Navbar } from "../components/organisms/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";

const RootContainer = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Container>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedOutlet />
          </motion.div>
        </AnimatePresence>
        <Snackbar />
      </Container>
    </>
  );
};

export default RootContainer;
