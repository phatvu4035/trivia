import Quiz from "../Pages/Quiz";
import Result from "../Pages/Result";

const routes = [
    {
        path: '/',
        element: <Quiz />
      },
      {
        path: '/result',
        element: <Result />
      }
];

export default routes;
