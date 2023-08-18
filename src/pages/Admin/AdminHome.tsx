import { Link } from "react-router-dom";

export default () => {
    return (
        <>
        <div>
            <Link to="/admin/todo">Todo 편집</Link>
        </div>
        <div>
            <Link to="/admin/log">Log 편집</Link>
        </div>
        </>
    );
};