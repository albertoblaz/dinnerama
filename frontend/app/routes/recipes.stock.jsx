import { json } from "@remix-run/node";
import {
  Form,
  Link,
  useLoaderData,
  useNavigation
} from "@remix-run/react";

export const action = async({ request }) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));

  const response = await fetch("http://localhost:3000/ingredients", { 
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, unit: "kg", amount: 1 })
  });

  const ingredient = await response.json();
  return json({ ingredient });
};

export const loader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/ingredients`);
  const stock = await response.json();
  return json({ stock });
};

export default function Stock() {
  const { stock } = useLoaderData();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="relative flex flex-col p-4 gap-y-2">
      <Link 
        to="/recipes" 
        className="absolute top-2 right-2 z-1 w-8 h-8 flex items-center justify-center text-teal-600 text-lg hover:text-teal-800 focus:text-teal-800 focus:outline focus:outline-2 focus:outline-orange-500"
      >
        🗙
      </Link>

      <h2 className="font-bold text-black text-xl">Your ingredients</h2>

      <Form method="post" className="flex justify-between gap-x-2">
        <input type="text" name="name" className="w-full border border-solid border-slate-800 p-1" />

        <button 
          type="submit" 
          className={`min-w-20 px-2 rounded-md text-white text-base font-semibold ${isLoading ? "bg-slate-400" : "bg-teal-600"}`}
          onClick={(event) => {
            if (isLoading) {
              event.preventDefault();
            }
          }}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </Form>

      <ul>
        {stock.map(ing => (
          <li key={ing.id} className="flex justify-between mb-2">
            {ing.name}

            <Form method="post" action="destroy">
              <input type="hidden" name="id" value={ing.id} />
              <button
                type="submit"
                className={`px-1 ${isSubmitting ? "text-slate-400" : "text-black"} hover:text-teal-800 focus:text-teal-800`}
                onClick={(event) => {
                  if (isSubmitting) {
                    event.preventDefault();
                  }
                }}
              >
                x
              </button>
            </Form>
          </li>
        ))}
      </ul>

      <Form method="post" action="destroy_all" className="text-right">
        <button
          type="submit"
          className={`${isSubmitting ? "text-slate-400" : "text-black"} text-teal-600 hover:text-teal-800 focus:text-teal-800`}
          onClick={(event) => {
            if (isSubmitting) {
              event.preventDefault();
            }
          }}
        >
          Delete all
        </button>
      </Form>

      <p>{isLoading ? "Loading..." : isSubmitting ? "Deleting..." : null}</p>
    </div>
  );
}