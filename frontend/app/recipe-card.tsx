import { Link } from "@remix-run/react";

export default function RecipeCard({ recipe }) {
  const { id, title, author, category, image, ratings, prep_time, cook_time } = recipe;
  return (
    <li className="relative flex flex-col rounded-lg bg-slate-50 border border-solid border-slate-500 hover:shadow hover:text-teal-700 hover:border-teal-700 focus-within:border-teal-700 focus-within:text-teal-700 transition-all hover:transition focus-within:transition">
      <div className="order-2 flex flex-col p-2">
        <h2 className="order-2 flex-grow font-bold text-xl">
          <Link 
            to={`${id}`} 
            className="no-underline rounded-md focus:outline focus:outline-2 focus:outline-orange-500 after:absolute after:bottom-0 after:top-0 after:left-0 after:right-0"
          >
            {title}
          </Link>
        </h2>

        <small className="order-3 font-normal text-sm">by {author}</small>
        <small className="order-1 mb-2 uppercase font-normal text-sm tracking-wide">{category}</small>
      </div>
        
      <div className="order-1 relative">
        <img className="w-full aspect-video object-cover rounded-t-lg" src={image} alt={"Image of " + title} />
        <span className="absolute left-2 bottom-2 h-6 px-2 flex items-center justify-center rounded-md font-normal text-sm text-white bg-orange-400">Time: {prep_time + cook_time} min</span>
        <span className="absolute right-2 bottom-2 w-9 h-9 flex items-center justify-center rounded-full font-bold text-lg text-white bg-teal-600">{ratings.toFixed(1)}</span>
      </div>
    </li>
  );
}
