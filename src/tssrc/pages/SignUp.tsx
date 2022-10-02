import { useState } from "react";
import { NotificationManager } from 'react-notifications';
import { Form, InputGroup } from 'react-bootstrap';

type UserDraft = {
    firstName: string
    lastName: string
    phoneNumber: string
    phoneNumberDisplay: string
    dateOfBirth: string
    email: string
    password: string
    confirmPassword: string
}

const SignUp = () => {

    const emptyDraft = { firstName: '', lastName: '', phoneNumber: '', phoneNumberDisplay: '', dateOfBirth: '', email: '', password: '', confirmPassword: '' }

    const [userDraft, setUserDraft] = useState<UserDraft>(emptyDraft);
    const [validated, setValidated] = useState<boolean>(false);

    //validation 

    function validateForm(): boolean {
        var emailVerified = userDraft.email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        console.log("emailVer: ", emailVerified)
        return false;
    }

    async function signUp() {
        var validBody: boolean = validateForm();
        var body: string = 'firstName=' + encodeURIComponent(userDraft.firstName);
        body += '&lastName=' + encodeURIComponent(userDraft.lastName);
        body += '&email=' + encodeURIComponent(userDraft.email);
        body += '&phoneNumber=' + encodeURIComponent(userDraft.phoneNumber);
        body += '&password=' + encodeURIComponent(userDraft.password);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });

        if (response.status === 409) {
            NotificationManager.error('This email already exists', 'Duplicate')
        }
    }

    function formatPhone(text: string): string {
        if (!text) return text;
        var currentValue = text.replace(/[^\d]/g, '');
        var cvLength = currentValue.length;

        if (!userDraft.phoneNumberDisplay || text.length > userDraft.phoneNumberDisplay.length) {
            if (cvLength < 4) return currentValue;
            if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
        } else {
            return text
        }
    }

    return (
        <Form validated={validated} className='d-flex justify-content-center align-items-center w-100 h-100' noValidate onSubmit={signUp}>
            <div className='login-card'>
                <div className='login-header'>
                    <img src={require("../../assets/logo.png")} height='64px' width='64px'></img>
                    <h4 className='ms-2 resume-title'>Resume</h4>
                </div>
                <div className='row mb-3'>
                    <Form.Group controlId="validationCustom01" className="col">
                        <Form.Control
                            onChange={(e) => setUserDraft({ ...userDraft, firstName: e.target.value })}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            value={userDraft.firstName}
                            required
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <div className="col">
                        <input
                            onChange={(e) => setUserDraft({ ...userDraft, lastName: e.target.value })}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Last Name"
                            value={userDraft.lastName}

                        />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className="col">
                        <input
                            onChange={(e) => setUserDraft({ ...userDraft, email: e.target.value })}
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            value={userDraft.email}
                        />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className="col">
                        <input
                            onChange={(e) => setUserDraft({ ...userDraft, phoneNumberDisplay: formatPhone(e.target.value), phoneNumber: e.target.value })}
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Phone Number"
                            value={userDraft.phoneNumberDisplay}
                        />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className="col">
                        <input
                            onChange={(e) => setUserDraft({ ...userDraft, password: e.target.value })}
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            value={userDraft.password}
                        />
                    </div>

                    <div className="col">
                        <input
                            onChange={(e) => setUserDraft({ ...userDraft, confirmPassword: e.target.value })}
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            value={userDraft.confirmPassword}
                        />
                    </div>
                </div>

                <button className='btn btn-primary btn-lg w-100 mb-3' onClick={signUp}>Submit</button>
                <div className="separator mb-3">Or</div>
                <a href='/login' className='btn btn-dark btn-lg w-100'> Login</a>

            </div>
        </Form>
    );
}

export default SignUp