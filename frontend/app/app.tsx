import React from "react";
import RecipeCard from "./recipe-card";

function App() {
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    fetch("/recipes").then((recipes) => setRecipes(recipes))
  }, []);

  return (
    <div className="flex flex-col">
      <header className="w-full h-4 mx-10 flex space-between bg-black">
        <img src="logo.png" alt="" />
        <button type="button" className="rounded-full border border-solid border-slate-100">
          <img src="avatar.png" alt="" />
        </button>
      </header>

      <main className="mx-10">
        <div className="flex flex-row space-between">
          <h1 className="text-2xl font-bold text-black mb-2">Recommendations</h1>
          <button
            type="button"
            className="rounded-md text-center mx-1"
          >
            Edit stock
          </button>
        </div>

        <ul className="grid gap-4">
          {recipes.map(recipe => <RecipeCard recipe={recipe} />)}
        </ul>
      </main>

      <footer className="w-full h-4 text-center">
        <small className="text-sm text-slate-400">Alberto Blázquez, 2024</small>
      </footer>
    </div>
  );
}
