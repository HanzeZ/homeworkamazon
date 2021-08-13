import React,{ useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
function Login() {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn =(e)=>{
        e.preventDefault();
        console.log(email,password);
        auth
            .signInWithEmailAndPassword(email,password)
            .then(auth=>{
                history.push('/')
            })
            .catch(error=>alert(error.message))
        //some fancy firebase login shiiiit
    }

    const register =(e)=>{
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                //it succesfully created a user with email and pw
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error=>alert(error.message));
        //somefancy firebase register shittt
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className ='login__logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png'/>
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='login__signinButton' type='submit' onClick={signIn}>Sign In</button>
                </form>
                <p>
                    By sign-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please your Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button className='login__registerButton' type='submit' onClick={register}>Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login
