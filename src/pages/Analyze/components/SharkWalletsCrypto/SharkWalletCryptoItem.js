import styles from '././SharkWalletsCrypto.module.scss';
import classNames from 'classnames/bind';
import CryptoItem from './CryptoItem';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSharkWallet } from '~/modules/SharkWallet/sharkWalletSlice';
import { sharkListSelector } from '~/modules/SharkWallet/selector';

const cx = classNames.bind(styles);


function SharkWalletCryptoItem() {
    const dispatch = useDispatch();

    const sharkCoin = useSelector(sharkListSelector);
    console.log(sharkCoin)
    useEffect(() => {
        dispatch(fetchSharkWallet());
    }, [dispatch]);

    return (
        sharkCoin.map((item) => (
            <tr className={cx('tr-crypto__item')}>
                <td>#1</td>
                <CryptoItem />
                <td>450,000</td>
                <td>$450,000(100%)</td>
            </tr>
        ))

    );
}

export default SharkWalletCryptoItem;
