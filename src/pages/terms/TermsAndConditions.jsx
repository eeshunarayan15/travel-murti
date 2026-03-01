import React from "react";
import TermsBanner from "./TermsBanner";
import TermsContent from "./TermsContent";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <TermsBanner />
      <TermsContent />
    </div>
  );
};

export default TermsAndConditions;