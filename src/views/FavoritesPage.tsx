import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritesPage() {
  const { favorites } = useAppStore();
  return (
    <div className="">
      <h1 className="text-6xl font-extrabold"></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        {favorites.map((recipe) => (
          <DrinkCard key={recipe.idDrink} drink={recipe} />
        ))}
      </div>
    </div>
  );
}
