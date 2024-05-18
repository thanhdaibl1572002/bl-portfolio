import { createSlice, PayloadAction } from '@/redux/index'

export type Theme = 'light' | 'dark'

interface ThemeState {
    theme: Theme
}

const initialState: ThemeState = {
    theme: 'dark'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state: ThemeState, action: PayloadAction<Theme>) {
            state.theme = action.payload
        },
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer