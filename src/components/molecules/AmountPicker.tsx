import { Button, Input, styled } from "@mui/material";
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

const StyledButton = styled(Button)({
  width: "50px",
});

const AmountPicker = ({ amount, onAmountChange }: AmountPickerProps) => {
  const handleAmountChange = (newAmount: number) => {
    onAmountChange(newAmount);
  };

  return (
    <>
      <StyledButton onClick={() => handleAmountChange(amount - 1)}>
        <RemoveIcon />
      </StyledButton>
      <StyledInput
        type="number"
        value={amount}
        disableUnderline={true}
        onChange={(e) => handleAmountChange(+e.target.value)}
      />
      <StyledButton onClick={() => handleAmountChange(amount+1)}>
        <AddIcon />
      </StyledButton>
    </>
  );
};

export default AmountPicker;