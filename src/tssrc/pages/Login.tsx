type LoginProps = {
    onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {

    return (
        <div className='d-flex justify-content-center align-items-center w-100 h-100 login-screen'>
            <div className='login-card'>
                <div className='login-header'>
                    <img src={require("../../assets/logo.png")} height='64px' width='64px'></img>
                    <h4 className='ms-2 resume-title'>Resume</h4>
                </div>

                <div className="mb-3">
                    <input type="email" className="form-control form-control-lg" placeholder="Email" />
                </div>
                
                <div className="mb-3">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" />
                </div>

                <button className='btn btn-primary btn-lg w-100 mb-3' onClick={onLogin}>Login</button>

                <div className="separator mb-3">Or</div>

                <button 
                    className='btn btn-dark btn-lg w-100'>Sign Up</button>
            </div>
        </div>
    );
}

export default Login