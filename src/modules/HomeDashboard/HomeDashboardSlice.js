import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { marketOverviewService } from '~/services';

const homeDashboardSlice = createSlice({
    name: 'homeDashboard',
    initialState: {
        showSidebar: true,
        status: 'idle',
        coinsList: [],
    },

    reducers: {
        actionSidebar: (state) => {
            state.showSidebar = !state.showSidebar;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinsHomeDashboard.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCoinsHomeDashboard.fulfilled, (state, action) => {
                state.coinsList = action.payload;
                state.status = 'idle';
            });
    },
});


export const fetchCoinsHomeDashboard = createAsyncThunk('coins/fetchCoinsHomeDashboard', async (page) => {
    const response = await marketOverviewService.getCoins(page);
    return response.datas;
});

export default homeDashboardSlice;
