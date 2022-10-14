import classNames from 'classnames/bind';
import { ArrowDown, ArrowUp } from '~/components/Icons';
import styles from './WalletHotItem.modules.scss';
const cx = classNames.bind(styles);

function WalletHotItem({ data, increaseCoin = false, reduceCoin = false, index  }) {
    const classNamesStatusCoin = cx({
        increase: increaseCoin,
        reduce: reduceCoin,
    });

    console.log({data});

    return (
        <div className={cx('wallet-statics__card')}>
            <span className={cx('wallet-statics__card__heading')}>
                <div className={cx('wallet-statics__card__heading__item')}>
                    <img src={data.iconURL} alt="logo" />
                    {`${data.name} (${data.symbol})`}
                </div>
                <div className={cx('wallet-statics__card__heading__statics-values')}>
                    {increaseCoin && <ArrowUp />}
                    {reduceCoin && <ArrowDown />}
                    <p className={classNamesStatusCoin}>{data.percentChange24h.toFixed(3)}%</p>
                </div>
            </span>
            <h3 className={cx('wallet-statics__card__values')}>{data.price.toFixed(5)}</h3>
            <span className={cx('wallet-statics__card__date')}>Wed, May 20</span>
        </div>
    );
}

export default WalletHotItem;
