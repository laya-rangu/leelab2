import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import People from "./pages/People";
import Publications from "./pages/Publications";
import Research from "./pages/Research";
import Teaching from "./pages/Teaching";
import News from "./pages/News";
import Contact from "./pages/Contact";

import DashboardAdmin from "./pages/DashboardAdmin";
import ManagePeople from "./pages/ManagePeople";
import ManagePublications from "./pages/ManagePublications";
import ManageResearch from "./pages/ManageResearch";
import ManageTeaching from "./pages/ManageTeaching";
import ManageNews from "./pages/ManageNews";
import ManageUsers from "./components/ManageUsers";
import ViewForms from "./pages/ViewForms";
import RequestMaterials from "./components/RequestMaterials";
import ViewMaterialRequests from "./components/ViewMaterialRequests";
import ManageEquipment from "./pages/ManageEquipment";
import ManageCarousel from "./pages/ManageCarousel";
import ChangePassword from "./pages/ChangePassword";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ✅ PUBLIC */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/people" element={<People />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/research" element={<Research />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />

        {/* ✅ STUDENT */}
        <Route
          path="/materials"
          element={
            <ProtectedRoute>
              <RequestMaterials />
            </ProtectedRoute>
          }
        />
        <Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>


        {/* ✅ ADMIN */}
        <Route path="/admin" element={<AdminRoute><DashboardAdmin /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/people" element={<AdminRoute><ManagePeople /></AdminRoute>} />
        <Route path="/admin/publications" element={<AdminRoute><ManagePublications /></AdminRoute>} />
        <Route path="/admin/research" element={<AdminRoute><ManageResearch /></AdminRoute>} />
        <Route path="/admin/teaching" element={<AdminRoute><ManageTeaching /></AdminRoute>} />
        <Route path="/admin/news" element={<AdminRoute><ManageNews /></AdminRoute>} />
        <Route path="/admin/forms" element={<AdminRoute><ViewForms /></AdminRoute>} />
        
        <Route
  path="/admin/carousel"
  element={
    <AdminRoute>
      <ManageCarousel />
    </AdminRoute>
  }
/>
        <Route
  path="/admin/materials"
  element={
    <AdminRoute>
      <ViewMaterialRequests />
    </AdminRoute>
  }
/>

<Route
  path="/admin/equipment"
  element={
    <AdminRoute>
      <ManageEquipment />
    </AdminRoute>
  }
/>
         </Routes>

      <Footer />
    </>
  );
}
