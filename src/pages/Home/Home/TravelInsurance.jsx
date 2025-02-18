import React from "react";

const TravelInsurance = () => {
  return (
    <section className="py-1">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl text-primary font-bold text-center mb-8">
          Travel Insurance & Safety Tips
        </h2>
        <p className="text-center mb-12">
          Stay safe and protected while traveling with the best insurance and
          expert safety tips.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Travel Insurance */}
          <div className="bg-white p-8 rounded-xl flex flex-col justify-between">
            <h3 className="text-3xl font-semibold text-primary mb-4">
              Travel Insurance
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Protect yourself and your loved ones from unforeseen events during
              your travels. Get comprehensive travel insurance that covers:
            </p>
            <ul className="list-disc  pl-6 mb-6 text-primary">
              <li>Medical emergencies and hospital stays</li>
              <li>Flight cancellations and delays</li>
              <li>Lost luggage and personal belongings</li>
              <li>Emergency evacuation and repatriation</li>
            </ul>
            <div className="text-center">
              <button className="btn bg-transparent text-primary rounded-lg hover:text-primary transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-white p-8 rounded-xl  flex flex-col justify-between">
            <h3 className="text-3xl font-semibold text-primary mb-4">
              Safety Tips for Travelers
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Ensure a safe and smooth journey with these essential safety tips:
            </p>
            <ul className="list-disc pl-6 mb-6 text-primary">
              <li>Always keep emergency contact information handy</li>
              <li>Secure your valuables in a safe or anti-theft bag</li>
              <li>Keep a copy of important documents like your passport</li>
              <li>
                Stay informed about your destination’s safety and weather
                conditions
              </li>
            </ul>
            <div className="text-center">
              <button className="btn bg-transparent text-primary rounded-lg hover:text-primary transition-colors">
                Read More Tips
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelInsurance;
