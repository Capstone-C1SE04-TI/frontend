import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import styles from './MarketOverviewDetail.module.scss';

const cx = classNames.bind(styles);

function SkeletonCoinItem({ card }) {
    return Array(card)
        .fill(0)
        .map((_, i) => (
            <tr className={cx('skeleton-list')}>
                <td className={cx('skeleton-name')}>
                    <Skeleton circle width={40} height={40} />
                </td>
                <td>
                    <Skeleton count={2} width={50} />
                </td>
                <td>
                    <Skeleton count={1} width={80} />
                </td>
                <td>
                    <Skeleton count={1} width={100} />
                </td>
                <td>
                    <Skeleton count={1} width={100} />
                </td>
                <td>
                    <Skeleton count={1} width={100} />
                </td>
                <td>
                    <Skeleton count={1} width={100} />
                </td>
                <td>
                    <Skeleton count={1} width={100} />
                </td>
                <td>
                    <Skeleton count={1} width={100} />
                </td>
            </tr>
        ));
}

export default SkeletonCoinItem;
