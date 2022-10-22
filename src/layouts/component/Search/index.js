import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import SearchTippy from '@tippyjs/react/headless';
import { ThemDefau } from '~/layouts/DefaultLayout';

import { ClearIcon, SearchIcon } from '~/Icons';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import ItemResultSearch from '~/component/ItemResultSearch';

const cx = classNames.bind(styles);

function Search() {
    const [valueSearch, setValueSearch] = useState('');
    const [datas, setDatas] = useState([]);
    const [ItemsSearch, setItemsSearch] = useState([]);
    const [isresult, setIsResult] = useState(true);
    const Them = useContext(ThemDefau);
    useEffect(() => {
        setDatas(Them.DataApi);
    }, [Them.DataApi]);

    useEffect(() => {
        if (valueSearch.trim().length > 0) {
            const valueInput = valueSearch.toLowerCase().replace(/ /g, '');
            const result = datas.filter((item) => {
                return item.title.toLowerCase().replace(/ /g, '').includes(valueInput);
            });
            setItemsSearch(result);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueSearch, datas]);
    const handleHideResult = () => {
        setIsResult(false);
    };
    const handleFocusInput = () => {
        setIsResult(true);
    };
    const handleClickWrapper = () => {
        setIsResult(false);
    };
    const handleaClickItemSearch = () => {
        setValueSearch('');
        Them.setResultSearch(ItemsSearch);
        window.localStorage.setItem('resultSearch', JSON.stringify(ItemsSearch));
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
                        <PopperWrapper className={cx('wrapper-search')} onClick={handleClickWrapper}>
                            {ItemsSearch.slice(0, 6).map((item) => (
                                <ItemResultSearch
                                    key={item.id}
                                    data={item}
                                    value={valueSearch.toLowerCase().replace(/ /g, '')}
                                    handleaClickItemSearch={handleaClickItemSearch}
                                />
                            ))}
                            {ItemsSearch.length === 0 && (
                                <span className={cx('notification')}> Không có kết quả tìm kiếm</span>
                            )}
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
                            onChange={(e) => {
                                const result = e.target.value;
                                // if (!result.startsWith(' ')) {
                                // }
                                setValueSearch(result);
                            }}
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
