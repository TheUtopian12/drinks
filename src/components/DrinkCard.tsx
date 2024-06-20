import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

interface Props {
  drink: Drink;
}
export default function DrinkCard({ drink }: Props) {
  const { selectRecipes } = useAppStore();
  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>
      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          onClick={() => selectRecipes(drink.idDrink)}
          type="button"
          className="bg-orange-500 hover:bg-orange-800 mt-5 w-full p-3 font-bold text-white text-lg"
        >
          Ver receta
        </button>
      </div>
    </div>
  );
}
