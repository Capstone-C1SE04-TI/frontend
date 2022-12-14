import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Button({
    to,
    href,
    outlineBrow = false,
    outline = false,
    primary = false,
    success = false,
    error = false,
    notify = false,
    linearGradientPrimary = false,
    dark = false,
    large = false,
    small = false,
    medium = false,
    text = false,
    disabled = false,
    rounded = false,
    leftIcon,
    rightIcon,
    className,
    onClick,
    children,

    ...passProps
}) {
    let Comp = 'button';

    const props = { onClick, ...passProps };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        success,
        error,
        notify,
        dark,
        outlineBrow,
        outline,
        rounded,
        linearGradientPrimary,
        small,
        medium,
        large,

        text,
        disabled,

        [className]: className,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button