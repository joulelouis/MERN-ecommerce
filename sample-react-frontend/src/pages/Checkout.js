import { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import CheckoutTable from '../components/CheckoutTable';


export default function Checkout() {

	const [ cartItems, setCartItems ] = useState([]);
	const [ totalAmount, setTotalAmount ] = useState(0);

	useEffect(() => {

		fetch("http://localhost:4000/user/cart", 
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${ localStorage.getItem('token') }`
				}

			})
		.then(res => res.json())
		.then(data => {
			setTotalAmount(data.totalAmount);
		});
	}, [totalAmount]);

	useEffect(() => {

		fetch("http://localhost:4000/user/cart", 
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${ localStorage.getItem('token') }`
				}

	
			})
		.then(res => res.json())
		.then(data => {

			setCartItems(data.items.map(item => {

				return (
					<CheckoutTable key={ item._id } itemProp={ item } />
				)
			}));
		});
	}, []);

	return (
		<>
			<Row>
				<Col className="text-center py-5">
					<h1>Thank you for Purchasing!</h1>
				</Col>
			</Row>
			<Table striped>
				<thead>	
					<tr>
						<th>Product Name</th>
						<th>Quantity</th>
						<th>Subtotal</th>
						<th>Total Amount</th>
					</tr>	
				</thead>
				<tbody>
					{ cartItems }
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td>{ totalAmount }</td>
					</tr>
				</tbody>
			</Table>
		</>
	)
}