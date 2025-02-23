import React from "react";
import { Link } from "react-router-dom";

const TravelInsurance = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="space-y-6">
          <h2 className="text-4xl text-primaryText font-bold text-center">
            Travel Insurance & Safety Tips
          </h2>
          <p className="text-center text-secondaryText">
            Stay safe and protected while traveling with the best insurance and
            expert safety tips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Travel Insurance */}
          <div className="bg-secondaryBg p-8 rounded-xl flex flex-col justify-between">
            <h3 className="text-3xl font-semibold text-primaryText mb-4">
              Travel Insurance
            </h3>
            <p className="text-secondaryText text-lg mb-6">
              Protect yourself and your loved ones from unforeseen events during
              your travels. Get comprehensive travel insurance that covers:
            </p>
            <ul className="list-disc  pl-6 mb-6 text-primaryText">
              <li>Medical emergencies and hospital stays</li>
              <li>Flight cancellations and delays</li>
              <li>Lost luggage and personal belongings</li>
              <li>Emergency evacuation and repatriation</li>
            </ul>
            <div className="text-center">
              <Link
                to="/terms-conditions"
                className="btn bg-transparent text-primaryText shadow-none border-none rounded-lg hover:bg-primaryBg hover:text-primaryText transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-secondaryBg p-8 rounded-xl  flex flex-col justify-between">
            <h3 className="text-3xl font-semibold text-primaryText mb-4">
              Safety Tips for Travelers
            </h3>
            <p className="text-secondaryText text-lg mb-6">
              Ensure a safe and smooth journey with these essential safety tips:
            </p>
            <ul className="list-disc pl-6 mb-6 text-primaryText">
              <li>Always keep emergency contact information handy</li>
              <li>Secure your valuables in a safe or anti-theft bag</li>
              <li>Keep a copy of important documents like your passport</li>
              <li>
                Stay informed about your destination’s safety and weather
                conditions
              </li>
            </ul>
            <div className="text-center">
              <Link
                to="/terms-conditions"
                className="btn bg-transparent text-primaryText shadow-none border-none rounded-lg hover:bg-primaryBg hover:text-primaryText transition-colors"
              >
                Read More Tips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelInsurance;
