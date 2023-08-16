import { useContext, useState, forwardRef, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import { Modal, Input, message } from 'antd';

import MenuHeader from '@tippyjs/react/headless';
import styles from './ManagerUser.module.scss';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import ManagerItem from './ManagerItem';
import { RightLineIcon } from '~/Icons';
import { ThemDefau } from '~/layouts/DefaultLayout';
import Image from '../Image';
import firebase from 'firebase/compat/app';
import { useDispatch } from 'react-redux';
import { removeAll } from '~/redux/userSplice';
const cx = classNames.bind(styles);

function ManagerUser(props, ref) {
    const navigate = useNavigate();

    const them = useContext(ThemDefau);
    const { items, currentUser, handleCurrentUser, locotion } = them;
    const [menuItems, setMenuItems] = useState([{ data: items }]);
    const [menuTitle, setMenuTitle] = useState('');
    const [modal, contextHolder] = Modal.useModal();
    const [messageApi, contextHolders] = message.useMessage();
    const valueManager = useRef();
    const dispatch = useDispatch();
    const current = menuItems[menuItems.length - 1];

    // THAY ĐỔI MENU
    useEffect(() => {
        setMenuItems([{ data: items }]);
    }, [items]);

    const handleClick = (item) => () => {
        const { isClick, type, to } = item;
        const isParent = !!item.children;
        const out = !!item.out;
        if (isParent) {
            setMenuTitle(item.headerTitle);
            setMenuItems((prev) => [...prev, item.children]);
        }
        if (out) {
            dispatch(removeAll(1));
            firebase.auth().signOut();
            window.localStorage.removeItem('Authorization');
            window.localStorage.removeItem('id');
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('idFirebase');
            handleCurrentUser();
            navigate(`/`);
        }
        if (isClick) {
            if (type === 'KENH_CUA_BAN') {
                navigate(`/@namtt/Yourchannel`);

                return;
            }

            if (to === '/quanTriVideo') {
                if (locotion.pathname === to) {
                    return;
                }
                handleCreateVerification(to);
                return;
            }

            navigate(to); // chuyển trang

            // console.log(item, 'itemClick');
        }
    };
    const handleGetDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Tháng được đánh số từ 0 đến 11, cần cộng 1 để lấy tháng hiện tại
        const year = currentDate.getFullYear();

        return `${day}${month}${year}`;
    };
    // xác minh thông tin có được cấp quyền
    const handleCreateVerification = (to) => {
        valueManager.current = '';

        modal.confirm({
            title: 'Xác minh tài khoản',
            onOk: () => {
                if (valueManager.current === handleGetDate()) {
                    navigate(to);
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Mã xác minh không đúng',
                    });
                }
            },
            cancelText: 'HUỶ',
            okText: 'XÁC MINH',
            // icon: <CloseCircleOutlined style={{ color: 'red' }} />,
            // okButtonProps: {
            //     // Tùy chỉnh kiểu dáng cho nút "Không đồng ý"
            //     style: { backgroundColor: 'red', color: 'white', borderColor: 'red' },
            // },
            content: (
                <>
                    <div>
                        <label>Nhập mã xác minh được cấp</label>
                        <Input
                            onChange={(e) => {
                                valueManager.current = e.target.value;
                            }}
                        />
                    </div>
                </>
            ),
        });
    };

    function renderItems() {
        if (menuItems.length === 1) {
            return current.data.map((items, indexs) => {
                return (
                    <div key={indexs} className={cx('Wrapper-menu')}>
                        {items.map((item, index) => {
                            return (
                                <ManagerItem
                                    key={index}
                                    item={item}
                                    onClick={handleClick(item)}
                                    currentUser={currentUser}
                                />
                            );
                        })}
                    </div>
                );
            });
        } else {
            return current.data.map((item, index) => {
                return <ManagerItem key={index} item={item} className={cx('item-btn')} />;
            });
        }
    }
    function handleResetMenu() {
        setMenuItems((prev) => prev.slice(0, 1));
    }
    let classes = cx({ isclass: menuItems.length > 1, isWrapper: !currentUser && menuItems.length === 1 });
    return (
        <div>
            {contextHolder}
            {contextHolders}
            <MenuHeader
                trigger="click"
                interactive
                placement="left"
                render={(attrs) => (
                    <div className={cx('MenuSettng')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {menuItems.length === 1 ? (
                                currentUser && (
                                    <div className={cx('header-menu')}>
                                        <button className={cx('user-avatar')} style={{ width: '40px', height: '40px' }}>
                                            {props.secletor.image && (
                                                <Image
                                                    src={props.secletor.image}
                                                    alt="avatar"
                                                    className={cx('avatar')}
                                                />
                                            )}
                                            {!props.secletor.image && <Image alt="avatar" className={cx('avatar')} />}
                                        </button>
                                        <div>
                                            <span>{props.secletor.name}</span>
                                            <Link to="/user">Quản lý Tài khoản Google của bạn</Link>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className={cx('header-title-menu')}>
                                    <span
                                        className={cx('back-icon')}
                                        onClick={() => setMenuItems((prev) => prev.slice(0, prev.length - 1))}
                                    >
                                        <RightLineIcon />
                                    </span>
                                    <span className={cx('title-item')}>{menuTitle}</span>
                                </div>
                            )}
                            <div className={cx('wrapper-content', classes)}>{renderItems()}</div>
                        </PopperWrapper>
                    </div>
                )}
                // zIndex="999999"
                onHide={handleResetMenu}
            >
                {props.children}
            </MenuHeader>
        </div>
    );
}

export default forwardRef(ManagerUser);
