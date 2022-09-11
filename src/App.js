import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DefaultLauout from './layouts/DefaultLayout';
import Home from './pages';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <DefaultLauout>
                                <Home />
                                aaaa
                            </DefaultLauout>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
