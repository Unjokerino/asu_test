import { createSlice } from '@reduxjs/toolkit';
import tesData from '../../testData.json'

export const tableSlice = createSlice({
    name: 'table',
    initialState: {
        data: [],
        loading: false,
    },
    reducers: {
        toggleLoading: (state) => {
            state.loading = !state.loading
        },
        setData: (state, action) => {
            state.data = action.payload
        },
    },
});

export const { setData, toggleLoading } = tableSlice.actions;

export const getDataAsync = () => dispatch => {
    dispatch(toggleLoading())
    setTimeout(() => {
        dispatch(setData(tesData));
        dispatch(toggleLoading())
    }, 1000);
};

export const selectData = state => state.table.data;
export const selectLoading = state => state.table.loading;

export default tableSlice.reducer;
