import { useRoutes } from "react-router-dom";
import routes from "./router/routers";

const App = () => {
    const content = useRoutes(routes);

    return (
        <>
            <div className="app">
                <div className="container">
                    <h2 className="text-center">Quiz Maker</h2>
                    {content}
                </div>
            </div>
        </>
    );
}

export default App;
