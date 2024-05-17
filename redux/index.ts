import { useDispatch, useSelector, Provider } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import themeReducer from '@/redux/slices/themeSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

const useAppDispatch: () => typeof store.dispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export { store, PayloadAction, createSlice, Provider, useAppDispatch, useAppSelector }
