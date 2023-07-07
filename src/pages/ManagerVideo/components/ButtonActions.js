import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';

function ButtonAcitions(props) {
    const { children, handleClick, className, title, mouseEnterDelay = 0 } = props;

    return (
        <div className={`${className}`}>
            <Tooltip mouseEnterDelay={mouseEnterDelay} placement="topLeft" title={title}>
                <button type="button" className={className} onClick={handleClick}>
                    {children}
                </button>
            </Tooltip>
        </div>
    );
}

ButtonAcitions.propTypes = {
    children: PropTypes.element.isRequired,
    handleClick: PropTypes.func,
    className: PropTypes.string,
    title: PropTypes.string,
};
export default ButtonAcitions;
