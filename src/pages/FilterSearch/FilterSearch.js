import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { ThemDefau } from '~/layouts/DefaultLayout';
import { Col, Row } from 'antd';
import CrardImage from '~/component/CardImage/CardImage';
import Buttons from '~/component/Buttons';
import { FilterIcon } from '~/Icons';
import styles from './FilterSearch.module.scss';

const cx = classNames.bind(styles);

function FilterSearch() {
    const Them = useContext(ThemDefau);
    const [data, setDatas] = useState([]);
    useEffect(() => {
        setDatas(JSON.parse(window.localStorage.getItem('resultSearch')));
    }, [Them.resultSearch]);
    return (
        <article className={cx('wrapper')}>
            <div className={cx('contents')}>
                <div className={cx('wrapper-btn-filter')}>
                    <Buttons className={cx('btn-filter')} LeftIcon={<FilterIcon />}>
                        BỘ LỌC
                    </Buttons>
                </div>
                <div className={cx('container-filter')}>
                    <Row>
                        {data.map((item, index) => {
                            return (
                                <Col key={index} span={24} className={cx('colums')}>
                                    <CrardImage
                                        item={item}
                                        imageUser={true}
                                        pageNew={true}
                                        classCustom={cx('fiter-search')}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </article>
    );
}

export default FilterSearch;
