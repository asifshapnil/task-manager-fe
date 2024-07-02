import { createRef, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component"
import * as yup from "yup";
import { Button } from "react-bootstrap";

const SignInComponent = () => {
    const formRef = createRef();
    const [initialValues, setInitialValues] = useState<any>({
        email: "",
        password: ""
    });

    const formConfiguration: FormConfig = {
        controls: [
            {
                name: "email",
                label: "Email",
                placeholder: "example@domain.com",
                type: "email",
                required: true,
            },
            {
                name: "password",
                label: "Password",
                placeholder: "******",
                type: "password",
                required: true,
            },
        ]
    }

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: yup.string().required('Password is required')
    });

    return <>
        <div className="d-flex" style={{ height: '100vh' }}>
            <div style={{ width: '60%', backgroundColor: '#25B0EA' }} className="d-flex align-items-center p-3">
                <div className="p-3">
                    <span style={{
                        fontSize: '40px',
                        fontFamily: 'monospace',
                        fontWeight: '700',
                        color: '#fff',
                        letterSpacing: '5px'
                    }}>
                        Task
                    </span>
                    <span style={{
                        fontSize: '20px',
                        fontFamily: 'sans-serif',
                        fontWeight: '700',
                        color: '#fff',
                        marginLeft: '.5rem',
                        letterSpacing: '5px'
                    }}>
                        Manager
                    </span>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{flex: 1}}>
                <div className="bg-card w-100 p-2">
                    <FormBuilderComponent
                        formRef={formRef}
                        initialValues={initialValues}
                        validation={validationSchema}
                        formConfig={formConfiguration}
                    />
                    <Button variant="primary">
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    </>
}

export default SignInComponent