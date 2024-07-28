import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function AdminCreateProduct() {

	const navigate = useNavigate();

	const [ productName, setProductName ] = useState('');
	const [ description, setDescription ] = useState('');
	
	const [ price, setPrice ] = useState(0);
	const [ isActive, setIsActive ] = useState(false);

	useEffect(() => {
		if (productName !== '' && description !== '' && price !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [productName, description, price]);

	function addProduct(e) {

		e.preventDefault();

		fetch(`http://localhost:4000/admin/product/add-item`, 
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${ localStorage.getItem('token') }`
			},
			body: JSON.stringify({
				name: productName,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);
			
			if (data.message === 'Item add success') {
				Swal.fire({
					title: "Item Added Successfully!",
					icon: "success",
				});

				navigate('/admin/product/all');

			} else if (data.message === 'Item already exists') {
				Swal.fire({
					title: "Duplicate Item Found",
					icon: "error",
				});

			} else {
				Swal.fire({
					title: "Error Occurred",
					icon: "error",
					html: "Oops! Something went wrong... <br> Please check your input"
				});
			}
		})
	}

	return (
		<Card className="w-50 mt-5 mx-auto">
		      <Card.Body>
		        <Card.Title className="text-center">Create Product</Card.Title>
		          	<Form onSubmit={ addProduct }>

		                <Form.Group className="mb-3" controlId="productName">
		                  <Form.Label>Product Name</Form.Label>
		                  <Form.Control type="text" placeholder="Enter Product Name" value={ productName } onChange={ e => setProductName(e.target.value) }required/>
		                </Form.Group>

		                <Form.Group className="mb-3" controlId="description">
		                  <Form.Label>Description</Form.Label>
		                  <Form.Control as="textarea" rows={3} style={{ resize: "none" }} placeholder="Enter a short description" value={ description } onChange={ e => setDescription(e.target.value) } required/>
		                </Form.Group>

		                

		                <Form.Group className="mb-3" controlId="price">
		                  <Form.Label>Price</Form.Label>
		                  <Form.Control type="tel" placeholder="Enter Price" value={ price } onChange={ e => setPrice(e.target.value) } required/>
		                </Form.Group>

	                      { 
	                      	isActive ? 
	                    		<Button variant="primary" type="submit" id="submitBtn">Create Product</Button>
	                    	:
	                    		<Button variant="secondary" type="submit" id="submitBtn" disabled> Create Product</Button>
	                		}
		            </Form>
		      </Card.Body>
		    </Card>
	)
}