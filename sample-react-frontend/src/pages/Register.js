// ========== IMPORT BUILT-IN REACT MODULES ==========
import { useState, useEffect, useContext } from 'react';

// ========== IMPORT DOWNLOADED PACKAGE MODULES ==========
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// ========== IMPORT USER-DEFINED MODULES ==========
import UserContext from '../UserContext';



// ========== CODE PROPER ==========
export default function Register() {

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2, setPassword2] = useState('');
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if ((firstName !== '' && lastName !== '' && mobileNo !== "" && email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [ firstName, lastName, mobileNo, email, password1, password2]);

	function registerUser(e) {

		e.preventDefault();

		fetch('http://localhost:4000/user/register', 
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				mobileNo: mobileNo,
				email: email,
				password: password2
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);
			
			if (data.message === 'Register success') {
				Swal.fire({
					title: "Registration Successful",
					icon: "success",
					text: "Please sign in!"
				});

				navigate('/user/login');

			} else if (data.message === 'Duplicate email') {
				Swal.fire({
					title: "Duplicate Email Found",
					icon: "error",
					text: "Please provide a different email."
				});

			} 

			else {
				Swal.fire({
					title: "Error Occurred",
					icon: "error",
					text: "Oops! Something went wrong.."
				});
			}
			
		});

		
		setFirstName('');
		setLastName('');
		setMobileNo('');
		setEmail('');
		setPassword1('');
		setPassword2('');
	}

	return (

		(user.id !== null) ?
			<Navigate to="/user/product/all" />
		:
 
			<Form className="mt-3" onSubmit={ registerUser }>
		     
		      <Form.Group className="mb-3" controlId="userFirstName">
		        <Form.Label>First Name</Form.Label>
		        <Form.Control 
		        	type="text" 
		        	placeholder="Enter First Name" 
		        	value={ firstName }
		        	onChange={ e => setFirstName(e.target.value) }
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="userLastName">
		        <Form.Label>Last Name</Form.Label>
		        <Form.Control 
		        	type="text" 
		        	placeholder="Enter Last Name" 
		        	value={ lastName }
		        	onChange={ e => setLastName(e.target.value) }
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="userMobileNo">
		        <Form.Label>Mobile Number</Form.Label>
		        <Form.Control 
		        	type="text" 
		        	placeholder="Enter Mobile Number" 
		        	value={ mobileNo }
		        	minLength={11}
		        	maxLength={11}
		        	onChange={ e => setMobileNo(e.target.value) }
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="userEmail">
		        <Form.Label>Email address</Form.Label>
		        <Form.Control 
		        	type="email" 
		        	placeholder="Enter email" 
		        	value={ email }
		        	onChange={ e => setEmail(e.target.value) }
		        	required/>
		        <Form.Text className="text-muted">
		          We'll never share your email with anyone else.
		        </Form.Text>
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="password1">
		        <Form.Label>Password</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Password"
		        	value={ password1 }
		        	onChange={ e => setPassword1(e.target.value) } 
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3" controlId="password2">
		        <Form.Label>Verify Password</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Verify Password"
		        	value={ password2 }
		        	onChange={ e => setPassword2(e.target.value) }
		        	required/>
		      </Form.Group>
		      <Row>
		      	<Col>
		      { isActive ? 
		      		<Button variant="primary" type="submit" id="submitBtn">
		      		  Register
		      		</Button>
		      		:
		      		<Button variant="secondary" type="submit" id="submitBtn" disabled>
		      		  Register
		      		</Button>
		  		}
		  		</Col>

		  		<Col className="d-inline-block col-4">
		  			<p>
		  				Already have an account? <Link to="/user/login" style={{ textDecoration: "none" }}>Click here</Link> to sign-in.
		  			</p>
		  		</Col>
		  	  </Row>

		    </Form>
	)
}