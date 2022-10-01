import Home from '~/pages/Home';
import New from '~/pages/New';
import PlayVideo from '~/pages/PlayVideo/PlayVideo';
import UserChannel from '~/pages/UserChannel';

export const publicRouters = [
    { path: '/', component: Home },
    { path: '/new', component: New },
    { path: '/watch/@:name', component: PlayVideo },
    { path: '/channel/@:channel', component: UserChannel },
];
