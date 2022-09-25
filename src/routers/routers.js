import Home from '~/pages/Home';
import PlayVideo from '~/pages/PlayVideo/PlayVideo';

export const publicRouters = [
    { path: '/', component: Home },
    { path: '/new', component: PlayVideo },
    { path: '/watch/@:name', component: PlayVideo },
];
