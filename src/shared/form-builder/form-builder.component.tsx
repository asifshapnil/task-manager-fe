import { ErrorMessage, Formik } from "formik";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import JoditEditor, { IJoditEditorProps } from 'jodit-react';
import "./form-builder.scss";
import { useDispatch } from "react-redux";
import { faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface Control {
  name: string;
  label: string;
  placeholder?: string;
  type:
  | string
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "switch"
  | "date"
  | "datetime"
  | "email"
  | "select"
  | "password"
  | "chips"
  | "file"
  | "texteditor";
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  options?: any;
  selectableValue?: string;
  selectedValue?: string;
  onChange?: (selectedValue: any) => void;
  controlId?: string | "formFile";
  display?: boolean;
  suffix?: string;
  minDate?: string;
  maxDate?: string;
  isLoading?: boolean;
  dispatchableApi?: {
    api: string;
    params: any;
    selectableProperty: string;
  };
}

export interface FormConfig {
  controls: Control[];
}

interface FormBuilderComponentProps {
  formRef: any;
  formConfig: FormConfig;
  initialValues: any;
  validation: any;
  renderCount?: any;
  fileConfig?: {
    fileName?: string;
    isShowImage: boolean;
    isEdit: boolean;
    preview: any;
    isLink?: boolean;
    onRemoveFile: () => void;
  };
}

const FormBuilderComponent: FC<FormBuilderComponentProps> = ({
  formRef,
  formConfig,
  initialValues,
  validation,
  fileConfig,
  renderCount,
}) => {
  const { controls } = formConfig;
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  }

  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typings...',
      uploader: {
        "insertImageAsBase64URI": true
      },
      buttons:
        'underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,speechRecognize,spellcheck,cut',
    }),
    []
  );


  return (
    <div>
      {Object.keys(initialValues).length ? (
        <Formik
          key={renderCount || 0}
          innerRef={formRef}
          enableReinitialize
          onSubmit={(values: any) => { }}
          validationSchema={validation}
          initialValues={initialValues}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            touched,
            errors,
          }: any) => (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="">
                {controls && controls.length
                  ? controls.map((control, i) => (
                    <div key={i}>
                      {(() => {
                        switch (control.type) {
                          case "text":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <div className="d-flex align-items-center">
                                      <Form.Control
                                        type="text"
                                        placeholder={control.placeholder}
                                        name={control.name}
                                        onChange={(e: any) => {
                                          handleChange(e);
                                          setFieldValue(
                                            control?.name,
                                            e.target.value
                                          );
                                        }}
                                        value={values[control?.name]}
                                        required={control.required ?? false}
                                        readOnly={control.readOnly ?? false}
                                        disabled={control.disabled ?? false}
                                        isValid={
                                          touched[control.name] &&
                                          !errors[control.name]
                                        }
                                        isInvalid={
                                          (!!touched[control.name] &&
                                            !!errors[control.name]) ??
                                          false
                                        }
                                      />
                                      {control?.isLoading && (
                                        <Spinner
                                          animation="border"
                                          variant="primary"
                                          className="ms-1"
                                          size="sm"
                                        />
                                      )}
                                    </div>
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "email":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      type="email"
                                      placeholder={control.placeholder}
                                      name={control.name}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.value
                                        );
                                      }}
                                      value={values[control?.name]}
                                      required={control.required ?? false}
                                      readOnly={control.readOnly ?? false}
                                      disabled={control.disabled ?? false}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "password":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <div className="d-flex align-items-center gap-2 position-relative ">
                                      <Form.Control
                                        type={
                                          showPassword ? "text" : "password"
                                        }
                                        placeholder={control.placeholder}
                                        name={control.name}
                                        onChange={(e: any) => {
                                          handleChange(e);
                                          setFieldValue(
                                            control?.name,
                                            e.target.value
                                          );
                                        }}
                                        value={values[control?.name]}
                                        required={control.required ?? false}
                                        readOnly={control.readOnly ?? false}
                                        disabled={control.disabled ?? false}
                                        isValid={
                                          touched[control.name] &&
                                          !errors[control.name]
                                        }
                                        isInvalid={
                                          (!!touched[control.name] &&
                                            !!errors[control.name]) ??
                                          false
                                        }
                                      />
                                      <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="password-toggle-button bg-transparent border-0 position-absolute end-0 me-2"
                                      >
                                        {showPassword ? (
                                          <FontAwesomeIcon
                                            icon={faEyeSlash}
                                          />
                                        ) : (
                                          <FontAwesomeIcon icon={faEye} />
                                        )}
                                      </button>
                                    </div>

                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "number":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>

                                <div className="d-flex align-items-center w-100">
                                  <div className="w-100">
                                    <Form.Group>
                                      <div className="d-flex align-items-center">
                                        <Form.Control
                                          type="number"
                                          min="0"
                                          placeholder={control.placeholder}
                                          name={control.name}
                                          onChange={(e: any) => {
                                            handleChange(e);
                                            if (Number(e.target.value) < 0) {
                                              e.target.value = 0;
                                              setFieldValue(control?.name, 0);
                                              return;
                                            }
                                            setFieldValue(
                                              control?.name,
                                              e.target.value
                                            );
                                          }}
                                          value={values[control?.name]}
                                          required={control.required ?? false}
                                          readOnly={control.readOnly ?? false}
                                          disabled={control.disabled ?? false}
                                          isValid={
                                            touched[control.name] &&
                                            !errors[control.name]
                                          }
                                          isInvalid={
                                            (!!touched[control.name] &&
                                              !!errors[control.name]) ??
                                            false
                                          }
                                        />
                                        {control?.isLoading && (
                                          <Spinner
                                            animation="border"
                                            variant="primary"
                                            className="ms-1"
                                            size="sm"
                                          />
                                        )}
                                      </div>
                                      <ErrorMessage
                                        name={control.name}
                                        component="div"
                                        className="error-message"
                                      />
                                    </Form.Group>
                                  </div>
                                  {control.suffix && (
                                    <div
                                      className="mb-2"
                                      style={{
                                        width: "50px",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      {control.suffix}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          case "textarea":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      placeholder={control.placeholder}
                                      name={control.name}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.value
                                        );
                                      }}
                                      value={values[control?.name]}
                                      required={control.required ?? false}
                                      readOnly={control.readOnly ?? false}
                                      disabled={control.disabled ?? false}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "texteditor":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <JoditEditor
                                    ref={editor}
                                    value={content}
                                    config={config}
                                    onBlur={(newContent: any) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                    onChange={(newContent: any) => { 
                                      setFieldValue(
                                        control?.name,
                                        newContent
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          case "date":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      type="date"
                                      placeholder={control.placeholder}
                                      name={control.name}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.value
                                        );
                                      }}
                                      value={values[control?.name]}
                                      required={control.required ?? false}
                                      readOnly={control.readOnly ?? false}
                                      disabled={control.disabled ?? false}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                      min={control?.minDate || ""}
                                      max={control?.maxDate || ""}
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "datetime":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      className="text-dark"
                                      type="datetime-local"
                                      placeholder={
                                        !values[control?.name]
                                          ? control.placeholder
                                          : ""
                                      }
                                      name={control.name}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.value
                                        );
                                      }}
                                      value={values[control?.name]}
                                      required={control.required ?? false}
                                      readOnly={control.readOnly ?? false}
                                      disabled={control.disabled ?? false}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                      min={control?.minDate || ""}
                                      max={control?.maxDate || ""}
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "time":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      type="time"
                                      placeholder={control.placeholder}
                                      name={control.name}
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.value
                                        );
                                      }}
                                      value={values[control?.name]}
                                      required={control.required ?? false}
                                      readOnly={control.readOnly ?? false}
                                      disabled={control.disabled ?? false}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "switch":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      type="switch"
                                      name={control.name}
                                      disabled={
                                        control?.disabled
                                          ? control?.disabled
                                          : false
                                      }
                                      readOnly={
                                        control?.readOnly
                                          ? control?.readOnly
                                          : false
                                      }
                                      onChange={(e: any) => {
                                        //  ;
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.checked
                                        );
                                      }}
                                      value={values[control?.name]}
                                      checked={values[control?.name]}
                                      defaultChecked={values[control?.name]}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );
                          case "radio":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group>
                                    <Form.Control
                                      type="radio"
                                      name={control.name}
                                      disabled={
                                        control?.disabled
                                          ? control?.disabled
                                          : false
                                      }
                                      readOnly={
                                        control?.readOnly
                                          ? control?.readOnly
                                          : false
                                      }
                                      onChange={(e: any) => {
                                        handleChange(e);
                                        setFieldValue(
                                          control?.name,
                                          e.target.value
                                        );
                                      }}
                                      value={values[control?.name]}
                                      defaultChecked={values[control?.name]}
                                      isValid={
                                        touched[control.name] &&
                                        !errors[control.name]
                                      }
                                      isInvalid={
                                        (!!touched[control.name] &&
                                          !!errors[control.name]) ??
                                        false
                                      }
                                    />
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );

                          case "select":
                            return (
                              <div
                                className={`flex flex-column mt-3 mb-3 ${control.hasOwnProperty("display") &&
                                  !control.display
                                  ? "d-none"
                                  : ""
                                  }`}
                              >
                                <div className="mb-2">
                                  {control.label}
                                  {control.required && (
                                    <span className="text-danger">*</span>
                                  )}
                                </div>
                                <div className="">
                                  <Form.Group
                                    controlId={`validation + ${control.name}`}
                                  >
                                    <div className="d-flex align-items-center">
                                      <Form.Select
                                        name={control.name}
                                        onChange={(event) => {
                                          handleChange(event);
                                          if (control.onChange) {
                                            control.onChange(
                                              event.target.value
                                            );
                                          }
                                        }}
                                        value={values[control?.name]}
                                        required={control.required ?? false}
                                        disabled={control.disabled ?? false}
                                        isValid={
                                          touched[control.name] &&
                                          !errors[control.name]
                                        }
                                        isInvalid={
                                          (!!touched[control.name] &&
                                            !!errors[control.name]) ??
                                          false
                                        }
                                      >
                                        <option value={""}>
                                          {control.placeholder}
                                        </option>
                                        {control.options?.map(
                                          (option: any, index: any) => (
                                            <option
                                              key={index}
                                              value={option.value}
                                            >
                                              {option.label}
                                            </option>
                                          )
                                        )}
                                      </Form.Select>
                                      {control?.isLoading && (
                                        <Spinner
                                          animation="border"
                                          variant="primary"
                                          className="ms-1"
                                          size="sm"
                                        />
                                      )}
                                    </div>
                                    <ErrorMessage
                                      name={control.name}
                                      component="div"
                                      className="error-message"
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            );

                          default:
                            return null;
                        }
                      })()}
                    </div>
                  ))
                  : ""}
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};

export default FormBuilderComponent;
