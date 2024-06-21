
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/header';
import Authentication from './Components/authentication/authentication';
import Home from './Components/home/home';
import CardList from './Components/card-list/card-list';
import { Provider } from 'react-redux';
import store from './Components/redux';
import Shop from './Components/shop/shop';
import ContactPage from './Components/contact/contact';

function App() {
  
  return (
    <div>
      <Provider store={store}>
     
      <Router>
        <Header />

      <Routes>
        <Route path='/signup' element={<Authentication/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path='/hats' element={<CardList num={0}/>}/>
        <Route path='/sneakers' element={<CardList num={1}/>}/>
        <Route path='/jackets' element={<CardList num={2}/>}/>
        <Route path='/womens' element={<CardList num={3}/>}/>
        <Route path='/mens' element={<CardList num={4}/>}/>
        <Route path="/shops" element={<Shop/>}/>
        <Route path="/contact" element={<ContactPage/>}/>
      </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;

