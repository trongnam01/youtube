import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DefaultLauout from './layouts/DefaultLayout';

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
                            </DefaultLauout>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
