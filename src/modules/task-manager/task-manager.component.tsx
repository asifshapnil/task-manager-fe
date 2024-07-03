import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/category.slice";
import './task-manager.scss';

const TaskManagerComponent = () => {
    const dispatch = useDispatch();
    const formRef = createRef();
    const categories = useSelector((state: any) => state.categories.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        console.log(categories);
    }, [categories])

    return <>
        <div className="category-wrapper">
            {categories?.map((cat: any) => (
                <div className="categorybox">
                    <div className="cat-title">{cat.name}</div>

                    {cat.tickets.length ? <>
                        {cat.tickets.map((ticket: any) => (
                            <div className="ticket-card">
                                <div>
                                    {ticket.title}
                                </div>
                                <div className={`${ticket.priority === 'high' ? 'high' : ticket.priority === 'medium' ? 'medium' : 'low'} mt-2`}>
                                    Priority:
                                    <span className="ms-2">
                                        {ticket.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </> : null}
                </div>
            ))}
        </div>
    </>
}

export default TaskManagerComponent