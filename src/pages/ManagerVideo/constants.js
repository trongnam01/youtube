/* eslint-disable no-sparse-arrays */

export const CLEAR = 'app/AppNodeList/CLEAR';

export const columnConfig = [
    {
        name: 'STT',
        field: 'stt',
        width: '60px',
        align: 'center',
    },
    {
        name: 'Ảnh video',
        field: 'image',
        width: '120px',
        align: 'center',
        ellipsis: true,
    },
    {
        name: 'Tên',
        field: 'title',
        isSort: true,
        width: '250px',
        align: 'left',
        ellipsis: true,
    },
    {
        name: 'Kênh',
        field: 'userChannel',
        isSort: true,
        width: '250px',
        align: 'left',
        ellipsis: true,
    },

    {
        name: 'Thao tác',
        field: 'actions',
        align: 'center',
    },
];

export const ItemFormCreateVideo = [
    {
        field: 'idName',
        label: 'id Kênh (text)',
        disabled: true,
        type: 'input',
    },
    {
        field: 'coverImage',
        label: 'ảnh bìa',
        type: 'input',
    },
    {
        field: 'channeImage',
        label: 'ảnh kênh',
        disabled: true,
        type: 'input',
    },
    {
        field: 'video',
        label: 'ID video youtube',
        disabled: true,
        type: 'input',
    },
    {
        field: 'title',
        label: 'Tên video',
        type: 'input',
    },
    {
        field: 'videoTime',
        label: 'Thời gian video',
        type: 'input',
    },
    {
        field: 'image',
        label: 'ảnh video',
        type: 'input',
    },
    {
        field: 'userChannel',
        disabled: true,
        label: 'tên kênh',
        type: 'input',
    },
    {
        field: 'IduserChannel',
        label: 'id kênh (số) "IduserChannel"',
        disabled: true,
        type: 'input',
    },
    {
        field: 'videoPostingData',
        label: 'Ngày đăng',
        type: 'date',
    },
    {
        field: 'like',
        label: 'like',
        type: 'input',
    },
    ,
    {
        field: 'view',
        label: 'lượt theo giỏi kênh',
        type: 'input',
    },
];
