import "./Login.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
		

		if (data.user) {
			localStorage.setItem('user_id',data.userdata._id)
			localStorage.setItem('token', data.user)
			alert('Login successful')
			navigate('/Home')
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div className="auth-div">
			<h1>Login</h1>
			<form className="auth" onSubmit={loginUser}>
				<input
					className="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					className="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<div className="btn-div">
				<input className="submitBtn" type="submit" value="Login" />				
				<p> or </p>
				<button className="submitBtn" onClick={()=>{navigate('/register')}}>Register</button>
				</div>
			</form>
		</div>
	)
}

export default Login