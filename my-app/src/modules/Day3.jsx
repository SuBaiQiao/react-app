import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addToNumber } from '../store/modules/counterStore'
import { useEffect } from "react";
import { fetchChannelList } from "../store/modules/channelStore";

function Day3() {
    const { count } = useSelector(state => state.counter)
    const { list } = useSelector(state => state.channel)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChannelList())
    }, [dispatch])

    return (
        <div>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(addToNumber(-10))}>-10</button>
            {count}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addToNumber(10))}>+10</button>
            {list.map(e => <div key={e.id}>{e.id}</div>)}
        </div>
    )
}

export default Day3;
