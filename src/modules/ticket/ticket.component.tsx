import { createRef, forwardRef, useImperativeHandle, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component";
import * as yup from "yup";
import { useDispatch } from "react-redux";

const TicketComponent = forwardRef(({ reference }: any) => {
    const dispatch = useDispatch();
    const formRef = createRef();
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
        name: yup.string().required('Category name is required')
    });

    useImperativeHandle(reference, () => {
        return {
            onSubmit: () => {
                debugger
                const form: any = formRef.current;

                if (form) {
                    form.handleSubmit();
                    const { name } = form.values;
                    if (!name) return;

                    // dispatch(postCategories(form.values)).then(() => {
                    //     onRefetch();
                    // });
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