import { useState } from 'react';
import axios from 'axios';
import formData from 'form-data';
import { FiLoader, FiUser, FiMail, FiLock } from 'react-icons/fi';
import './static/register.css';

function Register({ setPage }) {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({})
	const [username, setUsername] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [confirm_password, setConfirm_password] = useState()
	async function register(e) {
		e.preventDefault()
		setLoading(true)
		const form = new formData()
		form.append('username', username)
		form.append('email', email)
		form.append('password', password)
		if (password !== confirm_password) {
			setAlert({color: '#DC3545', message: 'Passwords don\'t match.'})
			setPassword('')
			setConfirm_password('')
			setLoading(false)
			return
		}
		const res = await axios.post('http://192.168.1.3:8000/auth/register/', form)
		if (res.data === 601) {
			setAlert({color: '#DC3545', message: 'Username already exists.'})
			setUsername('')
		} else if (res.data === 602) {
			setAlert({color: '#DC3545', message: 'Email already exists.'})
			setEmail('')
		} else if (res.data === 600) {
			setAlert({color: '#28A745', message: 'Your account has been created.'})
			setUsername('')
			setEmail('')
			setPassword('')
			setConfirm_password('')
		}
		setLoading(false)
	}
	if (loading) {
		return <p className="loading"><FiLoader className="icon" /> Loading</p>
	}
	return (
		<section className="register">
			<div></div>
			<form className="form" onSubmit={register} method="POST">
				<div className="label">
					<h1>Create new account</h1>
					<p className="alert" style={{ color: alert.color }}>{alert.message}</p>
				</div>
				<div className="username">
					<label><FiUser className="icon" />Username</label>
					<input type="text" placeholder="Username" onChange={e => {setUsername(e.target.value)}} value={username} required />
				</div>
				<div className="email">
					<label><FiMail className="icon" />Email address</label>
					<input type="email" placeholder="Email address" onChange={e => {setEmail(e.target.value)}} value={email} required />
				</div>
				<div className="password">
					<label><FiLock className="icon" />Password</label>
					<input type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}} value={password} required />
				</div>
				<div className="confirm-password">
					<label><FiLock className="icon" />Confirm password</label>
					<input type="password" placeholder="Confirm password" onChange={e => {setConfirm_password(e.target.value)}} value={confirm_password} required />
				</div>
				<div className="submit">
					<button type="submit">Sign up</button>
				</div>
			</form>
			<div className="options">
				<button onClick={() => {setPage('login')}}>Enter your account</button>
			</div>
		</section>
	)
}

export default Register;
