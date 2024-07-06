import { createRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getTicket, postTicket, setTicketDetail, updateTicket } from "../../store/ticket.slice";
import { getCategories } from "../../store/category.slice";
import { useSelector } from "react-redux";
import SkeletonComponent from "../../shared/skeleton/skeleton.component";
import moment from "moment";
import DOMPurify from 'dompurify';
import './ticket.scss';
import { Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft, faBackward, faCircleArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "../../core/auth.service";
import { postTickethistory } from "../../store/tickethistory.slice";

const TicketComponent = forwardRef(({
    reference,
    selectedCategoryId,
    selectedTicket,
    isTicketEditModeEnabled,
    setIsTicketEditModeEnabled,
    handleCloaseModal }: any) => {

    const dispatch = useDispatch();
    const formRef = createRef();
    const [sanitizedHTML, setsanitizedHTML] = useState(null as any);
    const ticketDetail = useSelector((state: any) => state.ticket.ticketDetail);
    const isLoadingTicket = useSelector((state: any) => state.ticket.isLoadingTicket);

    const [initialValues, setInitialValues] = useState<any>({
        title: "",
        description: "",
        priority: "",
        expirydate: "",
    });
    const formConfiguration: FormConfig = {
        controls: [
            {
                name: "title",
                label: "Title",
                placeholder: "",
                type: "text",
                required: true,
            },
            {
                name: "expirydate",
                label: "Expiry Date",
                placeholder: "",
                type: "date",
                required: true,
            },
            {
                name: "priority",
                label: "Priority",
                placeholder: "",
                type: "select",
                options: [
                    {
                        label: 'High',
                        value: 'high'
                    },
                    {
                        label: 'Medium',
                        value: 'medium'
                    },
                    {
                        label: 'Low',
                        value: 'low'
                    },
                ],
                required: true,
            },
            {
                name: "description",
                label: "Description",
                placeholder: "",
                type: "texteditor",
                required: true,
            }
        ]
    }

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        priority: yup.string().required('Priority is required'),
        expirydate: yup.string().required('Expiry date is required'),
        description: yup.string().required('Description is required'),
    });

    const onRefetchCategory = () => {
        dispatch(getCategories());
    }

    useImperativeHandle(reference, () => {
        return {
            onSubmit: () => {
                const form: any = formRef.current;

                if (form) {
                    form.handleSubmit();
                    const { title, priority, expirydate, description } = form.values;
                    if (!title || !priority || !expirydate || !description) return;
                    delete form.values.tickethistory;

                     
                    if (!selectedTicket) {
                        dispatch(postTicket({
                            ...form.values, category: {
                                id: selectedCategoryId
                            }
                        })).then((data: any) => {
                            console.log(data);
                            if(data) {
                                const tickethistoryData = {
                                    action: `added the ticket`,
                                    ticket: {
                                        id: data.payload.id
                                    },
                                    user: {
                                        id: getUserInfo().sub
                                    }
                                }
                                onRefetchCategory();
                                dispatch(postTickethistory(tickethistoryData));
                                handleCloaseModal();
                            }
                        });
                    } else {
                        dispatch(updateTicket({
                            ...form.values, id: selectedTicket.id, category: {
                                id: selectedCategoryId
                            }
                        })).then(() => {
                            const tickethistoryData = {
                                action: `updated the ticket`,
                                ticket: {
                                    id: ticketDetail.id
                                },
                                user: {
                                    id: getUserInfo().sub
                                }
                            }
                            onRefetchCategory();
                            dispatch(postTickethistory(tickethistoryData));
                            handleCloaseModal();
                        });
                    }
                }
            }
        }
    })

    useEffect(() => {
        console.log(selectedTicket);
        if (selectedTicket) {
            dispatch(getTicket(selectedTicket.id));
        } else {
            dispatch(setTicketDetail({}));
        }
    }, [selectedTicket])

    useEffect(() => {
        console.log(isTicketEditModeEnabled);

    }, [isTicketEditModeEnabled])

    useEffect(() => {
         
        if (Object.keys(ticketDetail).length) {
            setsanitizedHTML(DOMPurify.sanitize(ticketDetail.description));
            setInitialValues(ticketDetail);
        }
    }, [ticketDetail])

    return <>
        <div>
            <SkeletonComponent
                wrapperHeight="380px"
                skeletonHeight="50px"
                isLoading={selectedTicket ? isLoadingTicket : false}
                count={6}
            >
                {!selectedTicket ?
                    <FormBuilderComponent
                        formRef={formRef}
                        initialValues={initialValues}
                        validation={validationSchema}
                        formConfig={formConfiguration}
                    />
                    :
                    <>
                        {isTicketEditModeEnabled ?
                            <div>
                                <FontAwesomeIcon onClick={() => setIsTicketEditModeEnabled(false)} icon={faCircleArrowLeft} className="fs-7 me-2" style={{ cursor: 'pointer' }} />
                                <FormBuilderComponent
                                    formRef={formRef}
                                    initialValues={initialValues}
                                    validation={validationSchema}
                                    formConfig={formConfiguration}
                                />
                            </div> :
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="title">
                                        PROJ-{ticketDetail.id} {ticketDetail?.title}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon onClick={() => setIsTicketEditModeEnabled(true)} icon={faEdit} className="fs-7 me-2" style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <div className={`${ticketDetail.priority === 'high' ? 'high' : ticketDetail.priority === 'medium' ? 'medium' : 'low'} mt-1`}>
                                    Priority:
                                    <span className="ms-2">
                                        {ticketDetail.priority}
                                    </span>
                                </div>
                                <div className="exdate">
                                    Expires in:
                                    <span className="ms-2">
                                        {ticketDetail.expirydate ? <>
                                            {moment(ticketDetail.expirydate).format(
                                                "DD-MM-YYYY "
                                            )}
                                        </> : 'Not added'}
                                    </span>
                                </div>
                                <div className="mt-3 ticketbodytitle">Description</div>
                                <div className="description" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

                                <div className="mt-3 ticketbodytitle">History</div>
                                <div>
                                    <ul>
                                        {ticketDetail?.tickethistory?.map((history: any) => (
                                            <li>
                                                {history.user.email.split('@')[0]} {history.action} on {moment(ticketDetail.createdAt).format(
                                                    "DD-MM-YYYY "
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        }
                    </>
                }

            </SkeletonComponent>
        </div>
    </>
})

export default TicketComponent;