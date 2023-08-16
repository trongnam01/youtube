import { forwardRef, useRef, useState } from 'react';
import images from '~/assets/images';

import classNames from 'classnames';
import style from './Image.module.scss';

let Image = forwardRef(({ src, alt, className, fallback: customfallback = images.noImage, ...prop }, ref) => {
    const urlRef = useRef(src || null);
    const [disable, setDisable] = useState(false);
    // customfallback nhận từ prop chuyền vào có fallback thì nhận src ko thì lấy noimg
    const handleOnErr = () => {
        urlRef.current = customfallback;

        setDisable(true);
    };

    return (
        <>
            {disable && (
                <img
                    className={classNames(style.wrapper, className)}
                    ref={ref}
                    alt={alt}
                    onError={handleOnErr}
                    {...prop}
                    src={urlRef.current}
                />
            )}
            {!disable && (
                <img
                    className={classNames(style.wrapper, className)}
                    ref={ref}
                    alt={alt}
                    onError={handleOnErr}
                    {...prop}
                    src={urlRef.current}
                />
            )}
        </>
    );
});

export default Image;
