import {Component} from 'react';
import './index.css';

class SignUp extends Component{
    state = {
        name: '',
        email: '',
        password: '',
        errMsg:'',
        isSuccess: ''
    }

    handleSignup = async(event)=>{
        event.preventDefault()
        const url = 'http://localhost:3000/signup';
        const {name, email, password} = this.state;
        const options = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        }
        try{
            const result = await fetch(url, options)
            const data = await result.json()
            if(data.ok){
                this.setState({errMsg:data.msg,isSuccess:data.ok})
                setTimeout(() => this.props.history.replace('/login'),3000)
            }else{
                this.setState({errMsg:data.msg,isSuccess:data.ok})
            }
        }catch(err){
            console.log(err.message);
        }
    }
    render(){
        const {errMsg,isSuccess} = this.state
        return (
            <div className='container'>
                <h1 className='loginHead'>Sign Up Form</h1>
                <form onSubmit={this.handleSignup} className='formContainer'>
                    <label htmlFor='name'>Name</label>
                    <input required onChange={event => this.setState({name:event.target.value})}  placeholder='Name' type='text' id='name'/>
                    <br/>
                    <label htmlFor='email'>Email</label>
                    <input required onChange={event => this.setState({email:event.target.value})} placeholder='Enter Email' type='email' id='email'/>
                    <br/>
                    <label htmlFor='password'>Password</label>
                    <input required onChange={event => this.setState({password:event.target.value})}  placeholder='Enter Password' type='password' id='password'/>
                    <br/>
                    <button type='submit' className='loginButton'>Sign Up</button>
                    {errMsg !== "" && <p className={`${isSuccess ? 'successMsg':'errMsg'}`}>{isSuccess ? `${errMsg } \n wait for redirecting....!!!` : errMsg}</p>}
                    <p className='signup'>Already have account? <a className='signupSpan' href='/login'>Login!!</a></p>
                </form>
            </div>
        )
    }
}

export default SignUp;