import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postCategories } from "../../store/category.slice";
import './task-manager.scss';
import { faAdd, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../../shared/modal/modal.component";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component";
import * as yup from "yup";
import TicketComponent from "../ticket/ticket.component";

const TaskManagerComponent = () => {
    const dispatch = useDispatch();
    const formRef = createRef();
    const ticketRefernce: any = createRef();
    const categories = useSelector((state: any) => state.categories.categories);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null as any);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null as any);

    const [initialValues, setInitialValues] = useState<any>({
        name: "",
    });

    const formConfiguration: FormConfig = {
        controls: [
            {
                name: "name",
                label: "Category Name",
                placeholder: "",
                type: "text",
                required: true,
            }
        ]
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required('Category name is required')
    });

    const onRefetch = () => {
        dispatch(getCategories());
    }

    const onSubmitCategory = () => {
        const form: any = formRef.current;

        if (form) {
            form.handleSubmit();
            const { name } = form.values;
            if (!name) return;

            dispatch(postCategories(form.values)).then(() => {
                onRefetch();
                handleCloseModal();
            });
        }
    }

    const onSubmitTicket = () => {
        ticketRefernce.current?.onSubmit();
        handleCloseModal();
    }

    const handleCloseModal = () => {
        setIsShowModal(false);
        setIsTicketModalOpen(false);
    }

    const modalActionConfig = [
        {
            label: "Add",
            event: onSubmitCategory,
            variant: "primary",
        },
    ]
    const modalActionConfigForTicket = [
        {
            label: "Save",
            event: onSubmitTicket,
            variant: "primary",
        },
    ]

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        if(!selectedTicket) return;
        setIsTicketModalOpen(true);
    }, [selectedTicket])

    return <>
        <div className="d-flex">
            <div className="category-wrapper" style={{ width: '98%' }}>
                {categories?.length ? <>
                    {categories?.map((cat: any) => (
                        <div className="categorybox">
                            <div className="cat-title d-flex justify-content-between align-items-center">
                                {cat.name}
                                <FontAwesomeIcon onClick={() => {setIsTicketModalOpen(true); setSelectedCategoryId(cat.id)}} icon={faAdd} className="fs-7 me-2" style={{cursor: 'pointer'}} />
                            </div>

                            {cat.tickets.length ? <>
                                {cat.tickets.map((ticket: any) => (
                                    <div className="ticket-card">
                                        <div className="" style={{cursor: 'pointer'}} onClick={() => setSelectedTicket(ticket)}>
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
                </> : null}
            </div>
            <div
                onClick={() => setIsShowModal(true)}
                style={{
                    marginTop: '2rem', backgroundColor: '#e7e7e7',
                    borderRadius: '3px', height: 'fit-content', textAlign: 'center',
                    padding: '10px 1rem', cursor: 'pointer'
                }}>
                <FontAwesomeIcon icon={faAdd} className="fs-7" />
            </div>
        </div>

        <ModalComponent
            showModal={isShowModal}
            handleClose={handleCloseModal}
            headerTitle='Add new category'
            actionConfig={modalActionConfig}
        >
            <FormBuilderComponent
                formRef={formRef}
                initialValues={initialValues}
                validation={validationSchema}
                formConfig={formConfiguration}
            />
        </ModalComponent>

        <ModalComponent
            showModal={isTicketModalOpen}
            handleClose={handleCloseModal}
            headerTitle={selectedTicket ? selectedTicket?.title : 'Add new ticket'}
            actionConfig={modalActionConfigForTicket}
        >
            <TicketComponent reference={ticketRefernce} 
            selectedCategoryId={selectedCategoryId}
            selectedTicket={selectedTicket} />
        </ModalComponent>
    </>
}

export default TaskManagerComponent