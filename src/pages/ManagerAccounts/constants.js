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
        name: 'Tài khoản',
        field: 'name',
        isSort: true,
        width: '250px',
        align: 'left',
        ellipsis: true,
        flex: 1,
    },
    {
        name: 'Email',
        field: 'email',
        isSort: true,
        width: '250px',
        align: 'left',
        ellipsis: true,
    },
    {
        name: 'Quyền quản lý ',
        field: 'admin',
        isSort: true,
        width: '200px',
        align: 'center',
        ellipsis: true,
    },
    {
        name: 'Thao tác',
        field: 'actions',
        align: 'center',
        width: '100px',
    },
];
