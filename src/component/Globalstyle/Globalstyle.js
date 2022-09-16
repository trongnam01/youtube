import './Globalstyle.scss';
import $ from 'jquery';
window.onload = function () {
    // let iframe = document.querySelectorAll('iframe');
    // const Link = document.createElement('Link');
    // Link.href = './Globalstyle.scss';
    // Link.rel = 'stylesheet';
    // Link.type = 'text/css';
    // iframe.forEach((el) => {
    //     console.log(iframe);
    //     console.log(el.document.querySelector('html'));
    //     el.document.head.appendChild(Link);
    // });
};
$(document).ready(() => {
    let $iframe = $('iframe').contents().find('head');

    $iframe.append(
        $('<link/>', {
            rel: 'stylesheet',
            href: './Globalstyle.scss',
            type: 'text/css',
        }),
    );
    // console.log(iframe.eq(0).contents().find('head'));
});

function Globalstyle({ children }) {
    return <>{children}</>;
}

export default Globalstyle;
