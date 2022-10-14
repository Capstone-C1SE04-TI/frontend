import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MarketOverviewDetail.module.scss';
import Image from '~/components/Image/Image';
import ChartOverview from '../AssetCoins/ChartOverview';

const cx = classNames.bind(styles);

function coinItem({ index, data, increaseStatus24h, increaseStatus7d }) {
    
     // eslint-disable-next-line react-hooks/rules-of-hooks
     const navigate = useNavigate();

    const classNamesStatusCoin24h = cx(increaseStatus24h ? 'increase' : 'reduce');
    const classNamesStatusCoin7h = cx(increaseStatus7d ? 'increase' : 'reduce');


    return (
        <tr key={index} onClick={() => navigate(`/discover/detail/${data.symbol}`)}>
            <td>{index + 1}</td>
            <td className={cx('pricedata')}>
                <Image width="20" className={cx('imagedata')} src={data.iconURL} alt="logo" />
                <span>
                    {data.name}({data.symbol})
                </span>
            </td>
            <td>${data.usd.price}</td>
            <td className={classNamesStatusCoin24h}>{Math.round(data.usd.percentChange24h * 100) / 100}%</td>
            <td className={classNamesStatusCoin7h}>{Math.round(data.usd.percentChange7d * 100) / 100}%</td>
            <td>${data.usd.volume24h.toFixed(0)}</td>
            <td>${data.marketCap.toFixed(0)}</td>
            <td>
                {data.circulatingSupply.toFixed(0)} {data.symbol}
            </td>
            <td>
                <ChartOverview />
            </td>
        </tr>
    );
}

export default coinItem;
