import React from 'react';
import CrowdfunderCalculator from './calculator/CrowdfunderCalculator';
import FundingRequestForm from './FundingRequestForm';

const FundingPage = () => {
  return (
    <div className="min-h-screen bg-[--color-light-grey] py-8">
      <div className="space-y-12">
        {/* Crowdfunder Calculator Section */}
        <section id="calculator">
          <CrowdfunderCalculator />
        </section>

        Divider with CTA
        <div className="sw-container">
          <div className="sw-card text-center py-12">
            <h2 className="sw-heading-primary text-[--color-sw-blue] mb-4">
              Ready to Apply for Funding?
            </h2>
            <p className="text-lg text-[--color-sw-blue-dark] mb-6">
              Complete the form below to submit your funding request. Make sure you have all the necessary information ready.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="#funding-form"
                className="sw-button sw-button-primary"
              >
                Start Application
              </a>
              <a 
                href="#calculator"
                className="sw-button sw-button-secondary"
              >
                Return to Calculator
              </a>
            </div>
          </div>
        </div>

        {/* Funding Request Form Section */}
        <section id="funding-form">
          <FundingRequestForm />
        </section>

        {/* Help Section */}
        <div className="sw-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sw-card p-6">
              <h3 className="sw-heading-secondary">Need Help?</h3>
              <p className="text-[--color-sw-blue-dark] mb-4">
                If you need assistance with your application, our team is here to help.
              </p>
              <a 
                href="mailto:support@sportwales.org.uk"
                className="text-[--color-sw-red] hover:underline"
              >
                Contact Support
              </a>
            </div>

            <div className="sw-card p-6">
              <h3 className="sw-heading-secondary">Resources</h3>
              <ul className="space-y-2 text-[--color-sw-blue-dark]">
                <li>
                  <a href="#" className="hover:text-[--color-sw-red]">
                    Funding Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[--color-sw-red]">
                    Application Checklist
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[--color-sw-red]">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div className="sw-card p-6">
              <h3 className="sw-heading-secondary">Important Information</h3>
              <ul className="space-y-2 text-[--color-sw-blue-dark]">
                <li>• Applications are reviewed monthly</li>
                <li>• Maximum funding amount: £15,000</li>
                <li>• Minimum project cost: £300</li>
                <li>• Response within 4-6 weeks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;