import React, { useState } from 'react';
import { AlertCircle, Info, Mail, Phone, MapPin, Users, Coins, ClipboardList } from 'lucide-react';


import { 
    PersonalDetailsStep, 
    ClubInformationStep, 
    ProjectDetailsStep, 
    FundingDetailsStep 
  } from './FormSteps';


const FundingRequestForm = () => {
  // Form state management
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    
    // Club Information
    clubName: '',
    clubAddress: '',
    postcode: '',
    clubType: '',
    memberCount: '',
    existingFacilities: '',
    
    // Project Details
    projectName: '',
    projectDescription: '',
    targetGroups: [],
    totalCost: '',
    fundingAmount: '',
    matchFunding: false,
    timeline: '',
    
    // Supporting Information
    supportingDocs: [],
    terms: false
  });

  const [errors, setErrors] = useState({});

  // Form steps configuration
  const steps = [
    { id: 'personal', label: 'Personal Details', icon: Users },
    { id: 'club', label: 'Club Information', icon: MapPin },
    { id: 'project', label: 'Project Details', icon: ClipboardList },
    { id: 'funding', label: 'Funding Details', icon: Coins }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetailsStep formData={formData} handleInputChange={handleInputChange} />;
      case 1:
        return <ClubInformationStep formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <ProjectDetailsStep formData={formData} handleInputChange={handleInputChange} />;
      case 3:
        return <FundingDetailsStep formData={formData} handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="sw-container sw-card">
      {/* Header */}
      <div className="sw-header">
        <h2 className="sw-heading-primary">Sport Wales Funding Request</h2>
        <p className="mt-2 text-lg">Complete this form to submit your funding request</p>
      </div>

      {/* Multi-step Form */}
      <div className="p-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute top-1/2 h-0.5 w-full bg-[--color-light-grey]" />
            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isComplete = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        relative bg-white transition-colors duration-200
                        ${isComplete ? 'bg-[--color-sw-green] text-white' : ''}
                        ${isCurrent ? 'bg-[--color-sw-blue] text-white' : ''}
                        ${!isComplete && !isCurrent ? 'bg-[--color-light-grey] text-[--color-grey]' : ''}
                      `}
                    >
                      <StepIcon size={20} />
                    </div>
                    <span className={`
                      mt-2 text-sm font-medium
                      ${isCurrent ? 'text-[--color-sw-blue]' : 'text-[--color-grey]'}
                    `}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Steps */}
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className={`
              sw-button
              ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            disabled={currentStep === steps.length - 1}
            className="sw-button sw-button-primary"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>

        {/* Form Note */}
        <div className="sw-notice mt-8">
          <div className="flex items-start gap-2">
            <Info size={20} className="text-[--color-sw-yellow] flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-[--color-sw-blue]">Important:</p>
              <p className="mt-1 text-[--color-sw-blue]">
                All fields marked with an asterisk (*) are required. Please ensure you have all necessary information and documentation ready before submitting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingRequestForm;