import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { Spin } from 'antd';

import { LogoIcon } from '~/components/Icons/Icons';
import { authService } from '~/services';
import styles from './SignIn.module.scss';
import validate from '~/helpers/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import Modal from '~/components/Modal';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignIn() {
    const navigate = useNavigate();

    const initialValue = {
        username: '',
        password: '',
    };

    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const inputUserRef = useRef();

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const deleteKeyObject = (formErrors) => {
        delete formErrors.phoneNumber;
        delete formErrors.confirmPassword;
        delete formErrors.email;
    };
    const handleExceptions = (message, user) => {
        switch (message) {
            case 'username-invalid':
                setFormErrors({ username: 'Username could not be found' });
                break;
            case 'username-notfound':
                setFormErrors({ username: 'Username could not be found' });
                break;

            case 'incorrect-password':
                setFormErrors({ password: 'Incorrect password. try again' });
                break;

            case 'successfully':
                localStorage.setItem('userInfo', JSON.stringify(user));
                navigate('/home-dashboard');
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        deleteKeyObject(formErrors);

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const fetchApi = async () => {
                setLoading(true);
                const response = await authService.signIn(formValues, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: Cookies.get('TI_AUTH_COOKIE') || '',
                    },
                });

                handleExceptions(response.message, response.user);
                setLoading(false);
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmit, formErrors]);

    const handleSubmit = () => {
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleClear = () => {
        setFormValues({
            ...formValues,
            username: '',
        });
        inputUserRef.current.focus();
    };

    const closeModal = () => {
        setShowForgotPassword(false);
    };

    const openModal = () => {
        setShowForgotPassword(true);
    };

    const handleFindCode = (e) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-left')}>
                <LogoIcon />

                <h3 className={cx('login-left__heading')}>
                    <span>Enjoy the world's largest cryptocurrency exchange at your fingertips.</span>
                </h3>
                <img src={images.logoRobot} alt="logo" />
            </div>
            <div className={cx('login-right')}>
                <div className={cx('login-right__language')}>
                    <FontAwesomeIcon icon={faCaretDown} />
                    <span>Language</span>
                </div>
                <div className={cx('login-right__header')}>
                    <h3>TI Access</h3>
                    <span>Please fill your detail to access your account.</span>
                </div>
                <div className={cx('login-right__form-login')}>
                    {loading && <Spin></Spin>}
                    <div className={cx('login-right__form-login__form-control')}>
                        <label className={cx('test')}>Username</label>
                        <input
                            ref={inputUserRef}
                            type="text"
                            name="username"
                            onChange={handleChange}
                            value={formValues.username}
                            placeholder="Eg. Abagnale"
                        />
                        <FontAwesomeIcon icon={faCircleXmark} onClick={handleClear} className={cx('active-value')} />
                        <p className={cx('error-message')}>{formErrors.username}</p>
                    </div>
                    <div className={cx('login-right__form-login__form-control')}>
                        <label>Password</label>
                        <input
                            type={isShowPassword ? 'password' : 'text'}
                            value={formValues.password}
                            placeholder="Enter the password"
                            onChange={handleChange}
                            name="password"
                        />
                        {isShowPassword ? (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                onClick={() => toggleShowPassword()}
                                className={cx('active-value')}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEye}
                                onClick={() => toggleShowPassword()}
                                className={cx('active-value')}
                            />
                        )}
                        <p className={cx('error-message')}>{formErrors.password}</p>
                    </div>
                    <span className={cx('login-right__form-login__forgot-password')} onClick={openModal}>
                        Forgot your password?
                    </span>

                    {
                        <Modal isOpen={showForgotPassword} onRequestClose={closeModal}>
                            <div className={cx('modal-forgot-password')}>
                                <h3 className={cx('modal-heading')}>Forgot password</h3>
                                <span className={cx('modal-title')}>Please enter your email to find your account</span>
                                <form onSubmit={handleFindCode}>
                                    <div className={cx('modal-body')}>
                                        <label>Email</label>
                                        <input />
                                    </div>
                                    <div className={cx('modal-submit')}>
                                        <Button text primary small>
                                            Find
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    }

                    <div className={cx('login-right__form-login__submit')}>
                        <button onClick={handleSubmit}>Sign In</button>
                    </div>
                    <span className={cx('login-right__form-login__already-account')}>
                        Don't have an account? <Link to="/sign-up">Sign up</Link>
                    </span>
                    <Button
                        primary
                        onClick={async () => {
                            const res = await authService.getUserList();
                            console.log({data: res.datas });
                        }}
                    >
                        Test2
                    </Button>
                    <Button
                        primary
                        onClick={async () => {
                            fetch('http://localhost:4000/admin/user/list').then(res => res.json()).then(res => console.log(res))
                        }}
                    >
                        Test2
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
