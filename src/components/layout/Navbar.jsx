import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import { API } from "../../config/api";

const Navbar = () => {
  // ─── STATE ───────────────────────────────────────────────
  const [packages, setPackages] = useState([]);
  const [subPackages, setSubPackages] = useState({});
  const [loading, setLoading] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const dropdownCloseTimer = useRef(null);
  const location = useLocation();

  // ─── STATIC NAV LINKS ────────────────────────────────────
  const staticLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/blog", label: "Blog" },
  ];

  // ─── HELPER: is this link the current page? ──────────────
  const isActivePage = (path) => location.pathname === path;

  // ─── SCROLL DETECTION ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── CLOSE MOBILE MENU ON ROUTE CHANGE ───────────────────
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  // ─── LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN ───────────
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // ─── FETCH ALL PACKAGES ON MOUNT ─────────────────────────
  useEffect(() => {
    axiosInstance
      .get(API.packages.list)
      .then((res) => {
        const data = res.data?.data ?? res.data;
        setPackages(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to fetch packages", err));
  }, []);

  // ─── FETCH SUBPACKAGES (lazy + cached per packageId) ─────
  const fetchSubPackages = useCallback(
    async (packageId) => {
      // skip if already fetched or currently loading
      const alreadyFetched = subPackages[packageId];
      const currentlyLoading = loading[packageId];
      if (alreadyFetched || currentlyLoading) return;

      setLoading((prev) => ({ ...prev, [packageId]: true }));

      try {
        const url = API.subPackages.byPackage.replace("{packageId}", packageId);
        const res = await axiosInstance.get(url);
        const data = res.data?.data ?? res.data;

        setSubPackages((prev) => ({
          ...prev,
          [packageId]: Array.isArray(data) ? data : [],
        }));
      } catch (err) {
        console.error("Failed to fetch sub-packages", err);
      } finally {
        setLoading((prev) => ({ ...prev, [packageId]: false }));
      }
    },
    [subPackages, loading],
  );

  // ─── DESKTOP DROPDOWN HANDLERS ───────────────────────────

  const openDesktopDropdown = (pkgId) => {
    // cancel any pending close (user moved mouse back quickly)
    clearTimeout(dropdownCloseTimer.current);
    setOpenDropdown(pkgId);
    fetchSubPackages(pkgId);
  };

  const closeDesktopDropdown = () => {
    // delay close so user can move mouse from button into the dropdown panel
    dropdownCloseTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const cancelDropdownClose = () => {
    // user moved mouse back into the dropdown panel — cancel the close
    clearTimeout(dropdownCloseTimer.current);
  };

  // ─── MOBILE DROPDOWN HANDLER ─────────────────────────────

  const toggleMobileDropdown = (pkgId) => {
    const isAlreadyOpen = mobileDropdownOpen === pkgId;

    if (isAlreadyOpen) {
      setMobileDropdownOpen(null); // close it
    } else {
      setMobileDropdownOpen(pkgId); // open it
      fetchSubPackages(pkgId); // fetch its subpackages
    }
  };

  // ─── STYLE HELPERS ───────────────────────────────────────

  // returns the right classes for desktop nav links based on scroll + active state
  const getDesktopLinkClass = (path) => {
    const base =
      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    const active = isActivePage(path);

    if (scrolled) {
      return `${base} ${active ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"}`;
    } else {
      return `${base} ${active ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`;
    }
  };

  // returns the right classes for package dropdown buttons
  const getDropdownButtonClass = (pkgId) => {
    const base =
      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    const isOpen = openDropdown === pkgId;

    if (scrolled) {
      return `${base} ${isOpen ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"}`;
    } else {
      return `${base} ${isOpen ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"}`;
    }
  };

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <>
      {/* ── TOP CONTACT BAR ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-900 text-blue-200 text-xs py-1.5 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:8527036496"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" /> 8527036496
            </a>
            <a
              href="mailto:contact.travelmurti@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3" /> contact.travelmurti@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            <span>Noida, Uttar Pradesh</span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300
        ${
          scrolled
            ? "top-8 bg-white shadow-lg shadow-slate-200/50 border-b border-slate-100"
            : "top-8 bg-gradient-to-r from-blue-900 to-blue-800 shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-colors ${scrolled ? "border-blue-100" : "border-white/20"}`}
            >
              <img
                src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg"
                alt="Travel Murti"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-bold text-lg transition-colors ${scrolled ? "text-slate-800" : "text-white"}`}
            >
              Travel Murti
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Static links: Home, About, Blog */}
            {staticLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={getDesktopLinkClass(to)}>
                {label}
              </Link>
            ))}

            {/* Dynamic package dropdowns */}
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="relative"
                onMouseEnter={() => openDesktopDropdown(pkg._id)}
                onMouseLeave={closeDesktopDropdown}
              >
                {/* Package button */}
                <button className={getDropdownButtonClass(pkg._id)}>
                  {pkg.category}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === pkg._id ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {openDropdown === pkg._id && (
                  <div
                    className="absolute top-full left-0 mt-1 min-w-[220px] bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseEnter={cancelDropdownClose}
                    onMouseLeave={closeDesktopDropdown}
                  >
                    {/* Loading skeleton */}
                    {loading[pkg._id] && (
                      <div className="px-4 py-3 space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-3 bg-slate-100 rounded animate-pulse"
                          />
                        ))}
                      </div>
                    )}

                    {/* Empty state */}
                    {!loading[pkg._id] &&
                      (subPackages[pkg._id] || []).length === 0 && (
                        <p className="px-4 py-3 text-sm text-slate-400">
                          No tours available
                        </p>
                      )}

                    {/* Subpackage links */}
                    {!loading[pkg._id] &&
                      (subPackages[pkg._id] || []).map((subPkg) => (
                        <Link
                          key={subPkg._id}
                          to={
                            subPkg.subPackageUrl || `/subpackages/${subPkg._id}`
                          }
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-300 group-hover:bg-blue-500 transition-colors shrink-0" />
                          {subPkg.name}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact link */}
            <Link to="/contact" className={getDesktopLinkClass("/contact")}>
              Contact Us
            </Link>

            {/* Book Now CTA */}
            <Link
              to="/contact"
              className="ml-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-blue-300/40 hover:shadow-blue-400/40"
            >
              Book Now
            </Link>
          </nav>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-colors
              ${scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Dark backdrop — click to close */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl flex flex-col">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img
                  src="https://lh4.googleusercontent.com/-43TdC72iuWI/AAAAAAAAAAI/AAAAAAAAAAA/vLm5URYYrSY/s44-p-k-no-ns-nd/photo.jpg"
                  alt="Travel Murti"
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="font-bold text-slate-800">Travel Murti</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Scrollable link list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {/* Static links */}
              {staticLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActivePage(to) ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  {label}
                </Link>
              ))}

              {/* Dynamic package dropdowns (mobile) */}
              {packages.map((pkg) => (
                <div key={pkg._id}>
                  {/* Package toggle button */}
                  <button
                    onClick={() => toggleMobileDropdown(pkg._id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {pkg.category}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileDropdownOpen === pkg._id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Subpackage list */}
                  {mobileDropdownOpen === pkg._id && (
                    <div className="ml-4 mt-1 mb-2 border-l-2 border-blue-100 pl-4 space-y-1">
                      {/* Loading skeleton */}
                      {loading[pkg._id] && (
                        <div className="space-y-2 py-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="h-3 bg-slate-100 rounded animate-pulse"
                            />
                          ))}
                        </div>
                      )}

                      {/* Subpackage links */}
                      {!loading[pkg._id] &&
                        (subPackages[pkg._id] || []).map((subPkg) => (
                          <Link
                            key={subPkg._id}
                            to={
                              subPkg.subPackageUrl ||
                              `/subpackages/${subPkg._id}`
                            }
                            className="block py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            {subPkg.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Contact link */}
              <Link
                to="/contact"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Bottom CTA */}
            <div className="p-4 border-t border-slate-100 space-y-3">
              <Link
                to="/contact"
                className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl text-center transition-colors"
              >
                Book Now
              </Link>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <a
                  href="tel:8527036496"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Phone className="w-3 h-3" /> 8527036496
                </a>
                <a
                  href="mailto:contact.travelmurti@gmail.com"
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <Mail className="w-3 h-3" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
