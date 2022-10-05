import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import ItemResultSearch from '~/component/ItemResultSearch';
import { RightLineIcon, SearchIcon, VoiceIcon } from '~/Icons';
import styles from './SearchMobile.module.scss';
const cx = classNames.bind(styles);

function SearchMobile({ handleShowSearchMobi }) {
    const refInput = useRef();
    const [resultSearch, setResultSearch] = useState([
        { id: 1, title: 'kkkkk', isSuccess: false },
        { id: 2, title: 'kkkkk', isSuccess: false },
        { id: 3, title: 'kkkkk', isSuccess: false },
        { id: 4, title: 'kkkkk', isSuccess: false },
    ]);
    useEffect(() => {
        refInput.current.focus();
    }, []);
    function handleClick(e) {
        e.stopPropagation();
    }

    return (
        <div className={cx('wrapper')} onClick={handleShowSearchMobi}>
            <div className={cx('header-mobile')} onClick={handleClick}>
                <button className={cx('btn-back')} onClick={handleShowSearchMobi}>
                    <RightLineIcon />
                </button>
                <div className={cx('contai-input')}>
                    <input ref={refInput} placeholder="Tìm Kiếm Trên Youtube" />
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
                {resultSearch.map((item) => (
                    <ItemResultSearch className={cx('custom-item-search')} show={false} key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}

export default SearchMobile;
