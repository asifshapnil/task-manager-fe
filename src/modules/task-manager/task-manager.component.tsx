import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, postCategories } from "../../store/category.slice";
import './task-manager.scss';
import { faAdd, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalComponent from "../../shared/modal/modal.component";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component";
import * as yup from "yup";

const TaskManagerComponent = () => {
    const dispatch = useDispatch();
    const formRef = createRef();
    const categories = useSelector((state: any) => state.categories.categories);
    const [isShowModal, setIsShowModal] = useState(false);

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

    const handleCloseModal = () => {
        setIsShowModal(false);
    }

    const modalActionConfig = [
        {
            label: "Add",
            event: onSubmitCategory,
            variant: "primary",
        },
    ]

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {
        console.log(categories);
    }, [categories])

    return <>
        <div className="d-flex">
            <div className="category-wrapper" style={{ width: '98%' }}>
                {categories?.length ? <>
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
            headerTitle='Add Category'
            actionConfig={modalActionConfig}
        >
            <FormBuilderComponent
                formRef={formRef}
                initialValues={initialValues}
                validation={validationSchema}
                formConfig={formConfiguration}
            />
        </ModalComponent>
    </>
}

export default TaskManagerComponent