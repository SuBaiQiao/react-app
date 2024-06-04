import Login from '../page/Login'
import Article from '../page/Article'
// import App from '../App';
import { createBrowserRouter } from "react-router-dom";
// hash模式
// import { createHashRouter } from "react-router-dom";
import Layout from "../page/Layout";
import About from "../page/About";
import Board from "../page/Board";
import NotFound from "../page/NotFound";

// 1.创建router实例对象并且配置路由对应关系
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            // 设置为默认二级路由，一级路由渲染的时候也进行渲染
            { index: true, element: <Board></Board> },
            { path: '/about', element: <About></About> }
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/article/:id/:name', // params传参数
        element: <Article></Article>
    },
    {
        path: '*', // 404兜底组件 一定在末尾
        element: <NotFound></NotFound>
    }
])

export default router
