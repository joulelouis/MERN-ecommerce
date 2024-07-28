import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';



export default function Products() {

	const [products, setProducts] = useState([]);

	useEffect(() => {

		fetch(`http://localhost:4000/admin/product/all`, {
				headers: {
					Authorization: `Bearer ${ localStorage.getItem("token") }`
				}
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

				setProducts(data.map(product => {

					return (
						<ProductCard key={ product._id } productProp={ product } />
					)
				}));
			})
	}, []);

	return (
		<>


			<Button className="mt-3" variant="primary" as={ Link } to="/admin/product/add-item"> Create Product </Button>

			{ products }

			
		</>
	)
}