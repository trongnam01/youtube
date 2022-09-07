import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import SearchTippy from '@tippyjs/react/headless';

import { ClearIcon, SearchIcon } from '~/Icons';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import ItemResultSearch from '~/component/ItemResultSearch';

const cx = classNames.bind(styles);

function Search() {
    const [valueSearch, setValueSearch] = useState('');
    const [resultSearch, setResultSearch] = useState([]);
    const [isresult, setIsResult] = useState(true);

    useEffect(() => {
        setResultSearch([
            { id: 1, title: 'kkkkk', isSuccess: false },
            { id: 2, title: 'kkkkk', isSuccess: false },
            { id: 3, title: 'kkkkk', isSuccess: false },
            { id: 4, title: 'kkkkk', isSuccess: false },
            { id: 5, title: 'kkkkk', isSuccess: false },
            { id: 6, title: 'kkkkk', isSuccess: false },
            { id: 7, title: 'kkkkk', isSuccess: false },
            { id: 8, title: 'kkkkk', isSuccess: false },
        ]);
    }, []);

    const handleHideResult = () => {
        setIsResult(false);
    };
    const handleFocusInput = () => {
        setIsResult(true);
        setValueSearch('1');
    };
    const handleClickWrapper = () => {
        setIsResult(false);
    };

    return (
        <div>
            <SearchTippy
                interactive
                visible={isresult && valueSearch.length > 0}
                // visible={true}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper onClick={handleClickWrapper}>
                            {resultSearch.map((item) => (
                                <ItemResultSearch key={item.id} data={item} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('wrapper-input')}>
                        <span className={cx('search-icon')} onMouseDown={(e) => e.preventDefault()}>
                            <SearchIcon />
                        </span>
                        <input
                            placeholder="Tìm Kiếm"
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                            onFocus={handleFocusInput}
                        />

                        <div className={cx('wrapper-input-right')}>
                            <span className={cx('keyboard')} onMouseDown={(e) => e.preventDefault()} />
                            {valueSearch.length > 0 && (
                                <span
                                    className={cx('clear')}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        setValueSearch('');
                                    }}
                                >
                                    <ClearIcon />
                                </span>
                            )}
                        </div>
                    </div>
                    <span className={cx('search-btn')}>
                        <SearchIcon height="2.4rem" width="2.4rem" />
                    </span>
                </div>
            </SearchTippy>
        </div>
    );
}

export default Search;
