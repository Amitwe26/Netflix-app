import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { LoginService } from '../services/LoginService'
import { setNetflixUser, signup } from '../store/actions/UserAction'

export function Register() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [login, setLogin] = useState(false)
    const [signupModal, setSignupModal] = useState(false)
    const [email, setEmail] = useState('')
    const [emailSignUp, setEmailSignUp] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [newUser, setNewUser] = useState({})

    const signinHandleChange = ev => {
        const { name, value } = ev.target
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }

    const emailHandleChange = ev => {
        const email = ev.target.value
        setEmailSignUp(email)

    }
    const signupHandleChange = ev => {
        const { name, value } = ev.target
        if (name === 'email') {
            setEmailSignUp(value)
            console.log('emailSignUp is:', emailSignUp);
        }
        setNewUser(prevState => ({
            newUser: {
                ...prevState.newUser,
                [name]: value

            }
        }))
        console.log('newUser is:', newUser);
    }

    const dosignIn = async ev => {
        ev.preventDefault()
        if (!email || !password) {
            return setMsg('you need username and password')
        }
        try {
            const netflixUser = { email, password }
            console.log('netflixUser is:', netflixUser);
            const user = await dispatch(setNetflixUser(netflixUser))
            if (user) history.push('/user')
            else {
                setMsg('Username or Password is not ok :(')
            }

        } catch {
            console.log(' we have problem to login');
        }

    }

    const goToSignUp = ev => {
        ev.preventDefault()
        setLogin(true)
        setSignupModal(true)
    }

    const doSignUp = ev => {
        ev.preventDefault()
        const { username, fullname, password } = newUser.newUser
        if (!username || !fullname || !password) {
            console.log('im in');
            return setMsg('All inputs are required')
        }
        try {
            dispatch(signup(newUser))

        }
        catch {
            console.log('failed to try sign up');
        }
    }


    return (
        <div className="about-page">
            <img
                className="hero-image"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/8ef88e03-6f89-4c75-ae51-f8da7d252358/2ff1ee62-fcfb-451d-b85b-428037875aee/IL-he-20210208-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
            <div className="hero-contact">
                <div className="top-hero">
                    <img
                        onClick={() => setLogin(false)}
                        className="logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="" />
                    {!login && <button onClick={() => setLogin(!login)}>Login</button>}
                </div>

                {!login && <div className="botoom-hero">
                    <h1>Movies, TV shows and more unlimited.</h1>
                    <h2>Watch everywhere. Cancel at any stage.</h2>
                    <form onSubmit={goToSignUp}>
                        <h3>Want to start watching? Enter your email address to subscribe or reactivate a subscription.</h3>
                        <div className="submit-div">
                            <input type="text" placeholder="Email address" onChange={emailHandleChange} />
                            <button>Lets Go</button>
                        </div>
                    </form>
                </div>}

                {login && <div className="login-modal">
                    {!signupModal &&
                        <form onSubmit={dosignIn}>
                            <h1>Sign in</h1>
                            {msg && <span>{msg}</span>}
                            <input type="text" name="email" value={email} onChange={signinHandleChange} placeholder="Email or number" />
                            <input type="password" name="password" value={password} onChange={signinHandleChange} placeholder="Password" />
                            <button className="login-btn">Login</button>
                        </form>
                    }

                    {signupModal &&
                        <div>
                            <form onSubmit={doSignUp}>
                                {msg && <span>{msg}</span>}
                                <input type="text" name="email" value={emailSignUp} placeholder="Email" onChange={signupHandleChange} />
                                <input type="text" name="fullname" placeholder="Full Name" onChange={signupHandleChange} />
                                <input type="password" name="password" placeholder="Password" onChange={signupHandleChange} />
                                <input type="text" name="username" placeholder="User Name" onChange={signupHandleChange} />
                                <button className="login-btn">Do SingUp</button>
                            </form>
                        </div>}
                    {/*need to working on singup and connect the auth on login after we ave the singup */}
                    <span onClick={() => setSignupModal(!signupModal)} style={{ color: 'white' }}>
                        {signupModal ? 'you have user? go to login' : `New to Netflix? `}
                    </span>
                </div>}
            </div>
        </div>
    )
}
