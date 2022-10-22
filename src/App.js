import 'firebase/compat/auth';
import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLauout from './layouts/DefaultLayout';
import { publicRouters } from './routers';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRouters.map((router, index) => {
                        const Pages = router.component;

                        let Layout = DefaultLauout;

                        if (router.layout) {
                            Layout = router.layout;
                        }
                        if (router.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={router.path}
                                element={
                                    <Layout>
                                        <Pages />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
