import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    sort: {
        name: 'популярности', 
        sortBy: 'rating',
        type:'desc',
    },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sort = action.payload;
        },
        setOrder(state, action) {
            state.sort.type = action.payload;
        },
    }
})

export const { setCategoryId, setSortType, setOrder } = filterSlice.actions;
export default filterSlice.reducer;