import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import { getDealOfTheDay } from "../../services/subpackage.service";
import { DEALS_FALLBACK } from "../../constants/fallbacks";
import { Flame, ArrowRight } from "lucide-react";

const DealOfTheDay = () => {
  const [deals, setDeals] = useState(DEALS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const res = await getDealOfTheDay();
        const data = res.data?.data ?? res.data;
        if (Array.isArray(data)) setDeals(data);
      } catch (err) {
        console.error("Failed to load deal of the day", err);
      } finally {
        setLoading(false);
      }
    };
    loadDeals();
  }, []);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-xs font-semibold tracking-widest text-orange-500 uppercase">
                Hot Deals
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Trending Tour Packages
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Handpicked deals with the best value for your next adventure
            </p>
          </div>

          <button
            onClick={() => navigate("/packages")}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600
              hover:text-blue-700 transition-colors shrink-0 group"
          >
            View All Packages
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} isLoading />
            ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Flame className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No deals available right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {deals.map((deal) => (
              <Card
                key={deal._id}
                imageUrl={deal.imageUrl}
                title={deal.name}
                description={deal.description}
                price={deal.price}
                duration={deal.duration}
                isDealOfTheDay={deal.isDealOfTheDay}
                onViewDetails={() => navigate(deal.subPackageUrl || `/subpackages/${deal._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealOfTheDay;