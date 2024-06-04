import {Link, useNavigate} from "react-router-dom";

function Index() {
    const navigate = useNavigate()
    const to = () => {
        navigate('/article')
    }

    return (
        <div>
            我是登陆页面
            <Link to='/article'>跳转文章</Link>
            <button onClick={() => navigate('/article?id=1001&name=jack')}>searchParams传参数</button>
            <button onClick={() => navigate('/article/1001/jack')}>params传参数</button>
            <div>
                <input type="text"/>
            </div>
            <div>
                <input type="password"/>
            </div>
            <button onClick={() => to()}>登陆</button>
        </div>
    )
}

export default Index
