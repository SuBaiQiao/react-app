import {Outlet} from "react-router-dom";
import { Button } from 'antd-mobile'
const Layout = () => {
    return (
        <div>
            我是layout
            <Outlet/>
            {/*测试全局生效样式*/}
            <Button color="primary">测试全局</Button>
            <div className="purple-theme">
                <Button color="primary">测试局部</Button>
            </div>
        </div>
    )
}

export default Layout;