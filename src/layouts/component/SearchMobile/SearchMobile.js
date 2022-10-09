import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import ItemResultSearch from '~/component/ItemResultSearch';
import { RightLineIcon, SearchIcon, VoiceIcon } from '~/Icons';
import { ThemDefau } from '~/layouts/DefaultLayout';
import styles from './SearchMobile.module.scss';
const cx = classNames.bind(styles);

function SearchMobile({ handleShowSearchMobi }) {
    const refInput = useRef();
    const Them = useContext(ThemDefau);
    const [valueSearch, setValueSearch] = useState('');
    const [datas, setDatas] = useState([]);

    const [itemsSearch, setItemsSearch] = useState([]);
    useEffect(() => {
        refInput.current.focus();
        setDatas(Them.DataApi);
    }, [Them.DataApi]);
    useEffect(() => {
        if (valueSearch.trim().length > 0) {
            const valueInput = valueSearch.toLowerCase().replace(/ /g, '');
            const result = datas.filter((item) => {
                return item.title.toLowerCase().replace(/ /g, '').includes(valueInput);
            });
            setItemsSearch(result);
        } else {
            setItemsSearch([]);
        }
    }, [valueSearch, datas]);
    function handleClick(e) {
        e.stopPropagation();
    }
    function handleaClickItemSearch() {
        setValueSearch('');
        handleShowSearchMobi();
    }

    return (
        <div className={cx('wrapper')} onClick={handleShowSearchMobi}>
            <div className={cx('header-mobile')} onClick={handleClick}>
                <button className={cx('btn-back')} onClick={handleShowSearchMobi}>
                    <RightLineIcon />
                </button>
                <div className={cx('contai-input')}>
                    <input
                        ref={refInput}
                        placeholder="Tìm Kiếm Trên Youtube"
                        value={valueSearch}
                        onChange={(e) => {
                            setValueSearch(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <button className={cx('btn-search')}>
                        <SearchIcon width="2.4rem" height="2.4rem" />
                    </button>
                    <button className={cx('btn-voice')}>
                        <VoiceIcon />
                    </button>
                </div>
            </div>
            <div className={cx('result-search')} onClick={handleClick}>
                {itemsSearch.slice(0, 6).map((item) => (
                    <ItemResultSearch
                        className={cx('custom-item-search')}
                        show={false}
                        key={item.id}
                        data={item}
                        handleaClickItemSearch={handleaClickItemSearch}
                    />
                ))}
                {/* {itemsSearch.length === 0 && <span>Không có kết quả như đã tìm kiếm</span>} */}
            </div>
        </div>
    );
}

export default SearchMobile;
