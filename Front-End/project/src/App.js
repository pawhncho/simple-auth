import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ForgotPassword from './ForgotPassword.js';
import ResetPassword from './ResetPassword.js';

function Main() {
	const [page, setPage] = useState()
	useEffect(() => {
		setPage('login')
	}, [])
	if (page === 'login') {
		return (
			<main style={{ height: window.innerHeight }}>
				<Login setPage={setPage} />
			</main>
		)
	} else if (page === 'register') {
		return (
			<main style={{ height: window.innerHeight }}>
				<Register setPage={setPage} />
			</main>
		)
	} else if (page === 'forgot-password') {
		return (
			<main style={{ height: window.innerHeight }}>
				<ForgotPassword setPage={setPage} />
			</main>
		)
	}
}

function ChangePassword() {
	return (
		<main style={{ height: window.innerHeight }}>
			<ResetPassword />
		</main>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='reset-password/:token/' element={<ChangePassword />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;
