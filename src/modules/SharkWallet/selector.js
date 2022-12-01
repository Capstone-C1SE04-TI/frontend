import { createSelector } from "@reduxjs/toolkit";

export const sharkListSelector = (state) => state.sharkWallet.sharkList;
export const sharkCryptoSelector = (state) => state.sharkWallet.sharkCrypto;
export const sharkCryptoStatusSelector = (state) => state.sharkWallet.status;
export const sharkTransactionHistorySelector = (state) => state.sharkWallet.sharkTransactionHistory;
export const sharkWalletIdSelector = (state) => state.sharkWallet.sharkWalletId;
export const sharkWalletAddressSelector = (state) => state.sharkWallet.sharkWalletAddress;
export const sharkWalletTotalAssetsSelector = (state) => state.sharkWallet.sharkWalletTotalAssets;
export const sharkInfoSelector = (state) => state.sharkWallet.sharkInfo;
export const filterSharkTotalAssetsSelector = (state) => state.sharkWallet.filterSharkTotalAssets;
export const searchFilterChangeSelector = (state) => state.sharkWallet.searchFilterChange;
export const sharkDetailSelector = (state) => state.sharkWallet.sharkDetail;
export const tradeTransactionHistorySelector = (state) => state.sharkWallet.tradeTransactionHistory;

export const sharkRemainingSelector = createSelector(
    sharkListSelector,
    filterSharkTotalAssetsSelector,
    searchFilterChangeSelector,
    (sharkList, filterSharkTotalAssets, searchFilterChange) => {
        return sharkList.filter((shark) => {
            if (searchFilterChange) {
             
                return (
                    shark.sharkId.toString().includes(searchFilterChange) &&
                    shark.totalAssets >= filterSharkTotalAssets.startTotalAssets &&
                    shark.totalAssets <= filterSharkTotalAssets.endTotalAssets
                );
            } else
                return (
                    shark.totalAssets >= filterSharkTotalAssets.startTotalAssets &&
                    shark.totalAssets <= filterSharkTotalAssets.endTotalAssets
                );;
        });
    },
);
