import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('/api/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			navigate('/login')
		}
	}

	return (
		<div className='auth-div'>
			<h1>Register</h1>
			<form className='auth' onSubmit={registerUser}>
				<input
					className='username'
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					className='username'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					className='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<div className="btn-div">
				<input className='submitBtn' type="submit" value="Register" />

				<button className="submitBtn" onClick={()=>{navigate('/login')}}>Login</button>
				</div>
			</form>
		</div>
	)
}

export default Register
