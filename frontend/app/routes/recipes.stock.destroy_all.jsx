import { redirect } from "@remix-run/node";

export const action = async() => {
  const response = await fetch(`http://localhost:3000/ingredients/`, { 
  	method: 'DELETE'
  });

  return redirect("/recipes/stock");
};
