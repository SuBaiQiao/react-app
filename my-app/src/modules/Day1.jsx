import MyButton from "./MyButton";
import MyForm from "./MyForm";
import '../style/index.css'
import _ from 'lodash'
import {useState, useRef, useEffect} from "react";
import classNames from "classnames";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import axios from "axios";

const list = [
    { id: 1001, name: 'Vue' },
    { id: 1002, name: 'React' },
    { id: 1003, name: 'Angular' }
]

const tabs = [
    { type: 'hot', label: '最热' },
    { type: 'now', label: '最新' }
]

let isLogin = false;

const articleType = 0

function getArticleTemp() {
    if (articleType === 0) {
        return (
            <div>
                无图模式
            </div>
        )
    } else if (articleType === 1) {
        return (
            <div>
                单图模式
            </div>
        )
    } else {
        return (
            <div>
                三图模式
            </div>
        )
    }
}

const style = {
    color: 'red'
}

const useGetList = () => {
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        async function getList() {
            // axios请求数据
            const res= await axios.get('http://localhost:3004/list')
            setCommentList(res.data)
        }
        getList()
    }, [])
    return {
        commentList,
        setCommentList
    }
}

function Item({ item, onHandleDelete }) {
    return (
        <div className="common" key={item.id}>
            <div>用户：{item.user.username}</div>
            <div>内容：{item.content}</div>
            <div>发表时间：{item.ctime}</div>
            <div>点赞：{item.like} &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => onHandleDelete(item.id)}>删除</button></div>
        </div>
    )
}

function Day1() {
    // const [commentList, setCommentList] = useState([
    //     {
    //         id: 1,
    //         user: {
    //             username: '张三',
    //             uid: 1
    //         },
    //         content: '哎哟，不错哦',
    //         ctime: '2024-05-15 10:00:12',
    //         like: 12
    //     },
    //     {
    //         id: 2,
    //         user: {
    //             username: '李四',
    //             uid: 2
    //         },
    //         content: '哈哈哈哈哈哈哈哈',
    //         ctime: '2024-05-11 12:00:12',
    //         like: 80
    //     },
    //     {
    //         id: 3,
    //         user: {
    //             username: '王五',
    //             uid: 3
    //         },
    //         content: '我勒个豆',
    //         ctime: '2024-05-16 09:10:12',
    //         like: 190
    //     }
    // ]);
    const {commentList, setCommentList} = useGetList();
    const [type, setType] = useState('hot');

    const handleTabChange = (type) => {
        setType(type);
        if (type === 'hot') {
            setCommentList(_.orderBy(commentList, 'like', 'desc'))
        } else {
            setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
        }
    }

    // 发表评论
    const [content, setContent] = useState('');
    const contentRef = useRef(null)

    const pushComment = () => {
        const comment = {
            id: uuidv4(),
            user: {
                username: 'me',
                uid: 4
            },
            content: content,
            ctime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            like: 0
        }
        setCommentList([...commentList, comment])
        setContent('')
        contentRef.current.focus();
    }

    const onHandleDelete = (id) => {
        setCommentList(commentList.filter(e => e.id !== id))
    }

    return (
        <div className="App">
            this is APP
            <ul>
                { list.map(item => <li key={ item.id }>{ item.name }</li>) }
            </ul>
            { isLogin && <div>Jack</div> }
            { isLogin ? <div>Jack</div> : <div>请登录...</div> }
            <button onClick={ () => isLogin = !isLogin }>状态取反</button>
            { getArticleTemp() }
            <MyButton></MyButton>
            <MyForm></MyForm>
            <div style={{ color: 'red' }}>this is div</div>
            <div className="foo">this is div</div>
            <div style={style}>this is div</div>
            <div>
                <input type="text" value={content} onChange={e => setContent(e.target.value)} ref={contentRef}/>
                <button onClick={pushComment}>发表评论</button>
            </div>
            <div className="common">
                {
                    tabs.map(tab =>
                        <span
                            key={tab.type}
                            className={classNames('nav-item', { active: type === tab.type })}
                            onClick={() => handleTabChange(tab.type)}
                        >{ tab.label }</span>
                    )
                }
                <div>评论区</div>
                { commentList.map(item => <Item item={item} onHandleDelete={onHandleDelete}></Item>) }
            </div>
        </div>
    );
}

export default Day1;
