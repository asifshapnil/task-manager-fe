import { createRef, useEffect, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component"
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/auth.slice";
import { useNavigate } from "react-router-dom";
import TextLogo from "../common/textlogo.component";

const SignInComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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

    const onSubmit = () => {
        const form: any = formRef.current;

        if (form) {
            form.handleSubmit();
            const { email, password } = form.values;
            if (!email || !password) return;

            dispatch(signIn(form.values));
        }
    }

    useEffect(() => {

    }, [])

    return <>
        <div className="d-flex" style={{ height: '100vh' }}>
            <div style={{ width: '60%', backgroundColor: '#25B0EA' }} className="d-flex align-items-center p-3">
                <div className="p-3">
                    <TextLogo />
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ flex: 1 }}>
                <div className="bg-card w-100 p-2">
                    <FormBuilderComponent
                        formRef={formRef}
                        initialValues={initialValues}
                        validation={validationSchema}
                        formConfig={formConfiguration}
                    />
                    <div className="d-flex justify-content-between align-items-end">
                        <Button variant="primary" onClick={() => onSubmit()}>
                            Sign in
                        </Button>
                        <div style={{
                            fontSize: '14px'
                        }}>
                            Not having account? <span onClick={() => navigate('/register')} className="ms-2" style={{color: 'blue', cursor: 'pointer'}}>Sign up</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SignInComponent