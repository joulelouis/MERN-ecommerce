import { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function AdminUpdateProduct() {

	
	const navigate = useNavigate();
	const { productId } = useParams();

	const [ productName, setProductName ] = useState('');
	const [ description, setDescription ] = useState('');
	
	const [ price, setPrice ] = useState(999999);
	const [ isActive, setIsActive ] = useState(false);

	useEffect(() => {
		if (productName !== '' && description !== '' && price !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [productName, description, price]);



	console.log(productId);

	function updateProduct(e) {

		e.preventDefault();

		fetch(`http://localhost:4000/admin/product/update/${productId}`, 
		{
			method: "PUT",
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
			
			if (data.message === 'Product Updated') {
				Swal.fire({
					title: "Item Updated Successfully!",
					icon: "success"
				});

				navigate('/admin/product/all')

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
		        <Card.Title className="text-center">Edit Product</Card.Title>
		          	<Form onSubmit={ updateProduct }>

		                <Form.Group className="mb-3" controlId="productName">
		                  <Form.Label>Product Name</Form.Label>
		                  <Form.Control type="text" placeholder="Enter Product Name" value={ productName }onChange={ e => setProductName(e.target.value) } required/>
		                </Form.Group>

		                <Form.Group className="mb-3" controlId="description">
		                  <Form.Label>Description</Form.Label>
		                  <Form.Control as="textarea" rows={3} style={{ resize: "none" }} placeholder="Enter a short description" value={ description }onChange={ e => setDescription(e.target.value) }
required/>
		                </Form.Group>

		                

		                <Form.Group className="mb-3" controlId="price">
		                  <Form.Label>Price</Form.Label>
		                  <Form.Control 
		                  	type="tel" 
		                  	placeholder="Enter Price" 
		                  	value={ price }
		                  	onChange={ e => setPrice(e.target.value) }
		                  	required/>
		                </Form.Group>

	                      { isActive ? 
	                    		<Button 
		                    		variant="primary" 
		                    		type="submit" 
		                    		id="submitBtn">
	                    		  	SAVE CHANGES
	                    		</Button>
	                    		:
	                    		<Button 
		                    		variant="secondary" 
		                    		type="submit" 
		                    		id="submitBtn" 
		                    		disabled>
	                    		  	SAVE CHANGES
	                    		</Button>
	                		}
		            </Form>
		      </Card.Body>
		    </Card>
	)
}