import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductView() {

	const { productId } = useParams();	

	const [ name, setProductName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ price, setPrice ] = useState(0);

	useEffect(() => {

		fetch(`http://localhost:4000/user/product/${productId}`)
			.then(res => res.json())
			.then(data => {

				setProductName(data.name);
				setDescription(data.description);
				setPrice(data.price);
			})
	}, [productId])

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
								category: data.category,
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
						text: "You have successfully added the item/s to your cart"
					});

				} else if (data.message === "Item Already in Cart") {

					Swal.fire({
						title: "Item Already Added",
						icon: "error",
						text: "Please proceed to your cart to edit its quantity"
					});

				} else if (data.message === "Added Item") {

					Swal.fire({
						title: "Added to Cart!",
						icon: "success",
						text: "You have successfully added the item/s to your cart"
					});

				}
			});
		});
	}

	return (

		<Container>
			<Row>
				<Col lg={{ span: 5, offset: 3}}>
					<Card className="my-3">
						<Card.Body>
						  <Card.Title>
						  	<h5>{ name }</h5>
						  </Card.Title>
						  <Card.Subtitle>Description</Card.Subtitle>
						  <Card.Text>{ description }</Card.Text>
						  <Card.Subtitle>Price</Card.Subtitle>
						  <Card.Text>Php { price }</Card.Text>
						  
						  	<Button variant="primary" block="true" onClick={ addToCart }>Add to cart</Button>
						  	<Button className="mx-3" variant="primary" block="true" as={ Link } to="/user/product/all">Back to products</Button>

						</Card.Body>
					</Card>
				</Col>	
			</Row>
		</Container>
	)
}