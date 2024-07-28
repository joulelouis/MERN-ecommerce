import { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function Login() {

	const { user, setUser } = useContext(UserContext);

	
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [status, setStatus] = useState(true);


	useEffect(() => {
		if (loginEmail !== '' && loginPassword !== '') {
			setStatus(false);
		} else {
			setStatus(true);
		}

	}, [loginEmail, loginPassword]);

	function loginUser(e) {
	
		e.preventDefault();

		fetch('http://localhost:4000/user/login', 
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: loginEmail,
				password: loginPassword
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);
			
	
			if (typeof data.access !== "undefined") {

				localStorage.setItem('token', data.access);
				retrieveUserDetails(data.access);

				Swal.fire({
					title: "Sign in Successful",
					icon: "success",
					text: `Welcome back!`
				});
			} 
			else {

				Swal.fire({
					title: "Sign in Failed",
					icon: "error",
					text: "Please try again."
				});
			}
		});

		setLoginEmail('');
		setLoginPassword('');
	}

	const retrieveUserDetails = (token) => {

		fetch("http://localhost:4000/user/details", {
				headers: {
					Authorization: `Bearer ${ token }`
				}
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			setUser({
				id: data._id,
				isAdmin: data.isAdmin,
				firstName: data.firstName
			})
		})
	}		

	return (

		(user.id !== null && user.isAdmin === true ) ?
			<Navigate to="/admin/product/all" />


		: 

		(user.id !== null) ?
			<Navigate to="/user/product/all" />
		:
		<>
		
			<Row>
				<Col className="text-center py-5">
					<h1>Welcome to Joule's Ecommerce</h1>
				</Col>
			</Row>

			<Form onSubmit={ loginUser }>
		      <Form.Group className="mb-3" controlId="email">
		        <Form.Label>Email</Form.Label>
		        <Form.Control type="text" placeholder="Enter email" value={ loginEmail } onChange={ e => setLoginEmail(e.target.value) }required /></Form.Group>

		      <Form.Group className="mb-3" controlId="password">
		        <Form.Label>Password</Form.Label>
		        <Form.Control type="password" placeholder="Password" value={ loginPassword } onChange={ e => setLoginPassword(e.target.value) } required /></Form.Group>

		      <Row>
		      	<Col>
			      	<Button variant="primary" type="submit" id="submitBtn" disabled= { status ? true : false }>Sign in</Button>
			    </Col>
			    <Col className="d-inline-block col-4">
			      	<p>
			      		Don't have an account yet? <Link to="/user/register" style={{ textDecoration: "none" }}>Click here</Link> to register.
			      	</p>
		      	</Col>
		  	  </Row>
		    </Form>
		
		</>
	);
}