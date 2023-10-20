import { useState } from 'react';
import axios from 'axios';
import formData from 'form-data';
import { FiLoader, FiUser, FiLock } from 'react-icons/fi';
import './static/login.css';

function Login({ setPage }) {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({})
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	async function login(e) {
		e.preventDefault()
		setLoading(true)
		const form = new formData()
		form.append('username', username)
		form.append('password', password)
		const res = await axios.post('http://192.168.1.3:8000/auth/login/', form)
		if (res.data === 601) {
			setAlert({color: '#DC3545', message: 'Invalid credential.'})
			setPassword('')
		} else {
			setAlert({color: '#28A745', message: 'Welcome back.'})
			setUsername('')
			setPassword('')
		}
		setLoading(false)
	}
	if (loading) {
		return <p className="loading"><FiLoader className="icon" /> Loading</p>
	}
	return (
		<section className="login">
			<div></div>
			<form className="form" onSubmit={login} method="POST">
				<div className="label">
					<h1>Enter your account</h1>
					<p className="alert" style={{ color: alert.color }}>{alert.message}</p>
				</div>
				<div className="username">
					<label><FiUser className="icon" />Username</label>
					<input type="text" placeholder="Username" onChange={e => {setUsername(e.target.value)}} value={username} required />
				</div>
				<div className="password">
					<label><FiLock className="icon" />Password</label>
					<input type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}} value={password} required />
					<p onClick={() => {setPage('forgot-password')}}>Forgot your password?</p>
				</div>
				<div className="submit">
					<button type="submit">Sign in</button>
				</div>
			</form>
			<div className="options">
				<button onClick={() => {setPage('register')}}>Create new account</button>
			</div>
		</section>
	)
}

export default Login;
