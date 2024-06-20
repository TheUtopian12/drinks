import { create } from 'zustand'

import { RecipesSliceProps, createRecipeSlice } from './recipeSlice'
import { devtools } from 'zustand/middleware'
import { FavoritesSliceType, CreateFavoriteSlice } from './favoriteSlice'

import { NotificationSlice, createNotificationSlice } from './notificationSlice'

export const useAppStore = create<RecipesSliceProps & FavoritesSliceType & NotificationSlice>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...CreateFavoriteSlice(...a),
    ...createNotificationSlice(...a)

})))