// import {useSearchParams} from "react-router-dom";
import {useParams} from "react-router-dom";

function Index() {
    // const [params] = useSearchParams()
    // const id = params.get('id');
    // const name = params.get('name');
    const params = useParams()
    const id = params.id;
    const name = params.name;
    return (
        <div>
            我是文章页面{id} - {name}
        </div>
    )
}

export default Index
