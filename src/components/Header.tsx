import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);
  const {
    fetchCategories,
    categories,
    searchRecipes,
    showNotification,
  } = useAppStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Consultar recetas
    searchRecipes(searchFilters);
  };

  return (
    <header
      className={isHome ? "bg-header bg-cover bg-center" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" className="w-32" alt="" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to={"/"}
            >
              Inicio
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
              to={"/favoritos"}
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            onSubmit={handlesubmit}
            action=""
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white font-extrabold text-lg"
              >
                Ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 rounded-lg w-full focus:outline-none"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="p-3 rounded-lg w-full focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">---Seleccione---</option>

                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value={"Buscar Receta"}
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase "
            />
          </form>
        )}
      </div>
    </header>
  );
}
