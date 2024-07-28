import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';



export default function Cart() {

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
					<CartItemCard key={ item._id } itemProp={ item } />
				)
			}));
		});
	}, []);

	return (
		<>
			{ cartItems }
			<h5 className="my-3">Total Amount: { totalAmount }</h5>
			<Button variant="primary" as={ Link } to='/user/product/all'>
			Add Items
			</Button>
			<Button className="mx-5" variant="primary" as={ Link } to='/user/cart/checkout'>
			Checkout
			</Button>
		</>
	)
}