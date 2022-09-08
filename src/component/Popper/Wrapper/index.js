import classNames from 'classnames/bind';
import styles from './Wrapper.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, onClick, className }) {
    return (
        <div className={cx('wrapper', className)} onClick={onClick}>
            {children}
        </div>
    );
}

export default Wrapper;
