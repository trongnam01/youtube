import classNames from 'classnames/bind';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            {children}
        </div>
    );
}

export default Wrapper;
