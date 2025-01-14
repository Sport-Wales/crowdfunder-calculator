import { Mail, Phone, User, Briefcase } from 'lucide-react';

const PersonalDetailsStep = ({ formData, handleInputChange }) => (
  <div className="space-y-6">
    <h3 className="sw-heading-secondary">Personal Details</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* First Name */}
      <div className="sw-form-field">
        <label className="sw-label">
          First Name <span className="text-[--color-sw-red]">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-[--color-sw-blue]" size={20} />
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="sw-input w-full pl-10"
            placeholder="Enter your first name"
            required
          />
        </div>
      </div>

      {/* Last Name */}
      <div className="sw-form-field">
        <label className="sw-label">
          Last Name <span className="text-[--color-sw-red]">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-[--color-sw-blue]" size={20} />
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="sw-input w-full pl-10"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="sw-form-field">
        <label className="sw-label">
          Email <span className="text-[--color-sw-red]">*</span>
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-[--color-sw-blue]" size={20} />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="sw-input w-full pl-10"
            placeholder="Enter your email address"
            required
          />
        </div>
        <p className="text-sm text-[--color-sw-blue-dark] mt-1">
          We'll use this email for all communications about your application
        </p>
      </div>

      {/* Phone Number */}
      <div className="sw-form-field">
        <label className="sw-label">
          Phone Number <span className="text-[--color-sw-red]">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-3.5 text-[--color-sw-blue]" size={20} />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="sw-input w-full pl-10"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      {/* Role at Club */}
      <div className="sw-form-field md:col-span-2">
        <label className="sw-label">
          Your Role at the Club <span className="text-[--color-sw-red]">*</span>
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-3.5 text-[--color-sw-blue]" size={20} />
          <select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className="sw-input w-full pl-10"
            required
          >
            <option value="">Select your role</option>
            <option value="chairperson">Chairperson</option>
            <option value="secretary">Secretary</option>
            <option value="treasurer">Treasurer</option>
            <option value="coach">Coach</option>
            <option value="committee_member">Committee Member</option>
            <option value="volunteer">Volunteer</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Other Role (conditional) */}
      {formData.role === 'other' && (
        <div className="sw-form-field md:col-span-2">
          <label className="sw-label">
            Please Specify Your Role <span className="text-[--color-sw-red]">*</span>
          </label>
          <input
            type="text"
            value={formData.otherRole}
            onChange={(e) => handleInputChange('otherRole', e.target.value)}
            className="sw-input w-full"
            placeholder="Please specify your role"
            required
          />
        </div>
      )}
    </div>

    {/* Welsh Language Preference */}
    <div className="sw-form-field mt-6">
      <label className="sw-label">Language Preference</label>
      <div className="mt-2 space-x-6">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="language"
            value="english"
            checked={formData.languagePreference === 'english'}
            onChange={(e) => handleInputChange('languagePreference', e.target.value)}
            className="sw-radio mr-2"
          />
          <span className="text-[--color-sw-blue]">English</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="language"
            value="welsh"
            checked={formData.languagePreference === 'welsh'}
            onChange={(e) => handleInputChange('languagePreference', e.target.value)}
            className="sw-radio mr-2"
          />
          <span className="text-[--color-sw-blue]">Welsh</span>
        </label>
      </div>
    </div>

    {/* Privacy Notice */}
    <div className="sw-notice mt-6">
      <p className="text-sm text-[--color-sw-blue]">
        Your personal information will be handled in accordance with our privacy policy and data protection regulations. We'll only use your contact details to communicate about your funding application.
      </p>
    </div>
  </div>
);
  
  // Club Information Step
  const ClubInformationStep = ({ formData, handleInputChange }) => (
    <div className="space-y-6">
      <h3 className="sw-heading-secondary">Club Information</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="sw-form-field">
          <label className="sw-label">
            Club Name <span className="text-[--color-sw-red]">*</span>
          </label>
          <input
            type="text"
            value={formData.clubName}
            onChange={(e) => handleInputChange('clubName', e.target.value)}
            className="sw-input w-full"
            required
          />
        </div>
  
        <div className="sw-form-field">
          <label className="sw-label">
            Club Address <span className="text-[--color-sw-red]">*</span>
          </label>
          <textarea
            value={formData.clubAddress}
            onChange={(e) => handleInputChange('clubAddress', e.target.value)}
            className="sw-input w-full min-h-[100px] py-2"
            required
          />
        </div>
  
        <div className="sw-form-field">
          <label className="sw-label">
            Postcode <span className="text-[--color-sw-red]">*</span>
          </label>
          <input
            type="text"
            value={formData.postcode}
            onChange={(e) => handleInputChange('postcode', e.target.value.toUpperCase())}
            className="sw-input w-full uppercase"
            required
          />
        </div>
  
        <div className="sw-form-field">
          <label className="sw-label">
            Type of Club/Organization <span className="text-[--color-sw-red]">*</span>
          </label>
          <select
            value={formData.clubType}
            onChange={(e) => handleInputChange('clubType', e.target.value)}
            className="sw-input w-full"
            required
          >
            <option value="">Select club type</option>
            <option value="sports">Sports Club</option>
            <option value="community">Community Organization</option>
            <option value="school">School/Educational Institution</option>
            <option value="charity">Registered Charity</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <div className="sw-form-field">
          <label className="sw-label">
            Number of Members <span className="text-[--color-sw-red]">*</span>
          </label>
          <input
            type="number"
            value={formData.memberCount}
            onChange={(e) => handleInputChange('memberCount', e.target.value)}
            className="sw-input w-full"
            min="0"
            required
          />
        </div>
      </div>
    </div>
  );
  
  // Project Details Step
  const ProjectDetailsStep = ({ formData, handleInputChange }) => {
    const targetGroupOptions = [
      { id: 'women', label: 'Women & Girls' },
      { id: 'disabled', label: 'Disabled People' },
      { id: 'young', label: 'Young People' },
      { id: 'elderly', label: 'Elderly People' },
      { id: 'ethnic', label: 'Ethnic Minority Communities' },
      { id: 'lgbtqia', label: 'LGBTQIA+ Community' },
      { id: 'welsh', label: 'Welsh Language Community' }
    ];
  
    const handleTargetGroupChange = (groupId) => {
      const currentGroups = [...(formData.targetGroups || [])];
      const index = currentGroups.indexOf(groupId);
      
      if (index === -1) {
        currentGroups.push(groupId);
      } else {
        currentGroups.splice(index, 1);
      }
      
      handleInputChange('targetGroups', currentGroups);
    };
  
    return (
      <div className="space-y-6">
        <h3 className="sw-heading-secondary">Project Details</h3>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="sw-form-field">
            <label className="sw-label">
              Project Name <span className="text-[--color-sw-red]">*</span>
            </label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              className="sw-input w-full"
              required
            />
          </div>
  
          <div className="sw-form-field">
            <label className="sw-label">
              Project Description <span className="text-[--color-sw-red]">*</span>
            </label>
            <textarea
              value={formData.projectDescription}
              onChange={(e) => handleInputChange('projectDescription', e.target.value)}
              className="sw-input w-full min-h-[150px] py-2"
              placeholder="Describe your project, its objectives, and expected benefits to the community"
              required
            />
          </div>
  
          <div className="sw-form-field">
            <label className="sw-label">Target Groups</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {targetGroupOptions.map((group) => (
                <label key={group.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.targetGroups?.includes(group.id)}
                    onChange={() => handleTargetGroupChange(group.id)}
                    className="sw-checkbox"
                  />
                  <span className="text-[--color-sw-blue]">{group.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Funding Details Step
  const FundingDetailsStep = ({ formData, handleInputChange }) => (
    <div className="space-y-6">
      <h3 className="sw-heading-secondary">Funding Details</h3>
  
      <div className="grid grid-cols-1 gap-6">
        <div className="sw-form-field">
          <label className="sw-label">
            Total Project Cost <span className="text-[--color-sw-red]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-[--color-sw-blue]">£</span>
            <input
              type="number"
              value={formData.totalCost}
              onChange={(e) => handleInputChange('totalCost', e.target.value)}
              className="sw-input w-full pl-8"
              min="300"
              required
            />
          </div>
          <p className="text-sm text-[--color-sw-blue-dark] mt-1">
            Minimum project cost is £300
          </p>
        </div>
  
        <div className="sw-form-field">
          <label className="sw-label">
            Funding Amount Requested <span className="text-[--color-sw-red]">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3.5 text-[--color-sw-blue]">£</span>
            <input
              type="number"
              value={formData.fundingAmount}
              onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
              className="sw-input w-full pl-8"
              required
            />
          </div>
        </div>
  
        <div className="sw-form-field">
          <label className="sw-label">
            Supporting Documents
          </label>
          <div className="space-y-4">
            <input
              type="file"
              multiple
              onChange={(e) => handleInputChange('supportingDocs', e.target.files)}
              className="block w-full text-sm text-[--color-sw-blue]
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-[--color-light-grey] file:text-[--color-sw-blue]
                hover:file:bg-[--color-sw-blue-light]"
            />
            <p className="text-sm text-[--color-sw-blue-dark]">
              Upload any relevant supporting documents (project plans, quotes, etc.)
            </p>
          </div>
        </div>
  
        <div className="sw-form-field">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.terms}
              onChange={(e) => handleInputChange('terms', e.target.checked)}
              className="sw-checkbox mt-1"
              required
            />
            <span className="text-[--color-sw-blue] text-sm">
              I confirm that all information provided is accurate and I have read and agree to the 
              <a href="#" className="text-[--color-sw-red] hover:underline ml-1">
                terms and conditions
              </a>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
  
  export { PersonalDetailsStep, ClubInformationStep, ProjectDetailsStep, FundingDetailsStep };