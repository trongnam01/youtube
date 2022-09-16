import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
