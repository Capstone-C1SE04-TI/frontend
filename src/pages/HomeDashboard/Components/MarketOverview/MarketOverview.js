import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../MarketOverview/MarketOverview.module.scss';
import CoinItem from './CoinItem';

import Loading from '~/components/Loading';
import { Link } from 'react-router-dom';
import { coinsListSelector, statusCoinsSelector } from '~/modules/HomeDashboard/selector';
import { fetchCoinsHomeDashboard } from '~/modules/HomeDashboard/homeDashboardSlice';
const cx = classNames.bind(styles);

const PAGE_SIZE = 1;

function MarketOverview() {
     const coinsList = useSelector(coinsListSelector);
     const status = useSelector(statusCoinsSelector);
 
    const dispatch = useDispatch();

     useEffect(() => {
         dispatch(fetchCoinsHomeDashboard(PAGE_SIZE));
     }, [dispatch]);
    
    return (
        <section className={cx('colMiddle')}>
            <div className={cx('market-content')}>
                <h2>ACTIVITY</h2>
                <Link to="/discover">
                    <p>More token --&gt;</p>
                </Link>
            </div>
            <nav className={cx('statisticsOverview')}>
                <div className={cx('row')}>
                    <div className={cx('talbeScroll')}>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>24h %</th>
                                    <th>7d %</th>
                                    <th>Market Cap</th>
                                    <th>Volume(24h)</th>
                                    <th>Circulating Supply</th>
                                </tr>
                            </thead>

                            <tbody className={cx('listCoin')}>
                                {status === 'idle' &&
                                    coinsList.map((coin, index) => (
                                        <CoinItem
                                            index={index}
                                            key={coin.id}
                                            data={coin}
                                            increaseStatus={coin.usd.percentChange24h > 0 ? true : false}
                                        />
                                    ))}

                                {status === 'loading' && <Loading />}
                            </tbody>
                        </table>
                    </div>
                </div>
            </nav>
        </section>
    );
}

export default MarketOverview;
