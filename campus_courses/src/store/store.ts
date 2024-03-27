import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { authSlice } from './slices/auth.slice'
import { openedCourseSlice } from './slices/course.slice'

const rootReducer = combineReducers({
	//Server store
	[api.reducerPath]: api.reducer,
	//Local store
	[authSlice.reducerPath]: authSlice.reducer,
	[openedCourseSlice.reducerPath]: openedCourseSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
