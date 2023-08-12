/* eslint-disable no-sparse-arrays */
export const ItemFormCreateVideo = [
    [
        {
            field: 'idChannel',
            label: 'id Kênh (text)',
        },
        {
            field: 'coverImage',
            label: 'ảnh bìa',
        },
        {
            field: 'channeImage',
            label: 'ảnh kênh',
        },
    ],
    [
        {
            field: 'video',
            label: 'ID video youtube',
        },
        {
            field: 'title',
            label: 'Tên video',
        },
        {
            field: 'videoTime',
            label: 'Thời gian video',
        },
    ],
    [
        {
            field: 'image',
            label: 'ảnh video',
        },
        {
            field: 'userChannel',
            label: 'tên kênh',
        },
        {
            field: 'IduserChannel',
            label: 'id kênh (số) "IduserChannel"',
        },
    ],
    [
        {
            field: 'date',
            label: 'Ngày đăng',
        },
        {
            field: 'like',
            label: 'like',
        },
        ,
        {
            field: 'view',
            label: 'lượt theo giỏi kênh',
        },
    ],
];
const a = {
    monthCustomer: 1,
    monthIncome: 1,
    monthTransaction: 1,
    pastCustomer: 0,
    pastIncome: 0,
    pastTransaction: 0,
    totalIncome: 1,
    totalStaff: 0,
    totalTransaction: 1,
};
const salesData = [
    {
        field: 'monthCustomer',
        title: 'monthCustomer',
        color: 'primary',
        //   icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
    },
    {
        field: 'monthIncome',
        title: 'monthIncome',
        color: 'success',
        //   icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
        field: 'monthTransaction',
        color: 'warning',
        title: 'monthTransaction',
        //   icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
];

const loop = () => {
    const result = [];

    salesData.forEach((el) => {
        // const value = a[el.field]
        // result.push(Ơ)
    });
    return result;
};
