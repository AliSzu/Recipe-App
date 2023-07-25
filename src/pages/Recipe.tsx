import { useParams } from "react-router-dom";
import { useFetchRecipeById } from "../api/recipes";
import RecipeLayout from "../components/templates/RecipeLayout";
import CenteredCircularProgress from "../components/atoms/CenteredCircularProgress";

const Recipe = () => {
  const { id } = useParams();
  const { data: recipe, isLoading } = useFetchRecipeById(id);
  return (<> {isLoading ? <CenteredCircularProgress/> : recipe && <RecipeLayout recipe={recipe}/>} </>);
};

export default Recipe;
