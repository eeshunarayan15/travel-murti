import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { getLatestTourPackages } from "../../services/subpackage.service";
import { LATEST_PACKAGES_FALLBACK } from "../../constants/fallbacks";
import { ArrowRight, Compass } from "lucide-react";

const LatestTourPackages = () => {
  const [packages, setPackages] = useState(LATEST_PACKAGES_FALLBACK);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await getLatestTourPackages();
        const data = res.data?.data ?? res.data;
        if (Array.isArray(data)) setPackages(data);
      } catch (err) {
        console.error("Failed to load latest tour packages", err);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  return (
    <section className="py-16 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Compass className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                Just Added
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Latest Tour Packages
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Fresh destinations and new itineraries added just for you
            </p>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600
              hover:text-blue-700 transition-colors shrink-0 group"
          >
            Browse All Tours
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, i) => <Card key={i} isLoading />)
            : packages.map((pkg) => (
                <Card
                  key={pkg._id}
                  imageUrl={pkg.imageUrl}
                  title={pkg.name}
                  description={pkg.description}
                  price={pkg.price}
                  duration={pkg.duration}
                  isDealOfTheDay={pkg.isDealOfTheDay}
                  onViewDetails={() =>
                    navigate(pkg.subPackageUrl || `/subpackages/${pkg._id}`)
                  }
                />
              ))}
        </div>

        {/* Bottom CTA */}
        {!loading && packages.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/packages")}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600
                hover:bg-blue-700 text-white font-semibold rounded-xl
                shadow-lg shadow-blue-200 transition-all hover:gap-3 group"
            >
              Explore All Packages
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTourPackages;
