import { Component } from 'react';
import './index.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errMsg: '',
        isSuccess: false
    };

    handleLogin = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:3000/login';
        const { email, password } = this.state;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        };

        try {
            const result = await fetch(url, options);
            const data = await result.json();

            if (data.ok) {
                this.setState({ errMsg: 'Login successful!', isSuccess: true });
                localStorage.setItem('token', data.jwtToken);
                setTimeout(() => this.props.history.replace('/home'), 2000);
            } else {
                this.setState({ errMsg: data.msg, isSuccess: false });
            }
        } catch (err) {
            console.log(err.message);
            this.setState({ errMsg: err.message, isSuccess: false });
        }
    };

    render() {
        const { errMsg, isSuccess } = this.state;
        return (
            <div className='container'>
                <h1 className='loginHead'>Login Form</h1>
                <form onSubmit={this.handleLogin} className='formContainer'>
                    <label htmlFor='email'>Email</label>
                    <input required onChange={event => this.setState({ email: event.target.value })} placeholder='Enter Email' type='email' id='email' />
                    <br/>
                    <label htmlFor='password'>Password</label>
                    <input required onChange={event => this.setState({ password: event.target.value })} placeholder='Enter Password' type='password' id='password' />
                    <br/>
                    <button type='submit' className='loginButton'>Login</button>
                    {errMsg !== "" && <p className={`${isSuccess ? 'successMsg' : 'errMsg'}`}>{errMsg}</p>}
                    <p className='login'>Don't have an account? <a className='loginSpan' href='/signup'>Sign Up!</a></p>
                </form>
            </div>
        );
    }
}

export default Login;
