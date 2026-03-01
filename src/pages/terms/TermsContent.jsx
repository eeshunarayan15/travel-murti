import React from "react";

const TermsContent = () => {
  return (
    <div className="px-4 md:px-8 lg:px-48 py-12 text-gray-600 leading-relaxed">

      <h2 className="font-semibold text-lg md:text-xl mb-4">
        TERMS & CONDITIONS:
      </h2>

      <p className="mb-4">
        Welcome to Travel Murti. These Terms and Conditions ("Terms") apply to all
        users of our website and services. By using our services, you agree to
        these Terms.
      </p>

      <h3 className="font-semibold text-lg mb-2">Booking</h3>
      <p className="mb-4">
        On confirmation of booking, your contract is with M/s Travel Murti. A
        contract exists once we receive the deposit amount.
      </p>

      <h3 className="font-semibold text-lg mb-2">Payment</h3>
      <p className="mb-4">
        A minimum deposit of 25% of the total tour cost is required to confirm
        your booking.
      </p>

      <h3 className="font-semibold text-lg mb-2">Balance Payment</h3>
      <p className="mb-4">
        Balance payment must be completed 15 days before the start of the tour.
      </p>

      <h3 className="font-semibold text-lg mb-2">Mode of Payment</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Credit / Debit Cards</li>
        <li>UPI / Net Banking</li>
        <li>Cash / Cheque / Demand Draft</li>
      </ul>

      <h3 className="font-semibold text-lg mb-2">
        Cancellation Policy
      </h3>
      <ul className="list-disc pl-6 mb-4">
        <li>60+ days – 10% deduction</li>
        <li>30–59 days – 20% deduction</li>
        <li>15–29 days – 50% deduction</li>
        <li>8–14 days – 75% deduction</li>
        <li>7 days or less – No refund</li>
      </ul>

      <h3 className="font-semibold text-lg mb-2">Refund</h3>
      <p className="mb-4">
        Refunds are processed within 2–4 weeks, subject to banking procedures.
      </p>

      <h3 className="font-semibold text-lg mb-2">Jurisdiction</h3>
      <p>
        All disputes shall be subject to Lucknow High Court jurisdiction only.
      </p>

    </div>
  );
};

export default TermsContent;