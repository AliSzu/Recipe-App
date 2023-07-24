import { CircularProgress, styled } from "@mui/material";

const ProgressContainer = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CenteredCircularProgress = () => {
  return (
    <ProgressContainer>
      <CircularProgress />
    </ProgressContainer>
  );
};

export default CenteredCircularProgress;
