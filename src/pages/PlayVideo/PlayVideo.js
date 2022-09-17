import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import './PlayVideo.css';

import styles from './PlayVideo.module.scss';
import Video from './component/Video';
import CrardPlay from './component/CrardPlay';

const cx = classNames.bind(styles);

function PlayVideo() {
    return (
        <div className={cx('wrapper')}>
            <Row gutter={[24, 16]}>
                <Col span={16}>
                    <div className={cx('wrapper-left')}>
                        <div className={cx('wrapper-video')}>
                            <Video />
                            {/* <Video /> */}
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    <div className={cx('wrapper-right')}>
                        <CrardPlay />
                        <CrardPlay />
                        <CrardPlay />
                        <CrardPlay />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PlayVideo;
