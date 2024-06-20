import { z } from 'zod'
import { CategoriesApiResponseSchema, DrinksSchema, SearchFilterSchema, DrinkSchema, RecipeAPIResponseSchema } from '../schemas/recipe-schema'


export type Categories = z.infer<typeof CategoriesApiResponseSchema>

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export type Drinks = z.infer<typeof DrinksSchema>
export type Drink = z.infer<typeof DrinkSchema>

export type DetailDrink = z.infer<typeof RecipeAPIResponseSchema>