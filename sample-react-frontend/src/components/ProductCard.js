import { useContext } from 'react';
import { Container, Button, ButtonToolbar, Dropdown, DropdownButton, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function ProductCard({ productProp }) {
	const productId = productProp._id;

	const { user } = useContext(UserContext)
	
	function archiveProduct() {
		fetch(`http://localhost:4000/admin/product/${ productId }/status`, 
			{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: false
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			
			if (data.message === 'Product Archived') {
				Swal.fire({
					title: "Item Archived Successfully!",
					icon: "success"
				}).then(function() {
						window.location.reload();
					}
				);

			} else {
				Swal.fire({
					title: "Error Occurred",
					icon: "error",
					html: "Oops! Something went wrong..."
				});
			}
		})
	}

	function activateProduct() {
		fetch(`http://localhost:4000/admin/product/${ productId }/status`, 
			{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				isActive: true
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			
			if (data.message === 'Product Activated') {
				Swal.fire({
					title: "Item Activated Successfully!",
					icon: "success"
				}).then(function() {
						window.location.reload();
					}
				);

			} else {
				Swal.fire({
					title: "Error Occurred",
					icon: "error",
					html: "Oops! Something went wrong..."
				});
			}
		})
	}

	function addToCart(e) {
		e.preventDefault();

		fetch(`http://localhost:4000/user/product/${ productId }`)
		.then(res => res.json())
		.then(data => {

			console.log(data.name);

			fetch(`http://localhost:4000/user/product/${ productId }`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${ localStorage.getItem('token') }`
					},
					body: JSON.stringify({
						items: [
							{
								productId: productId,
								name: data.name,
								description: data.description,
								price: data.price,
								quantity: 1
							}
						]
					})
				})
			.then(res => res.json())
			.then(data => {
				console.log(data);

				if (data.message === "Added to Cart") {
					Swal.fire({
						title: "Added to Cart!",
						icon: "success",
						text: "Successfully added the item to cart"
					});

				} 

				else if (data.message === "Item Already in Cart") {

					Swal.fire({
						title: "Item Already Added",
						icon: "error",
						text: "Proceed to cart to verify the item."
					});

				} 
				else if (data.message === "Added Item") {

					Swal.fire({
						title: "Added to Cart!",
						icon: "success",
						text: "Successfully added the item to cart"
					});

				}
			});
		});
	}

	return (

		
			
				<Card  className="mt-3 mb-3">
			     <Card.Body>
			       <Card.Title>
			       	<h5>{ productProp.name }</h5>
			       </Card.Title>
			       <Card.Subtitle>Price</Card.Subtitle>
			       <Card.Text>Php { productProp.price }</Card.Text>

			       {
			       	user.isAdmin ? 
			       		<>
			       			<Card.Subtitle>Description</Card.Subtitle>
			       			<Card.Text>{ productProp.description }</Card.Text>
			       			<Card.Subtitle>Category</Card.Subtitle>
			       			<Card.Text>{ productProp.category }</Card.Text>
			       	       <Card.Subtitle>Status</Card.Subtitle>
			       	       <Card.Text>{ productProp.isActive ? 
			       	       		<span style={{ color: "green" }}>Active</span> : <span style={{ color: "red" }}>Not Active</span>  
			       	       			}
			       	       </Card.Text>

			       	       <ButtonToolbar>
			       		       	<Button variant="primary" as={ Link } to={"/admin/product/update/" + productProp._id}>
			       		       	Edit
			       		       	</Button>

			       		       	<DropdownButton title="Toggle Status" variant="outline-primary" className="mx-1">
			       		       	        <Dropdown.Item onClick={ activateProduct }>Activate</Dropdown.Item>
			       		       	        <Dropdown.Item onClick={ archiveProduct }>Archive</Dropdown.Item>
			       		       	</DropdownButton>

			       		      	<Button 
			       		      	variant="danger">
			       		      	Delete</Button>
			       		   </ButtonToolbar>
			       		</>

			       	: user.isAdmin == null ? 

			       			<Button 
			       			variant="warning"
			       			as={ Link }
			       			to={ "/user/product/" + productProp._id }>
			       			Product Details
			       			</Button> 

			       		: 
			       		 <ButtonToolbar>
				       			<Button 
				       			variant="secondary"
				       			as={ Link }
				       			to={ "/user/product/" + productProp._id }>
				       			Product Details
				       			</Button>

				       			<Button 
				       			variant="primary" 
				       			className="mx-1"
				       			onClick={ addToCart }>
				       			Add to Cart
				       			</Button>
			       			</ButtonToolbar>
			       }
			       
			     </Card.Body>
			   </Card>
			  
		
	)
}
