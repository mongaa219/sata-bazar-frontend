import React, { useState } from 'react';
import axios from "axios";
import { Spinner } from 'react-bootstrap'
import '../login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // const URL = 'http://localhost:3003'
    // const URL = 'https://satta-backend.herokuapp.com'
    const URL = 'http://107.20.102.114:8000'

  const loginAdmin = async(e) => {
    e.preventDefault();
    console.log('submit');
    console.log(email,password);
    let loginData = {
        email : email,
        password : password
    };
    setIsLoading(true);
    // https://satta-backend.herokuapp.com
    await axios.post(URL+'/api/admin/login',loginData).then((data) => {
        console.log(data.data);
        if (data.data.token) {
            localStorage.setItem('loginToken',data.data.token)
            window.location.href = '/home';
        }
        else
        {
            alert(data.data.message || 'Login detail invalid !!')
        }
        setIsLoading(false);
    }).catch((er) => {
        console.log(er);
        setIsLoading(false);
    })

  }
  return (
      <>
        <div className="container admin-pages">
        <div className='row'>
            <div className='col-md-12 mt-4'>
            <div className='ns-form'>
                <form onSubmit={loginAdmin}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <center><h3>Admin Login</h3></center>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-labels" >Email address</label>
                    <input type="email" id="form2Example1" className="form-control" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                    <label className="form-labels" >Password</label>
                    <input type="password" id="form2Example2" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/* <!-- 2 column grid layout for inline styling --> */}
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                    {/* <!-- Checkbox --> */}
                    {/* <div className="form-check">
                        <input className="form-check-input" onChange={}  type="checkbox" value="" id="form2Example31" checked />
                        <label className="form-check-label" > Remember me </label>
                    </div> */}
                    </div>

                    {/* <div className="col">
                    <!-- Simple link -->
                    <a href="#!">Forgot password?</a>
                    </div> */}
                </div>

                {/* <!-- Submit button --> */}
                <button type="submit" className="btn btn-primary btn-block mb-4">
                    {!isLoading && 'Sign in'}
                    { isLoading && 
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden loader-ns">Loading...</span>
                        </Spinner>
                    }
                </button>

                {/* <!-- Register buttons --> */}
                {/* <div className="text-center">
                    <p>Not a member? <a href="#!">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                    </button>
                </div> */}
                </form>
            </div>
            </div>
        </div>

        </div>
      </>
  );
}

export default Login;
