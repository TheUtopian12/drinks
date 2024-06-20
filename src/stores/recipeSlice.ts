import { StateCreator } from "zustand"
import { getCategories, getDetails, getRecipes } from "../services/RecipeService"
import type { Categories, DetailDrink, Drink, Drinks, SearchFilter } from "../types"

export type RecipesSliceProps = {
    categories: Categories,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipes: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
    drinks: Drinks
    detailDrink: DetailDrink
    modal: boolean
}

export const createRecipeSlice: StateCreator<RecipesSliceProps> = (set) => ({

    categories: {
        drinks: []
    },
    detailDrink: {} as DetailDrink,
    drinks: { drinks: [] },
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()

        set({
            categories
        })
    },

    searchRecipes: async (searchFilters) => {



        const drinks = await getRecipes(searchFilters)

        set({
            drinks
        })
    },
    selectRecipes: async (id) => {

        const detailDrink = await getDetails(id)
        set({
            detailDrink,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            detailDrink: {} as DetailDrink
        })
    }



})