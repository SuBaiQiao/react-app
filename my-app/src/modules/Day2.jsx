// 受控表单绑定
import {useState, useRef, useContext, createContext, useEffect} from 'react'
// 1.声明一个react状态 - useState

// 2.核心绑定流程
// 1.通过value属性绑定react状态
// 2.绑定onChange时间 通过参数e拿到输入框最新的值 反向修改到react状态

const MsgContext = createContext()

function SonA({ onGetAName }) {
    const name = 'this is A name'
    return (
        <div>
            this is SonA
            <button onClick={() => onGetAName(name)}>send</button>
        </div>
    )
}

function SonB({ children }) {
    const msg = useContext(MsgContext)
    return (
        <div>
            this is SonB {children}
            {msg}
        </div>
    )
}

function Son(props) {
    // props是一个对象，里面包含父组件中传递过来的所有数据
    const sonMsg = 'this is son msg'
    return (
        <div>
            <div>{props.children}</div>
            this is son，{props.name}，jsx {props.child}
            <button onClick={() => props.onSendParent(sonMsg)}>发送到父组件</button>
        </div>
    )
}

function Component() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('定时器执行中')
        }, 1000)
        return () => {
            console.log('定时器销毁')
            clearInterval(timer)
        }
    }, [])
    return (
        <div>我是组件内容</div>
    )
}

function useToggle() {
    const [value, setValue] = useState(true)
    const toggle = () => {
        setValue(!value)
    }
    return { value, toggle }
}

function Day2() {
    const [value, setValue] = useState('')
    const inputRef = useRef(null)
    const [sonMsg, setSonMsg] = useState('')
    const showDom = () => {
        console.log(inputRef.current)
    }
    const name = 'this is app name'
    const getChildren = (data) => {
        console.log(data)
        setSonMsg(data)
    }

    const [aName, setAName] = useState('')
    const getAName = (name) => {
        console.log(name)
        setAName(name)
    }

    const [list, setList] = useState([])
    useEffect(() => {
        // 额外的操作 获取数据
        async function getList() {
            const list = [
                { id: '1', name: 'A' },
                { id: '2', name: 'B' },
                { id: '3', name: 'C' },
                { id: '4', name: 'D' },
                { id: '5', name: 'E' },
                { id: '6', name: 'F' },
                { id: '7', name: 'G' }
            ]
            setList(list)
        }
        getList();
    }, [])

    const [show, setShow] = useState(true)

    const { value: valueHook, toggle } = useToggle()
    return (
        <div>
            <input type="text"
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
                   ref={inputRef}
            />
            <button onClick={(e) => showDom()}>获取DOM元素</button>
            <Son name={name}
                 age={18}
                 isTrue={true}
                 list={['vue', 'react']}
                 obj={{name: '张三'}}
                 cb={() => console.log('123')}
                 child={<span>我是jsx</span>}
                 onSendParent={getChildren}>
                <span>我是Son组件{ sonMsg }</span>
            </Son>
            <SonA onGetAName={getAName}></SonA>
            <SonB>{ aName }</SonB>
            <MsgContext.Provider value={name}>
                this is App
                <SonA onGetAName={getAName}></SonA>
            </MsgContext.Provider>
            <div>
                <ul>
                    {list.map(e => <li key={e.id}>{e.name}</li>)}
                </ul>
            </div>
            <div>
                {show && <Component></Component>}
                <button onClick={() => setShow(!show)}>销毁Component组件</button>
            </div>
            <div>
                自定义Hook
                <div>
                    {valueHook && <div>this is div</div>}
                    <button onClick={toggle}>toggle</button>
                </div>
            </div>
        </div>
    )
}

export default Day2
