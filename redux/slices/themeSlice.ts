import { createSlice, PayloadAction } from '@/redux/index'

export type ThemeType = 'light' | 'dark'

interface IThemeState {
    theme: ThemeType
}

const initialState: IThemeState = {
    theme: 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state: IThemeState, action: PayloadAction<ThemeType>) {
            state.theme = action.payload
        },
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer