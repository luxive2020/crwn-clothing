import React from 'react';
import { BrowserRouter, Redirect, Routes, Route,Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-signup/sign-in-and-signup.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';





class App extends React.Component{

  unsubscribeFromAuth = null;

 componentDidMount(){
  const {setCurrentUser } = this.props;
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
          
            id : snapShot.id,
            ...snapShot.data()
        });
      });
    }
    setCurrentUser(userAuth);
  });
 }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div className="App">
        <Header />
       <BrowserRouter>
       <Routes>
          <Route 
                 path='/'
                element={ <HomePage /> } 
          />
           <Route 
                  path='/shop' element={ <ShopPage /> } 
            />
           <Route  path='/signin' element={               <SignInAndSignUpPage />}
           />
               
       </Routes>
       </BrowserRouter>
        
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(
  null, mapDispatchToProps
) (App);
