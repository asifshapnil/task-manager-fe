import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNotifications } from "../../store/notification.slice";
import { ListGroup } from "react-bootstrap";
import moment from "moment";
import './notification.scss';

const NotificationComponent = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state: any) => state.notification.notifications);

    useEffect(() => {
        if (notifications.length) return;
        dispatch(getNotifications());
    }, [])

    return <>
        <div>
            <ListGroup>
                {notifications.map((item: any) => (
                    <ListGroup.Item>
                        {item.title} is going to expire soon on
                        <span className="ms-2">
                            {moment(item.expirydate).format("DD-MM-YYYY ")}
                        </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    </>
}

export default NotificationComponent;