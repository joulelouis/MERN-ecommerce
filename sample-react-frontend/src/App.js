import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductView from './components/ProductView';
import AppNavbar from './components/AppNavbar';
import AdminCreateProduct from './pages/AdminCreateProduct';
import AdminDashboard from './pages/AdminDashboard';
import AdminUpdateProduct from './pages/AdminUpdateProduct';
import Cart from './pages/Cart';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import Login from './pages/Signin';
import Register from './pages/Register';
import Home from './pages/Home'
import Logout from './pages/Logout'
import { UserProvider } from './UserContext'


function App() {

  const [ user, setUser ] = useState({ 

    id: null,
    isAdmin: null
  });

  const unsetUser = () => {

    localStorage.clear();
  }

  useEffect(() => {

    if (localStorage.getItem('token') !== null) {

      fetch(`http://localhost:4000/user/details`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {

        console.log(data)

        setUser({

          id: data._id,
          isAdmin: data.isAdmin
        });
      })

    } 
    else {

      setUser({

        id: null,
        isAdmin: null
      });
    }
    
  }, [])

  return (

    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        
        <AppNavbar/>
        
        <Container>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/user/register" element={ <Register /> } />
            <Route path="/user/login" element={ <Login /> } />
            <Route path="/logout" element={<Logout />} />

            <Route path="/user/product/all" element={ <Catalog /> } />
            <Route path="/user/product/:productId" element={ <ProductView /> } />

            <Route path="/user/cart" element={ <Cart /> } />
            <Route path="/user/cart/checkout" element={ <Checkout /> } />     
            
            <Route path="/admin/product/add-item" element={ <AdminCreateProduct /> } />
            <Route path="/admin/product/all" element={ <AdminDashboard /> } />
            <Route path="/admin/product/update/:productId" element={ <AdminUpdateProduct /> } />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
