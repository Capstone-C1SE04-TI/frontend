import styles from './SharkWalletsOverview.module.scss';
import classNames from 'classnames/bind';
import { StarIcon } from '~/components/Icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { sharkListSelector } from '~/modules/SharkWallet/selector';

const cx = classNames.bind(styles);

function SharkWalletCoin() {
    const dispatch = useDispatch();

    const sharkCoin = useSelector(sharkListSelector);

    useEffect(() => {
        dispatch(fetchSharkWallet());
    }, [dispatch]);
    console.log(sharkCoin)
    return (
        <>
            {
                sharkCoin.map((wallet) => 
                <tr key={wallet.name}>
                    <td>#Shark{' '}{wallet.name}</td>
                    <td>${wallet.totalAsset}</td>
                    <td>2.36%</td>
                    <td><StarIcon/></td>
                </tr>
                )
            }
        </>
    );
}

export default SharkWalletCoin;
