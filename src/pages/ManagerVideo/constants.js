/* eslint-disable no-sparse-arrays */
/*
 *
 * AppNodeList constants
 *
 */

export const CLEANUP = 'app/AppNodeList/CLEANUP';

export const GET_LIST = 'app/AppNodeList/GET_LIST';
export const GET_LISTAGENTS = 'app/AppNodeList/GET_AGENTS';

export const GET_LIST_SUCCESS = 'app/AppNodeList/GET_LIST_SUCCESS';
export const GET_LIST_FAILED = 'app/AppNodeList/GET_LIST_FAILED';

export const REMOVE = 'app/AppNodeList/REMOVE';
export const REMOVE_SUCCESS = 'app/AppNodeList/REMOVE_SUCCESS';
export const REMOVE_FAILED = 'app/AppNodeList/REMOVE_FAILED';

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
        name: 'Actions',
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
