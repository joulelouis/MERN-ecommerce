import { useContext, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function CartItemCard({ itemProp }) {
	const itemId = itemProp._id;

	const { user } = useContext(UserContext)

	const [ quantity, setQuantity ] = useState(1);
	const [ edit, setEdit ] = useState(false);

	useEffect(() => {
		setQuantity(itemProp.quantity);
	}, [])

	function confirmEdit(e) {

		e.preventDefault()

		fetch(`http://localhost:4000/user/cart/edit`, 
			{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				items: [
					{
						productId: itemProp.productId,
						quantity: quantity
					}
				]
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			
			if (data.message === 'Edit Success') {
				window.location.reload();

			} else {
				Swal.fire({
					title: "Error Occurred",
					icon: "error",
					html: "Oops! Something went wrong..."
				});
			}
		})
	}
	

	return (
			<Card className="mt-3 mb-3">
		     <Card.Body>
		       <Card.Title>
		       	<h5>{ itemProp.name }</h5>
		       </Card.Title>
		       <Card.Subtitle>Subtotal</Card.Subtitle>
		       <Card.Text>Php { itemProp.subTotal }</Card.Text>
		       <Card.Subtitle>Quantity</Card.Subtitle>
		       { edit ?
		       	 <>
		       	   <ButtonToolbar>
		       	   {
		       	   	  (quantity === 0) ?
			       	  	<Button variant="outline-success" onClick={e => setQuantity(quantity - 1)} disabled> - </Button>
			       	:
			       		<Button variant="outline-success" onClick={e => setQuantity(quantity - 1)} > - </Button>

			       	}
			       	  <Card.Text>{ quantity }</Card.Text>
			       	  <Button variant="outline-success" onClick={e => setQuantity(quantity + 1)}>
			       	  	+
			       	  </Button>
			       </ButtonToolbar>
		       	 </>
		       	:
		       	 <Card.Text>{ quantity }</Card.Text>
		   	   }
		   	   { edit ?
		   	   	 <>
			   	   	<Button 
			   	   	variant="success"
			   	   	onClick={ confirmEdit }>
			   	   		SAVE CHANGES
			   	   	</Button>
			   	   	<Button
			   	   	variant="secondary"
			   	   	className="mx-1"
			   	   	onClick={e => setEdit(false)}>
			   	   		CANCEL
			   	   	</Button>
			   	 </>
			   	:
			   	 <Button 
			   	 variant="dark"
			   	 onClick={e => setEdit(true)}>
			   	 EDIT
			   	 </Button>
		   	   }
		     </Card.Body>
		   </Card>
	)
}
