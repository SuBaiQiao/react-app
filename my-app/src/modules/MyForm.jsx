import {useState} from "react";

function MyForm () {
    const [form, setForm] = useState({
        id: 1,
        name: 'Jack'
    });
    const handleChangeName = () => {
        setForm({
            ...form,
            name: 'John'
        })
    }
    return (
        <div>
            <div>{ form.id }</div>
            <div>{ form.name }</div>
            <button onClick={ handleChangeName }>修改form</button>
        </div>
    )
}

export default MyForm
