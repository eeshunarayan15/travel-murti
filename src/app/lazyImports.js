import { lazy } from "react";

/* ---------- PUBLIC PAGES ---------- */
export const Home = lazy(() => import("../pages/HomePage"));
export const AboutUs = lazy(() => import("../pages/AboutUs"));
export const ContactUs = lazy(() => import("../pages/ContactUs"));

export const WeekendTours = lazy(() => import("../pages/WeekendTours"));
export const WeAreHiring = lazy(() => import("../pages/WeAreHiring"));
export const PrivacyPolicy = lazy(() => import("../pages/legal/PrivacyPolicy"));
export const TermsConditions = lazy(
  () => import("../pages/terms/TermsAndConditions"),
);
export const CancellationRefundPolicy = lazy(
  () => import("../pages/legal/CancellationRefundPolicy"),
);
export const TourBookingTC = lazy(
  () => import("../pages/TourPackageBookingTerms"),
);

/* ---------- AUTH ---------- */
export const Login = lazy(() => import("../features/auth/Login"));

/* ---------- ADMIN LAYOUT ONLY ---------- */
export const AdminDashboard = lazy(
  () => import("../features/admin/AdminDashboard"),
);

/* ---------- BLOG ---------- */
export const BlogListPage = lazy(() => import("../pages/BlogListPage"));
export const BlogDetailPage = lazy(() => import("../pages/BlogDetailPage"));

/* ---------- FALLBACK ---------- */
export const PageNotFound = lazy(() => import("../pages/PageNotFound"));

// examples:
// default export
// export const HomePage = lazyNamed(() => import("../pages/HomePage"));

// named export
// export const AuthPage = lazyNamed(() => import("../auth/auth"), "AuthPage");
