import {Outlet, useNavigate} from "react-router-dom";
import {TabBar} from 'antd-mobile'
import {useEffect} from "react";
import {getBillList} from "@/store/modules/billStore";
import {useDispatch} from "react-redux";
import './index.scss'
import {BillOutline, CalculatorOutline, AddCircleOutline} from 'antd-mobile-icons'


const tabs = [
    {
        key: '/month',
        title: '月度账单',
        icon: <BillOutline />
    },
    {
        key: '/new',
        title: '记账',
        icon: <CalculatorOutline/>
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <AddCircleOutline />
    }
]

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    const switchRouter = (path) => {
        navigate(path)
    }
    return (
        <div className="layout">
            <div className="container">
                <Outlet/>
            </div>
            <div className="footer">
                <TabBar onChange={switchRouter}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout;