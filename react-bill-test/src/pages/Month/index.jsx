import {NavBar, DatePicker} from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";
import DayBill from "@/pages/Month/components/DayBill";

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const billList = useSelector(state => state.bill.billList);

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'));
    }, [billList])

    const [currentMonthList, setCurrentMonthList] = useState([])

    const onConfirm = (e) => {
        setCurrentDate(e);
        setDateVisible(false);
        const formatDate = dayjs(e).format('YYYY-MM');
        setCurrentMonthList(monthGroup[formatDate])
    }

    const monthResult = useMemo(() => {
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0);
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0);
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList]);

    useEffect(() => {
        const formatDate = dayjs(new Date()).format('YYYY-MM');
        // 边界值控制
        if (monthGroup[formatDate]) {
            setCurrentMonthList(monthGroup[formatDate])
        }
    }, [monthGroup]);

    // 当前月按照日分组
    const dayGroup = useMemo(() => {
        const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'));
        const keys = _.sortBy(Object.keys(groupData));
        return {
            groupData,
            keys
        }
    }, [currentMonthList]);

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                          {dayjs(currentDate).format('YYYY')} | {dayjs(currentDate).format('M')}月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={(e) => onConfirm(e)}
                        onClose={() => setDateVisible(false)}
                        max={new Date()}
                    />
                </div>
                {
                    dayGroup.keys.map(key => (
                        <DayBill key={key} date={key} billList={dayGroup.groupData[key]}></DayBill>
                    ))
                }
            </div>
        </div>
    )
}

export default Month
