import classNames from 'classnames/bind';
import { FeedbackIcon, HelpIcon, ReportIcon, SettingIcon } from '~/Icons';
import { renderItem } from '../Entertainment/Entertainment';

import styles from './SupportSideBar.module.scss';

const cx = classNames.bind(styles);

const itemSupport = [
    {
        icon: <SettingIcon />,
        iconActive: <SettingIcon />,
        title: 'Cài đặt',
        to: '/setting',
    },
    {
        icon: <ReportIcon />,
        iconActive: <ReportIcon />,
        title: 'Nhật ký báo cáo',
        to: '/setting',
    },
    {
        icon: <HelpIcon />,
        iconActive: <HelpIcon />,
        title: 'Trợ Giúp',
        to: '/help',
    },
    {
        icon: <FeedbackIcon />,
        iconActive: <FeedbackIcon />,
        title: 'Gửi phản hồi',
        to: '/setting',
    },
];

function SupportSideBar() {
    return <div className={cx('wrapper')}>{renderItem(itemSupport)}</div>;
}

export default SupportSideBar;
