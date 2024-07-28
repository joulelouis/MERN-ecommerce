import { useContext } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import UserContext from '../UserContext';



// ========== CODE PROPER ==========
export default function AppNavbar() {

	const { user } = useContext(UserContext);


	return (
	     <Navbar bg="secondary" expand="lg" className="sticky-top">
	       <Container>
 	       	 
	        <Navbar.Brand href="#home">
	           Joule's Ecommerce
	         </Navbar.Brand>
	         <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">


               <Nav className="ms-auto">

               { 
               	(user.id !== null && user.isAdmin === true) ?

               		<Nav.Link as={Link} to="/logout" exact="true">Sign out</Nav.Link>

               :
               	(user.id !== null) ? 
               		<>

               			<Nav.Link as={Link} to="/user/product/all" exact="true">Our Products</Nav.Link>
	               		<Nav.Link as={Link} to="/user/cart" exact="true">Cart</Nav.Link>
		               	<Nav.Link as={Link} to="/logout" exact="true">Sign out</Nav.Link>
	
	               	</>
	               :
	               	<>
	               		<Nav.Link as={ NavLink } to="/user/login" exact="true">Sign In</Nav.Link>
		               	<Nav.Link as={ NavLink } to="/user/register" exact="true">Register</Nav.Link>
	               			
		               </>
	                 
               }
               </Nav>
             </Navbar.Collapse>
	       </Container>
	     </Navbar>
	)
}