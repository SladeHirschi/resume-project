import { FC, useState } from "react";
import { NotificationManager } from 'react-notifications';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import formatPhone from '../helpers/formatters/phoneNumberFormatter';

interface UserDraft {
    firstName: string
    lastName: string
    phoneNumber: string
    phoneNumberDisplay: string
    dateOfBirth: string
    email: string
    password: string
    confirmPassword: string
}

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().required('Required').length(10, 'Invalid Phone Number'),
    password: Yup.string().required('Required').min(8, 'Must be more than 8 Characters'),
    confirmPassword: Yup.string()
     .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignUp: FC = () => {

    const emptyDraft = { firstName: '', lastName: '', phoneNumber: '', phoneNumberDisplay: '', dateOfBirth: '', email: '', password: '', confirmPassword: '' }

    async function signUp(values: UserDraft) {
        var body: string = 'firstName=' + encodeURIComponent(values.firstName);
        body += '&lastName=' + encodeURIComponent(values.lastName);
        body += '&email=' + encodeURIComponent(values.email);
        body += '&phoneNumber=' + encodeURIComponent(values.phoneNumber);
        body += '&password=' + encodeURIComponent(values.password);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (response.status === 409) {
            NotificationManager.error('This email already exists', 'Duplicate');
            return;
        } else if (response.status === 500) {
            NotificationManager.error('There was a problem Signing Up', 'Error');
            return;
        }
        NotificationManager.success('Welcome', 'Success');
        var responseBody = await response.json();
        window.sessionStorage.setItem('jwt', responseBody.token);
        window.location.href = "/profile";
    }

    function onChangePhoneNumber(setFieldValue: Function, text: string): void {
        var cleaned = text.replace(/[- )(]/g,'');
        setFieldValue('phoneNumber', cleaned.substring(0, 10)); 
        setFieldValue('phoneNumberDisplay', formatPhone(text))
    }

    return (
        <div className='d-flex justify-content-center align-items-center w-100 h-100'>
            <div className='login-card'>
                <div className='login-header'>
                    <img src={require("../../assets/logo.png")} height='64px' width='64px'></img>
                    <h4 className='ms-2 resume-title'>Resume</h4>
                </div>
                <Formik
                    initialValues={emptyDraft}
                    onSubmit={(
                        values: UserDraft,
                        { setSubmitting }: FormikHelpers<UserDraft>
                    ) => {
                        signUp(values);
                        setSubmitting(false);
                    }}
                    validationSchema={SignupSchema}
                >
                    {({ errors, touched, setFieldValue, values }) => <Form>

                        <div className='row mb-3'>
                            <div className="col">
                                <Field
                                    name="firstName"
                                    className={"form-control form-control-lg" + (errors.firstName && touched.firstName ? ' is-invalid' : '')}
                                    placeholder="First Name"
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className='text-danger'>{errors.firstName}</div>
                                ) : null}
                            </div>

                            <div className="col">
                                <Field
                                    name="lastName"
                                    className={"form-control form-control-lg" + (errors.lastName && touched.lastName ? ' is-invalid' : '')}
                                    placeholder="Last Name"

                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className='text-danger'>{errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className="col">
                                <Field
                                    name="email"
                                    type="email"
                                    className={"form-control form-control-lg" + (errors.email && touched.email ? ' is-invalid' : '')}
                                    placeholder="Email"
                                />
                                {errors.email && touched.email ? (
                                    <div className='text-danger'>{errors.email}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className="col">
                                <Field 
                                    as="input"
                                    name="phoneNumber"
                                    onChange={(e: { target: { value: string; }; }) => onChangePhoneNumber(setFieldValue, e.target.value)}
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Phone Number"
                                    value={values['phoneNumberDisplay']}
                                />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className='text-danger'>{errors.phoneNumber}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className="col">
                                <Field
                                    name="password"
                                    type="password"
                                    className={"form-control form-control-lg" + (errors.password && touched.password ? ' is-invalid' : '')}
                                    placeholder="Password"

                                />
                                {errors.password && touched.password ? (
                                    <div className='text-danger'>{errors.password}</div>
                                ) : null}
                            </div>

                            <div className="col">
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className={"form-control form-control-lg" + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')}
                                    placeholder="Confirm Password"
                                />
                                {errors.confirmPassword && touched.confirmPassword ? (
                                    <div className='text-danger'>{errors.confirmPassword}</div>
                                ) : null}
                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary btn-lg w-100 mb-3'>Submit</button>
                    </Form>}
                </Formik>

                <div className="separator mb-3">Or</div>
                <a href='/login' className='btn btn-dark btn-lg w-100'> Login</a>

            </div>
        </div>
    );
}

export default SignUp