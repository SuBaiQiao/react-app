import { useState } from 'react'

function MyButton () {
    const [number, setNumber] = useState(0)
    function handleClick(e, value) {
        console.log('button被点击', e, value)
        setNumber(number + 1);
    }
    return (
        <div>
            <div>{ number }</div>
            <button onClick={(e) => handleClick(e, '参数')}>修改number按鈕</button>
        </div>
    )
}

export default MyButton;
