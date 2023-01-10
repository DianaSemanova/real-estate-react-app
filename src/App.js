import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CreateHome from './components/Homes/CreateHome';
import SignUpPage from './components/User/SignUpPage';
import AllHomes from './components/Homes/AllHomes';
import HomeDetails from './components/Homes/HomeDetails';
import SignInPage from './components/User/SignInPage';
import Rent from './components/Rent/Rent';
import NewsList from './components/News/NewsList';
import Profile from './components/User/Profile';
import ChangeEmail from './components/User/ChangeEmail';
import ChangePassword from './components/User/ChangePassword';
import { UserProvider } from './context/UserContext';
import CreateLand from './components/Land/CreateLand';
import AllLands from './components/Land/AllLands';
import LandDetails from './components/Land/LandDetails';
import Admin from './components/User/Admin';
import { ToastContainer } from 'react-toastify';
import EditLand from './components/EditLand/EditLand';

function App() {
    return (
        <div className="App">
            <UserProvider>
                <BrowserRouter>
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/create-home" element={<CreateHome />} />
                            <Route path="/create-land" element={<CreateLand />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/all-homes" element={<AllHomes />} />
                            <Route path="/all-lands" element={<AllLands />} />
                            <Route path="/home-details" element={<HomeDetails />} />
                            <Route path="/land-details" element={<LandDetails />} />
                            <Route path="/edit-land/:id" element={<EditLand/>}/>
                            <Route path="/rent" element={<Rent />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/change-email" element={<ChangeEmail />} />
                            <Route path="/change-password" element={<ChangePassword />} />
                            <Route path="/news" element={<NewsList />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </main>
                    <Footer />
                </BrowserRouter>
            </UserProvider>

            <ToastContainer />
        </div>
    );
}

export default App;
