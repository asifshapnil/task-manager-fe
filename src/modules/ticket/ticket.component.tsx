import { createRef, forwardRef, useImperativeHandle, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { postTicket } from "../../store/ticket.slice";
import { getCategories } from "../../store/category.slice";

const TicketComponent = forwardRef(({ reference, selectedCategoryId }: any) => {
    const dispatch = useDispatch();
    const formRef = createRef();
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

                    dispatch(postTicket({...form.values, category: {
                        id: selectedCategoryId
                    }})).then(() => {
                        onRefetchCategory();
                    });
                }
            }
        }
    })

    return <>
        <div>
            <FormBuilderComponent
                formRef={formRef}
                initialValues={initialValues}
                validation={validationSchema}
                formConfig={formConfiguration}
            />
        </div>
    </>
})

export default TicketComponent;