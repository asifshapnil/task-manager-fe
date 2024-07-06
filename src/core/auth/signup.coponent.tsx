import { createRef, useEffect, useState } from "react";
import FormBuilderComponent, { FormConfig } from "../../shared/form-builder/form-builder.component"
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/auth.slice";
import { useSelector } from "react-redux";
import TextLogo from "../common/textlogo.component";

const SignUpComponent = () => {
    const dispatch = useDispatch();
    const formRef = createRef();
    const isLoadingSignup = useSelector((state: any) => state.auth.isLoadingSignup);
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
            if(!email || !password) return;

            dispatch(signUp(form.values));
        }
    }

    useEffect(() => {
        console.log(isLoadingSignup);
        
    }, [isLoadingSignup])

    return <>
        <div className="d-flex" style={{ height: '100vh' }}>
            <div style={{ width: '60%', backgroundColor: '#25B0EA' }} className="d-flex align-items-center p-3">
                <div className="p-3">
                <div className="p-3">
                    <TextLogo />
                </div>
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
                    <Button variant="primary" onClick={() => onSubmit()}>
                        Signup & login
                    </Button>
                </div>
            </div>
        </div>
    </>
}

export default SignUpComponent;