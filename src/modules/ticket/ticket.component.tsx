import { createRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { getTicket, postTicket, updateTicket } from "../../store/ticket.slice";
import { getCategories } from "../../store/category.slice";
import { useSelector } from "react-redux";
import SkeletonComponent from "../../shared/skeleton/skeleton.component";
import moment from "moment";
import DOMPurify from 'dompurify';
import './ticket.scss';
import { ListGroup } from "react-bootstrap";

const TicketComponent = forwardRef(({ reference, selectedCategoryId, selectedTicket }: any) => {
    const dispatch = useDispatch();
    const formRef = createRef();
    const sanitizedHTML = DOMPurify.sanitize(selectedTicket.description);
    const ticketDetail = useSelector((state: any) => state.ticket.ticketDetail);
    const isLoadingTicket = useSelector((state: any) => state.ticket.isLoadingTicket);
    const [isEditMode, setIsEditMode] = useState(false);

    const [initialValues, setInitialValues] = useState<any>({
        title: "",
        description: "",
        priority: "",
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
                    const { title } = form.values;
                    if (!title) return;

                    if (selectedTicket) {
                        dispatch(postTicket({
                            ...form.values, category: {
                                id: selectedCategoryId
                            }
                        })).then(() => {
                            onRefetchCategory();
                        });
                    } else {
                        dispatch(updateTicket({
                            ...form.values, id: selectedTicket.id, category: {
                                id: selectedCategoryId
                            }
                        })).then(() => {
                            onRefetchCategory();
                        });
                    }
                }
            }
        }
    })

    useEffect(() => {
        if (!selectedTicket) return;
        dispatch(getTicket(selectedTicket.id));
    }, [selectedTicket])

    useEffect(() => {
        if (ticketDetail) {
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
                    /> :
                    <>
                        {isEditMode ?
                            <FormBuilderComponent
                                formRef={formRef}
                                initialValues={initialValues}
                                validation={validationSchema}
                                formConfig={formConfiguration}
                            /> :
                            <div>
                                <div className="title">
                                    PROJ-{ticketDetail.id} {ticketDetail?.title}
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
                                                {history.user.email.split('@')[0]} {history.action } on {moment(ticketDetail.createdAt).format(
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