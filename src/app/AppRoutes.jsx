
// export default AppRoutes;
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainLayout from "../components/layout/MainLayout";
import MetaHandler from "./MetaHandler";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import NotAuthorized from "../pages/NotAuthorized";

// ---------- LAZY IMPORTS ----------

// Public Pages
const Home = lazy(() => import("../pages/Home"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const WeekendTours = lazy(() => import("../pages/WeekendTours"));
const WeAreHiring = lazy(() => import("../pages/WeAreHiring"));
const PrivacyPolicy = lazy(() => import("../pages/legal/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../pages/terms/TermsAndConditions"));
const CancellationRefundPolicy = lazy(
  () => import("../pages/legal/CancellationRefundPolicy"),
);
const TourBookingTC = lazy(() => import("../pages/TourPackageBookingTerms"));
const BlogListPage = lazy(() => import("../pages/BlogListPage"));
const BlogDetailPage = lazy(() => import("../pages/BlogDetailPage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

// Auth
const Login = lazy(() => import("../features/auth/Login"));

// Admin
const AdminDashboard = lazy(() => import("../features/admin/AdminDashboard"));

// Other features (kept as direct imports since they're admin-only and already code-split via the protected route)
import PackagesPage from "../features/packages/PackagesPage";
import SubPackagesPage from "../features/subpackages/SubPackagesPage";
import EnquiryPage from "../features/enquiries/EnquiryPage";
import UpdateJobPage from "../features/jobs/UpdateJobPage";
import ForgotPassword from "../features/auth/ForgotPassword";
import ResetPassword from "../features/auth/ResetPassword";
import VerifyOtp from "../features/auth/VerifyOtp";
import Register from "../features/auth/Register";
import AdminUsersPage from "../features/admin/users/AdminUsersPage";
import AdminOverview from "../features/admin/AdminOverview";
import BlogsPage from "../features/admin/blogs/BlogsPage";
import CreateAdmin from "../features/admin/users/CreateAdmin";
import SubPackageDetails from "../components/SubPackageDetails/SubPackageDetails";
import NestedSubPackageDetails from "../features/subpackages/pages/NestedSubPackageDetails";

function AppRoutes() {
  return (
    <>
      <MetaHandler />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* ---------- PUBLIC ROUTES ---------- */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/weekend-tours" element={<WeekendTours />} />
            <Route path="/we-are-hiring" element={<WeAreHiring />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route
              path="/cancellation-refund-policy"
              element={<CancellationRefundPolicy />}
            />
            <Route path="/tour-booking-t-c" element={<TourBookingTC />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route
              path="/subpackages/:subPackageId"
              element={<SubPackageDetails />}
            />
            <Route
              path="/:packageSlug/:subSlug"
              element={<SubPackageDetails />}
            />
            <Route
              path="/subpackages/:subPackageId/:nestedSubPackageId"
              element={<NestedSubPackageDetails />}
            />
            <Route
              path="/:packageSlug/:subSlug/:nestedSlug"
              element={<NestedSubPackageDetails />}
            />
          </Route>

          {/* ---------- STANDALONE PUBLIC ---------- */}
          <Route path="/not-authorized" element={<NotAuthorized />} />

          {/* ---------- AUTH ---------- */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={<Navigate to="/admin" replace />}
          />

          {/* ---------- ADMIN (NESTED) ---------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["super_admin", "admin", "employee"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="subpackages" element={<SubPackagesPage />} />
            <Route
              path="users"
              element={
                <ProtectedRoute roles={["super_admin", "admin"]}>
                  <AdminUsersPage />
                </ProtectedRoute>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="enquiries" element={<EnquiryPage />} />
            <Route path="jobs" element={<UpdateJobPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route
              path="create-admin"
              element={
                <ProtectedRoute roles={["super_admin", "admin"]}>
                  <CreateAdmin />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* ---------- FALLBACK ---------- */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
