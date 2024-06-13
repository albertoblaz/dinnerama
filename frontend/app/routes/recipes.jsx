import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useMatches,
  useParams
} from "@remix-run/react";
import RecipeCard from "../recipe-card"
import EmptySlate from "../empty-slate"

export const meta = () => {
  return [
    { title: "Dinnerama" },
    { name: "description", content: "Get food recommendations!" },
  ];
};

export const loader = async (args) => {
  const response = await fetch("http://localhost:3000/ingredients");
  const ingredients = await response.json();
  const ingredientNames = ingredients.map(ing => ing.name).join(",");

  const response2 = await fetch(`http://localhost:3000/recipes?ingredients=${ingredientNames}`);
  const recipes = await response2.json();
  
  return json({ recipes });
};

export default function Index() {
  const { recipes } = useLoaderData();
  const params = useParams();
  const matches = useMatches();

  const recipeOpen = !!params.recipeId;
  const stockOpen = matches.at(-1).id === "routes/recipes.stock";
  const paneOpen = recipeOpen || stockOpen;

  const mainToggleClass = paneOpen ? "translate-x-56" : "";
  const btnToggleClass = paneOpen ? "-translate-x-56" : "";
  const asideToggleClass = paneOpen ? "" : "-translate-x-full";

  return (
    <div className="relative flex flex-col">
      <header className="sticky top-0 z-10 w-full min-h-12 px-6 md:px-32 flex items-center justify-between bg-teal-600">
        <Link to="/recipes">
          <img className="h-8" src="/logo.png" alt="Dinnerama's logo" />
        </Link>
        <button type="button" className="rounded-full">
          <img className="h-8 rounded-full" src="/avatar.png" alt="User avatar" />
        </button>
      </header>

      <main className={`relative pt-12 pb-10 px-6 lg:px-32 transition ${mainToggleClass}`}>
        <div className="sticky top-12 z-10 py-4 flex flex-row items-center justify-between bg-white">
          <h1 className="text-3xl font-bold text-black mb-2">Recipes</h1>
          <Link
            to="/recipes/stock"
            className={`rounded-md text-center mx-1 bg-teal-600 text-white font-semibold px-4 py-2 transition ${btnToggleClass}`}
          >
            Edit ingredients
          </Link>
        </div>

        {recipes.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 md:gap-4">
            {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </ul>
        ) : (
          <EmptySlate />
        )}
        
      </main>

      <aside id="recipe-id" className={`fixed top-12 left-0 bottom-0 z-20 w-80 h-svh bg-slate-100 shadow-lg border border-solid border-slate-500 transition ${asideToggleClass}`}>
        <Outlet />
      </aside>

      <footer className="my-auto w-full min-h-12 px-6 md:px-32 mb-4 flex items-center justify-center">
        <small className="text-sm text-slate-800">&copy; Alberto Blázquez, 2024</small>
      </footer>
    </div>
  );
}
