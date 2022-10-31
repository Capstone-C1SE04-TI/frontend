import classNames from 'classnames/bind';
import styles from './Analyze.module.scss';
import { Row, Col } from 'antd';
import SharkWalletsOverview from './containers/SharkWalletsOverview';
import SharkWalletsCrypto from './containers/SharkWalletsCrypto/SharkWalletsCrypto';

const cx = classNames.bind(styles);
function Analyze() {
    return (
        <section className={cx('shark-wallet')}>
            <div className={cx('shark-wallet__content')}>
                <h2>SHARK WALLETS</h2>
            </div>
            <Row>
                <Col span={8}>
                    <SharkWalletsOverview />
                </Col>
                <Col span={15}>
                    <SharkWalletsCrypto />
                </Col>
            </Row>
        </section>
    );
}

export default Analyze;
