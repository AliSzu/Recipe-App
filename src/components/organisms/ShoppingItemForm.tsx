import { Button, IconButton, styled, useMediaQuery } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { ShoppingItemFormValues } from "../../types/FormTypes";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  MAX_LENGTH,
  shoppingItemDefaultValues,
} from "../../constants/DefaultValues";
import { useAppSelector } from "../../store/store";
import { selectUserUid } from "../../slices/authSlice";
import IngredientFormField from "../atoms/IngredientFormField";
import { theme } from "../../theme/theme";
import { useTranslation } from "react-i18next";

interface ShoppingItemFormProps {
  onFormSubmit: (data: ShoppingItemFormValues) => void;
}

const StyledForm = styled("form")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 0.5fr 0.1fr",
  gap: "1rem",
  padding: '1rem',
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    padding: "0",
    marginBottom: '2rem'
  },
}));

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "baseline",
  alignItems: "center",
});

const ShoppingItemForm = ({ onFormSubmit }: ShoppingItemFormProps) => {
  const userUid = useAppSelector(selectUserUid);
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { t } = useTranslation();

  const methods = useForm<ShoppingItemFormValues>({
    defaultValues: {
      ...shoppingItemDefaultValues,
      owner: userUid,
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: ShoppingItemFormValues) => {
    onFormSubmit(data);
    reset(shoppingItemDefaultValues);
  };

  return (
    <FormProvider {...methods}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <IngredientFormField field="name" maxLength={MAX_LENGTH.NAME} />
        <IngredientFormField field="unit" maxLength={MAX_LENGTH.UNIT} />
        <ButtonContainer>
          {matchDownSm ? (
            <Button fullWidth variant="contained" type="submit">
              {t("button.submit")}
            </Button>
          ) : (
            <>
              <IconButton type="submit">
                <AddCircleIcon />
              </IconButton>
            </>
          )}
        </ButtonContainer>
      </StyledForm>
    </FormProvider>
  );
};

export default ShoppingItemForm;
