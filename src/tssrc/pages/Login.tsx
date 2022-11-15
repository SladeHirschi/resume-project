import React, { Dispatch, FC, SetStateAction, useEffect, useState, createRef } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { NotificationManager } from 'react-notifications';

declare var google: any

const Login: FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        /*  global google  */
        if (typeof google == 'undefined') {
            return;
        }
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large" }
        );
    }, [])

    function handleCredentialResponse(response: any) {
        window.sessionStorage.setItem('jwt', response.credential);
        window.location.href = "/profile";
    }

    async function login(e: any) {
        e.preventDefault();
        var body: string = 'email=' + encodeURIComponent(email);
        body += '&password=' + encodeURIComponent(password);
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        if (response.status === 401) {
            NotificationManager.error('Please check your credentials and try again', 'Authentication Failed', 3000);
        } else if (response.status === 400) {
            NotificationManager.error('Please check your credentials and try again', 'Authentication Failed', 3000);
        } else if (response.status === 200) {
            var responseBody = await response.json();
            var jwt = responseBody.token;
            window.sessionStorage.setItem('jwt', jwt);
            window.location.href = "/profile";
        }
    }

    return (
        <form className='d-flex justify-content-center align-items-center w-100 h-100 '>
            <div className='login-card'>
                <div className='login-header'>
                    <img src={require("../../assets/logo.png")} height='64px' width='64px'></img>
                    <h4 className='ms-2 resume-title'>Resume</h4>
                </div>

                <>
                    <div className="mb-3">
                        <OverlayTrigger
                            placement={'right'}
                            overlay={
                                <Tooltip>
                                    Email to use sladehirschi@gmail.com
                                </Tooltip>
                            }
                        >
                            <input
                                id='email-input'
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Email"
                            />
                        </OverlayTrigger>
                    </div>

                    <div className="mb-3">
                        <OverlayTrigger
                            placement={'right'}
                            overlay={
                                <Tooltip>
                                    Password to use resume1234
                                </Tooltip>
                            }
                        >
                            <input
                                id='password-input'
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="Password"
                            />
                        </OverlayTrigger>

                    </div>

                    <button id="sign-in-button" className='btn btn-primary btn-lg w-100 mb-3' onClick={login}>Sign in</button>
                    {/* <div id="googleSignInButton"></div> */}
                    <div className="separator mb-3">Or</div>
                    <a id="sign-up-button" href='/signUp' className='btn btn-dark btn-lg w-100'> Sign Up</a>
                </>
            </div>

        </form>
    );
}

export default Login