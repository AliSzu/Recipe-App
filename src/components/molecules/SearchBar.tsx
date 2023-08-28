import { InputAdornment, TextField, debounce, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useCallback } from "react";
import { DEBOUNCE_TIME } from "../../constants/DefaultValues";

interface SearchBarProps{
    onSearch: (phrase: string) => void 
}

const StyledInput = styled(TextField)(({ theme }) => ({
  width: "50%",
  margin: 0,
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "30px",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const SearchBar = ({onSearch}: SearchBarProps) => {

  const debounceSearch = useCallback(
    debounce((searchPhrase: string) => {
      onSearch(searchPhrase)
    }, DEBOUNCE_TIME),
    [debounce]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debounceSearch(event.target.value);
  };

  return (
    <StyledInput
      placeholder="Search by name"
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
