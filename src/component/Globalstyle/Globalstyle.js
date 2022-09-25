import './Globalstyle.scss';
// import $ from 'jquery';
// window.onload = function () {
//     // console.log(2);
//     // let iframe = document.querySelectorAll('iframe');
//     // const Link = document.createElement('Link');
//     // Link.href = './Globalstyle.scss';
//     // Link.rel = 'stylesheet';
//     // Link.type = 'text/css';
//     // console.log(iframe);
//     // iframe.onload = (e) => {
//     //     console.log(1);
//     //     console.log(e);
//     // };
// };
// $(document).ready(() => {
//     // let iframe = $('iframe document');
//     // .contents()
//     // .find('head')
//     // .append(
//     //     $('<link/>', {
//     //         rel: 'stylesheet',
//     //         href: './Globalstyle.scss',
//     //         type: 'text/css',
//     //     }),
//     // );
//     // console.log(iframe);
// });

function Globalstyle({ children }) {
    return <>{children}</>;
}

export default Globalstyle;
