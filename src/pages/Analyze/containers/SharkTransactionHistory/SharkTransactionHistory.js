import styles from './SharkTransactionHistory.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTransactionHistorySharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import {
    sharkCryptoStatusSelector,
    sharkTransactionHistorySelector,
    sharkWalletAddressSelector,
    sharkWalletIdSelector,
    statusTransactionSelector,
} from '~/modules/SharkWallet/selector';
import { Spin } from 'antd';
import SharkWalletTransactionItem from './../../components/SharkWalletTransactionItem';
import NoData from '~/components/NoData';
const cx = classNames.bind(styles);

function SharkTransactionHistory({ currentTabSharkWallet }) {
    const dispatch = useDispatch();

    const statusTransaction = useSelector(statusTransactionSelector);
    const sharkIdSelected = useSelector(sharkWalletIdSelector);
    const sharkAddressSelected = useSelector(sharkWalletAddressSelector);
    const sharkTransactionHistory = useSelector(sharkTransactionHistorySelector);


    useEffect(() => {
        if (sharkIdSelected) {
            dispatch(fetchTransactionHistorySharkWallet(sharkIdSelected))
        };

    }, [dispatch, sharkIdSelected]);

  console.log({ sharkTransactionHistory });
    return (
        currentTabSharkWallet === 'transaction-history' && (
            <Spin spinning={statusTransaction === 'loading' ? true : false}>
                <table className={cx('table-shark__crypto')}>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Transaction</th>
                            <th>Past Value</th>
                            <th>Present Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {sharkTransactionHistory.length === 0 && <div className="text-center">No data</div>} */}
                        {sharkTransactionHistory
                            .slice()
                            // .filter((transaction) => transaction.presentPrice)
                            .sort((prev, next) => {
                                return next?.presentPrice - prev?.presentPrice;
                            })
                            .map((transaction, index) => {
                                return (
                                    <SharkWalletTransactionItem
                                        data={transaction}
                                        index={index}
                                        key={index}
                                        sharkAddress={sharkAddressSelected}
                                    />
                                );
                            })}
                    </tbody>
                </table>
                {statusTransaction !== 'loading' && sharkTransactionHistory.length === 0 && <NoData />}
            </Spin>
        )
    );
}

export default SharkTransactionHistory;
