import { useState } from 'react';
import axios from 'axios';
import formData from 'form-data';
import { FiLoader, FiMail } from 'react-icons/fi';
import './static/forgot-password.css';

function ForgotPassword({ setPage }) {
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({})
	const [email, setEmail] = useState()
	async function send(e) {
		e.preventDefault()
		setLoading(true)
		const form = new formData()
		form.append('email', email)
		const res = await axios.post('http://192.168.1.3:8000/auth/forgot-password/', form)
		if (res.data === 601) {
			setAlert({color: '#DC3545', message: 'You don\'t have an account yet.'})
			setEmail('')
		} else if (res.data === 600) {
			setAlert({color: '#28A745', message: 'Link has been sent.'})
			setEmail('')
		}
		setLoading(false)
	}
	if (loading) {
		return <p className="loading"><FiLoader className="icon" /> Loading</p>
	}
	return (
		<section className="forgot-password">
			<div></div>
			<form className="form" onSubmit={send} method="POST">
				<div className="label">
					<h1>Forgot password</h1>
					<p className="alert" style={{ color: alert.color }}>{alert.message}</p>
				</div>
				<p className="description">Enter your email address that you<br />
											have an account with. We'll send a link<br />
											to your email to reset your password.</p>
				<div className="email">
					<label><FiMail className="icon" />Email address</label>
					<input type="email" placeholder="Email address" onChange={e => {setEmail(e.target.value)}} value={email} required />
				</div>
				<div className="submit">
					<button type="submit">Send link</button>
				</div>
			</form>
			<div className="options">
				<button onClick={() => {setPage('login')}}>Enter your account</button>
			</div>
		</section>
	)
}

export default ForgotPassword;
