import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <section className="px-6 py-10 mt-20 bg-primaryBg">
      <Helmet>
        <title>Terms & Conditions | TravelVerse</title>
      </Helmet>
      <div className="max-w-4xl mx-auto bg-secondaryBg rounded-lg p-6 md:p-10">
        <h2 className="text-4xl font-bold text-center text-fixedBlackLight mb-6 text-primaryText">
          Terms & Conditions
        </h2>
        <p className="text-center mb-8 text-secondaryText">
          Please read these terms and conditions carefully before booking.
        </p>

        {/* Terms List */}
        <div className="space-y-6">
          <div className="border-l-4 border-primaryText pl-4">
            <h3 className="text-xl font-semibold text-primaryText">
              1. Booking Policy
            </h3>
            <p className="text-secondaryText">
              Reservations are subject to availability. Full payment or a
              deposit is required at the time of booking.
            </p>
          </div>

          <div className="border-l-4 border-primaryText pl-4">
            <h3 className="text-xl font-semibold text-primaryText">
              2. Cancellation & Refunds
            </h3>
            <p className="text-secondaryText">
              Cancellations made within 24 hours of check-in are non-refundable.
              Refunds (if applicable) may take up to 7-10 business days.
            </p>
          </div>

          <div className="border-l-4 border-primaryText pl-4">
            <h3 className="text-xl font-semibold text-primaryText">
              3. Check-in & Check-out
            </h3>
            <p className="text-secondaryText">
              Check-in time: 2:00 PM | Check-out time: 11:00 AM. Late check-outs
              may incur additional charges.
            </p>
          </div>

          <div className="border-l-4 border-primaryText pl-4">
            <h3 className="text-xl font-semibold text-primaryText">
              4. Travel Insurance
            </h3>
            <p className="text-secondaryText">
              Medical emergencies and hospital stays Flight cancellations and
              delays Lost luggage and personal belongings Emergency evacuation
              and repatriation
            </p>
          </div>
          <div className="border-l-4 border-primaryText pl-4">
            <h3 className="text-xl font-semibold text-primaryText">
              5. Safety Tips for Travelers
            </h3>
            <p className="text-secondaryText">
              Always keep emergency contact information handy Secure your
              valuables in a safe or anti-theft bag Keep a copy of important
              documents like your passport Stay informed about your
              destination’s safety and weather conditions
            </p>
          </div>

          <div className="border-l-4 border-primaryText pl-4">
            <h3 className="text-xl font-semibold text-primaryText">
              6. Privacy Policy
            </h3>
            <p className="text-secondaryText">
              Your personal data is collected only for booking purposes and is
              kept confidential as per our privacy policies.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="text-center mt-8">
          <Link to="/">
            <button className="btn bg-transparent border-none shadow-none text-primaryText hover:bg-primaryBg py-2 px-6 rounded-none  transition">
              Accept & Continue
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TermsConditions;
