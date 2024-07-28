import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';


export default function Catalog() {

	const [products, setProducts] = useState([]);

	useEffect(() => {

		fetch(`http://localhost:4000/user/product/all`)
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
			
			<h3 className="mt-3">Our Products</h3>
			{ products }
			
		</>
	)
}