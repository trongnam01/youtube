import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Buttons.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, title, children, className, LeftIcon, RightIcon, onClick, ...passProps }) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    // check thẻ
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={cx('wrapper', className)} {...props}>
            {LeftIcon && <span className={cx('icon')}>{LeftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {RightIcon && <span className={cx('icon')}>{RightIcon}</span>}
        </Comp>
    );
}

export default Button;
