import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Nav.module.scss';
const cx = classNames.bind(styles);

function NavItem({ title, to }) {
    return (
        <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to={to}>
            <span className={cx('nav-item__title')}>{title}</span>
        </NavLink>
    );
}

export default NavItem;