// ========== IMPORT BUILT-IN REACT MODULES ==========
import { useContext, useEffect, useState } from 'react';

// ========== IMPORT DOWNLOADED PACKAGE MODULES ==========
import { Button, ButtonToolbar, Dropdown, DropdownButton, Card, Form, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// ========== IMPORT USER-DEFINED MODULES ==========
import UserContext from '../UserContext';



// ========== CODE PROPER ==========
export default function CheckoutTable({ itemProp }) {

	const { user } = useContext(UserContext)

	const [ name, setProductName ] = useState('');
	const [ quantity, setQuantity ] = useState(0);
	const [ subTotal, setSubTotal ] = useState(0);

	
	useEffect(() => {
		setProductName(itemProp.name);
		setQuantity(itemProp.quantity);
		setSubTotal(itemProp.subTotal);
	}, []);

	return (
			<tr>
				<td>{ name }</td>
				<td>{ quantity }</td>
				<td>{ subTotal }</td>
				<td></td>
			</tr>
	)
}
