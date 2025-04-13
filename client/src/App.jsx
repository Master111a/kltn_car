/** @format */
import Playground from "./components/Playground/Playground";
import HomePage from "./components/HomePage/index";
import Onboarding from "./components/Onboarding/index";
import SignUpForm from "./components/SignUpForm/index";
import LoginForm from "./components/LoginForm/index";
import StorePage from "./pages/StorePage";
import "./App.css";
// import { Canvas } from "@react-three/fiber";
// import setUpCamera from "./utils/cameraUtils/camera";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/admin";
import AdminAccount from "./admin/admin-account/AdminAccount";
import AdminOrder from "./admin/admin-order/AdminOrder";
import AdminProduct from "./admin/admin-product/AdminProduct";
import AdminReport from "./admin/admin-report/AdminReport";
import AddAccount from "./admin/admin-account/AddAcount";
import Dashboard from "./admin/components/Dashboard";
import AddOrder from "./admin/admin-order/AddOrder";
import AddProduct from "./admin/admin-product/AddProduct";
import AddReport from "./admin/admin-report/AddReport";

const App = () => {
    return (
        // <>
        //   <Playground />
        //   {/* <StorePage /> */}
        // </>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin/*" element={<Admin />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="admin-account" element={<AdminAccount />} />
                    <Route
                        path="admin-account/add-account"
                        element={<AddAccount />}
                    />
                    <Route path="admin-order" element={<AdminOrder />} />
                    <Route
                        path="admin-order/add-order"
                        element={<AddOrder />}
                    />
                    <Route path="admin-product" element={<AdminProduct />} />
                    <Route
                        path="admin-product/add-product"
                        element={<AddProduct />}
                    />
                    <Route path="admin-report" element={<AdminReport />} />
                    <Route
                        path="admin-report/add-report"
                        element={<AddReport />}
                    />
                </Route>
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/store" element={<StorePage />} />
                <Route path="/customize/:carId" element={<Playground />} />
            </Routes>
        </Router>
    );
};

export default App;
