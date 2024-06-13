import { redirect } from "@remix-run/node";

export const action = async({ request }) => {
  const formData = await request.formData();
  const id = String(formData.get("id"));

  const response = await fetch(`http://localhost:3000/ingredients/${id}`, { 
  	method: 'DELETE'
  });

  return redirect("/recipes/stock");
};
