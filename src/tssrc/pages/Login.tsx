import { Dispatch, SetStateAction, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type LoginProps = {
    onLogin: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ onLogin }: LoginProps) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function login() {

        var body: string = 'email=' + encodeURIComponent(email);
        body += '&password=' + encodeURIComponent(password);
        console.log(process.env.REACT_APP_BASE_URL)
        const response: any = await fetch(process.env.REACT_APP_BASE_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
    }

    return (
        <div className='d-flex justify-content-center align-items-center w-100 h-100 login-screen'>
            <div className='login-card'>
                <div className='login-header'>
                    <img src={require("../../assets/logo.png")} height='64px' width='64px'></img>
                    <h4 className='ms-2 resume-title'>Resume</h4>
                </div>

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
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                        />
                    </OverlayTrigger>

                </div>

                <button className='btn btn-primary btn-lg w-100 mb-3' onClick={login}>Login</button>

                <div className="separator mb-3">Or</div>

                <a href="/signUp" className='btn btn-dark btn-lg w-100'> Sign Up</a>
            </div>
        </div>
    );
}

export default Login