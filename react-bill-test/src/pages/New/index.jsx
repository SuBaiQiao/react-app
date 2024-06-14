import {Button, DatePicker, Input, NavBar} from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import {billListData} from '@/contants'
import {useNavigate} from 'react-router-dom'
import {useState} from "react";
import {addBillList} from "@/store/modules/billStore"
import dayjs from "dayjs";
import {useDispatch} from "react-redux";

const New = () => {
    const navigate = useNavigate()
    // 准备一个控制收入支出的状态
    const [billType, setBillType] = useState('pay'); // pay-指出,income-收入
    const [money, setMoney] = useState('')
    const [dateVisible, setDateVisible] = useState(false)
    const [billDate, setBillDate] = useState(new Date())
    const [useFor, setUseFor] = useState('')
    const dispatch = useDispatch();

    const save = () => {
        const dayBill = {
            type: billType,
            money: billType === 'pay' ? -1 * money : money,
            date: dayjs(billDate).format('YYYY-MM-DD HH:mm:ss'),
            useFor: useFor
        }
        dispatch(addBillList(dayBill))
        navigate(-1)
    }

    const onConfirm = (e) => {
        setBillDate(e)
        setDateVisible(false)
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' && 'selected')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billType === 'income' && 'selected')}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date" onClick={() => setDateVisible(true)}>
                            <Icon type="calendar" className="icon"/>
                            <span className="text">{ dayjs(billDate).format('YYYY-MM-DD') === dayjs(new Date()).format('YYYY-MM-DD') ? '今天' : dayjs(billDate).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                visible={dateVisible}
                                onClose={() => setDateVisible(false)}
                                onCancel={() => setDateVisible(false)}
                                onConfirm={(e) => onConfirm(e)}
                                max={new Date()}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={e => setMoney(e)}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type && 'selected'
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type}/>
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={() => save()}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New
