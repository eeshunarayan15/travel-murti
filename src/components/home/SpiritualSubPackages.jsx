import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpiritualSubPackages } from "../../services/subpackage.service";
import { SPIRITUAL_PACKAGE_ID } from "../../constants/packageIds";
import Card from "../common/Card";
import { ArrowRight, Sparkles } from "lucide-react";

const SpiritualSubPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSpiritualSubPackages(SPIRITUAL_PACKAGE_ID);
        const list = res?.data?.data ?? res?.data ?? res ?? [];
        setPackages(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Failed to load spiritual packages", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (!loading && packages.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-amber-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
                Spiritual Journeys
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Spiritual Tour Packages
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Embark on a journey of devotion, peace, and self-discovery
            </p>
          </div>

          <button
            onClick={() => navigate("/spiritual-tours")}
            className="flex items-center gap-2 text-sm font-semibold text-amber-600
              hover:text-amber-700 transition-colors shrink-0 group"
          >
            View All Spiritual Tours
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
                  imageUrl={pkg.imageUrl ?? pkg.image}
                  title={pkg.name ?? pkg.title}
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
      </div>
    </section>
  );
};

export default SpiritualSubPackages;
