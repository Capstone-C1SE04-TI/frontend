
import styles from './SharkWalletTransactionItem.module.scss';
import classNames from 'classnames/bind';
import { useCallback } from 'react';
import { convertUnixtimeToTimeCurrent,numberWithCommas}  from '~/helpers';
const cx = classNames.bind(styles);

function SharkWalletTransactionItem({ data, sharkAddress }) {

    const handleTransactionTo = useCallback(() => {
        if (sharkAddress === data.to) {
            return  `${data.from} → Wallet`;
        }
        else {
            return `Wallet → ${data.to}  `;
        }
    }, [data.from, data.to, sharkAddress]);

    return (
        <tr className={cx('tr-crypto__item')}>
            <td>{convertUnixtimeToTimeCurrent(data.timeStamp)}</td>
            <td>
                <a href={`https://etherscan.io/tx/${data.hash}`} rel="noopener noreferrer" target="_blank">
                    {handleTransactionTo()}
                </a>
            </td>
            <td>
                {numberWithCommas(data.numberOfTokens) + ' ' + data.tokenSymbol}
                <p>{data.pastPrice === 0 ? 0 : data.pastPrice.toFixed(3)}</p>
            </td>
            <td>{data.presentPrice === 0 ? 0 : data.presentPrice.toFixed(3)}</td>
        </tr>
    );
}

export default SharkWalletTransactionItem;