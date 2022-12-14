
import styles from './WrapperBox.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);


function WrapperBox({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default WrapperBox;