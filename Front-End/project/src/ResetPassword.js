import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import formData from 'form-data';
import { FiLoader, FiLock } from 'react-icons/fi';
import './static/reset-password.css';

function ResetPassword() {
	const { token } = useParams()
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState({})
	const [password, setPassword] = useState()
	const [confirm_password, setConfirm_password] = useState()
	useEffect(() => {
		async function verify() {
			await axios.get('http://192.168.1.3:8000/auth/verify-reset-password/' + token + '/').then(res => {
				if (res.data === 601) {
					setAlert({color: '#DC3545', message: 'Your token has been expired.'})
				} else if (res.data === 600) {
					setAlert({})
				}
			})
		}
		setLoading(true)
		verify()
		setLoading(false)
	}, [token])
	async function reset(e) {
		e.preventDefault()
		setLoading(true)
		const form = new formData()
		form.append('password', password)
		if (password !== confirm_password) {
			setAlert({color: '#DC3545', message: 'Passwords don\'t match.'})
			setPassword('')
			setConfirm_password('')
			setLoading(false)
			return
		}
		const res = await axios.post('http://192.168.1.3:8000/auth/reset-password/' + token + '/', form)
		if (res.data === 602) {
			setAlert({color: '#DC3545', message: 'You can\'t use your previous password.'})
			setPassword('')
			setConfirm_password('')
		} else if (res.data === 601) {
			setAlert({color: '#DC3545', message: 'Your token has been expired.'})
			setPassword('')
			setConfirm_password('')
		} else if (res.data === 600) {
			setAlert({color: '#28A745', message: 'Your password has been changed.'})
			setPassword('')
			setConfirm_password('')
		}
		setLoading(false)
	}
	if (loading) {
		return <p className="loading"><FiLoader className="icon" /> Loading</p>
	}
	return (
		<section style={{ height: window.innerHeight }} className="reset-password">
			<div></div>
			<form className="form" onSubmit={reset} method="POST">
				<div className="label">
					<h1>Reset your password</h1>
					<p className="alert" style={{ color: alert.color }}>{alert.message}</p>
				</div>
				<p className="description">Enter and confirm your new password<br />
											to change it. If you have remembered your<br />
											previous password you can leave this page.</p>
				<div className="password">
					<label><FiLock className="icon" />New password</label>
					<input type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}} value={password} required />
				</div>
				<div className="confirm-password">
					<label><FiLock className="icon" />Confirm new password</label>
					<input type="password" placeholder="Confirm password" onChange={e => {setConfirm_password(e.target.value)}} value={confirm_password} required />
				</div>
				<div className="submit">
					<button type="submit">Reset password</button>
				</div>
			</form>
			<div></div>
		</section>
	)
}

export default ResetPassword;
