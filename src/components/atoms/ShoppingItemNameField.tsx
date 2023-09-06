import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';

interface ShoppingItemNameFieldProps {
  name: string;
}

const ShoppingItemNameField = ({ name }: ShoppingItemNameFieldProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  
  return (
    <TextField
      value={name}
      fullWidth
      disabled={isDisabled}
      margin="none"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setIsDisabled(!isDisabled)}>
              {!isDisabled && <CheckIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ShoppingItemNameField;
