import { StateCreator } from 'zustand'
import { DetailDrink } from '../types'
import { RecipesSliceProps, createRecipeSlice } from './recipeSlice'
import { NotificationSlice, createNotificationSlice } from './notificationSlice'
export type FavoritesSliceType = {
    favorites: DetailDrink[]
    handleClickFavorite: (recipe: DetailDrink) => void
    favoriteExist: (id: DetailDrink['idDrink']) => boolean
    loadFromStorage: () => void
}

export const CreateFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceProps & NotificationSlice, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {

        if (get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se elimino de favoritos', error: false

            })
        } else {

            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'Se agrego a favoritos', error: false

            })
        }
        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    }
    ,
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const StoreFavorites = localStorage.getItem('favorites')

        if (StoreFavorites) {
            set({
                favorites: JSON.parse(StoreFavorites)
            })
        }
    }
})