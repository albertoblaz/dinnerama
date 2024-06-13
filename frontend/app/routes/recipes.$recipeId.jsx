import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData
} from "@remix-run/react";
import { useRef, useEffect } from "react";

export const loader = async ({ params }) => {
  const response = await fetch(`http://localhost:3000/recipes/${params.recipeId}`);
  const recipe = await response.json();
  return json({ recipe });
};

function Stat({ label, value, unit }) {
	return (
		<div className="flex flex-col justify-center min-w-16 p-2 text-center rounded bg-orange-300 text-white">
			<p className="text-base">{value} {unit}</p>
			<small className="text-xs">{label}</small>
		</div>
	);
}

export default function RecipeId() {
	const { recipe } = useLoaderData();
	const { id, title, author, category, image, ratings, prep_time, cook_time, ingredients } = recipe;
	
	// Accessibility enhancement to focus on close button when the pane shows up
	const closeBtnRef = useRef(null);
	useEffect(() => {
		if (closeBtnRef.current) {
			closeBtnRef.current.focus();
		}
	}, [])

	return (
		<div className="relative flex flex-col">
			<Link 
				to="/recipes" 
				className="absolute top-2 right-2 z-1 w-8 h-8 flex items-center justify-center rounded-md text-lg text-white hover:text-slate-200 focus:text-slate-200 focus:outline focus:outline-2 focus:outline-orange-500"
				ref={closeBtnRef}
			>
				🗙
			</Link>

			<img 
				src={image} 
				alt={`Image of ${title}`}
				className="object-cover"
			/>

			<div className="p-4 flex flex-col">
				<h3 className="text-lg font-bold">{title}</h3>
				<small className="text-sm">Published by: {author}</small>
				<small className="text-sm">Category: {category}</small>

				<div className="my-3 flex gap-x-4 justify-between">
					<Stat label="Prep time" value={prep_time} unit="min" />
					<Stat label="Cook time" value={cook_time} unit="min" />
					<Stat label="Ratings" value={ratings.toFixed(1)} />
				</div>

				<h4 className="mb-1 text-base font-bold">Ingredients</h4>
				<ul className="list-disc pl-4">
					{ingredients.map((ing, index) => (
						<li key={index} className="text-sm">{ing}</li>
					))}
				</ul>
			</div>
		</div>
	);
};