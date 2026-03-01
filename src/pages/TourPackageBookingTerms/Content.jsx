import React from "react";

const Content = () => {
  return (
    <div className="px-4 md:px-8 lg:px-48 lg:py-14 py-12 text-gray-600">
      <p className="leading-relaxed mb-4">
        Welcome to Travel Murti. These Terms and Conditions ("Terms") apply to
        all users of our website and services. By using our services, you agree
        to these Terms.
      </p>

      <Section title="Booking">
        On confirmation of booking, your contract is with M/s Travel Murti. A
        contract exists when we confirm your tour and receive the deposit.
      </Section>

      <Section title="Payment">
        A minimum deposit of 25% of the total cost is required to confirm the
        booking.
      </Section>

      <Section title="Balance Payment">
        Balance payment must be made 15 days prior to the start date. Late
        bookings require full payment at the time of booking.
      </Section>

      <Section title="Note">
        For peak season and special train journeys, full payment is required at
        the time of booking.
      </Section>

      <Section title="Mode of Payment">
        <ul className="list-disc pl-5 space-y-2">
          <li>Credit / Debit Cards</li>
          <li>Cash / Cheque / Demand Draft</li>
          <li>RTGS / NEFT / UPI</li>
        </ul>
      </Section>

      <Section title="Important Notes">
        <p>• 3% bank charges apply on card payments</p>
        <p>• All payments must be tax-free</p>
        <p>• Bank charges are borne by the payer</p>
      </Section>

      <Section title="Payment Procedure">
        All payments must be made in the name of <strong>M/s Travel Murti</strong>.
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <>
    <h2 className="font-bold text-lg md:text-xl mt-6 mb-2">{title}</h2>
    <div className="leading-relaxed">{children}</div>
  </>
);

export default Content;