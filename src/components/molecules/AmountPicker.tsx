import { IconButton, Input, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface AmountPickerProps {
  amount: number;
  onAmountChange: (amount: number) => void;
}

const StyledInput = styled(Input)({
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& MuiInputBase-input-MuiInput-input": {
    textAlign: "center",
  },
  width: "50px",
});

const AmountContainer = styled("div")({
  display: "flex",
});

const StyledButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  ":disabled" : {
    backgroundColor: theme.palette.secondary.main,
  }
}));

const AmountPicker = ({ amount, onAmountChange }: AmountPickerProps) => {
  const handleAmountChange = (newAmount: number) => {
    const amount = newAmount < 1 ? 1 : newAmount;
    onAmountChange(amount);
  };

  return (
    <AmountContainer>
      <StyledButton
        onClick={() => handleAmountChange(amount - 1)}
        disabled={amount <= 1}
        size="small"
      >
        <RemoveIcon />
      </StyledButton>
      <StyledInput
        type="number"
        value={amount}
        disableUnderline={true}
        onChange={(e) => handleAmountChange(+e.target.value)}
      />
      <StyledButton onClick={() => handleAmountChange(amount + 1)} size="small">
        <AddIcon />
      </StyledButton>
    </AmountContainer>
  );
};

export default AmountPicker;
