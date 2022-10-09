import { createSelector } from '@reduxjs/toolkit';

export const statusCoinsSelector = (state) => state.discoverCoins.status;
export const coinsListSelector = (state) => state.discoverCoins.coinsList;
export const searchTextSelector = (state) => state.discoverCoins.searchText;
export const filterByCategorySelector = (state) => state.discoverCoins.filters.category;

export const coinsRemainingSelector = createSelector(
    coinsListSelector,
    searchTextSelector,
    filterByCategorySelector,
    (coinsList, searchText, filterByCategory) => {
        const searchResult = coinsList.filter(
            (coin) =>
                coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchText.toLowerCase()),
        );

        return searchResult.filter((coin) => coin.symbol.includes(filterByCategory));
    },
);
