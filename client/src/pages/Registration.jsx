import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash } from 'react-icons/hi';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { hackathonService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  DOMAINS,
  YEARS,
  COURSES,
  BRANCHES,
  COLLEGES,
  TEAM_SIZES,
} from '../utils/constants';
import { validateMobile, validateURL } from '../utils/validation';

const Registration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [existingRegistration, setExistingRegistration] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    mobile: '',
    college: '',
    course: '',
    branch: '',
    year: '',
    domain: '',
    projectName: '',
    pptLink: '',
    prototypeLink: '',
    demoVideoLink: '',
    teamSize: 1,
    teamMembers: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchExistingRegistration();
  }, []);

  const fetchExistingRegistration = async () => {
    try {
      const response = await hackathonService.getMyEntry();
      if (response.data.registration) {
        setExistingRegistration(response.data.registration);
        setFormData(response.data.registration);
      }
    } catch (error) {
      console.error('Failed to fetch registration:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleTeamSizeChange = (e) => {
    const size = parseInt(e.target.value);
    const membersNeeded = size - 1;
    const currentMembers = formData.teamMembers.slice(0, membersNeeded);
    
    // Add empty members if needed
    while (currentMembers.length < membersNeeded) {
      currentMembers.push({ memberName: '', memberEmail: '' });
    }

    setFormData({
      ...formData,
      teamSize: size,
      teamMembers: currentMembers,
    });
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index][field] = value;
    setFormData({ ...formData, teamMembers: newTeamMembers });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid Indian mobile number';
    }
    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.domain) newErrors.domain = 'Domain is required';
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    } else if (formData.projectName.trim().length < 5) {
      newErrors.projectName = 'Project name must be at least 5 characters';
    }
    if (!formData.pptLink.trim()) {
      newErrors.pptLink = 'PPT link is required';
    } else if (!validateURL(formData.pptLink)) {
      newErrors.pptLink = 'Please enter a valid URL';
    }
    if (!formData.prototypeLink.trim()) {
      newErrors.prototypeLink = 'Prototype link is required';
    } else if (!validateURL(formData.prototypeLink)) {
      newErrors.prototypeLink = 'Please enter a valid URL';
    }
    if (formData.demoVideoLink && !validateURL(formData.demoVideoLink)) {
      newErrors.demoVideoLink = 'Please enter a valid URL';
    }

    // Validate team members
    if (formData.teamSize > 1) {
      formData.teamMembers.forEach((member, index) => {
        if (!member.memberName.trim()) {
          newErrors[`member${index}Name`] = 'Member name is required';
        }
        if (!member.memberEmail.trim()) {
          newErrors[`member${index}Email`] = 'Member email is required';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setSubmitLoading(true);

    try {
      if (existingRegistration) {
        await hackathonService.updateEntry(existingRegistration._id, formData);
        toast.success('Registration updated successfully!');
      } else {
        await hackathonService.register(formData);
        toast.success('Registration submitted successfully! Check your email.');
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="min-h-screen section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {existingRegistration ? 'Update Registration' : 'Hackathon Registration'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Fill in all the details to register for the hackathon
            </p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    disabled
                    required
                  />
                  <Input
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={errors.mobile}
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Academic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Select
                    label="College Name"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    options={COLLEGES}
                    error={errors.college}
                    required
                  />
                  <Select
                    label="Course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    options={COURSES}
                    error={errors.course}
                    required
                  />
                  <Select
                    label="Branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    options={BRANCHES}
                    error={errors.branch}
                    required
                  />
                  <Select
                    label="Year of Study"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    options={YEARS}
                    error={errors.year}
                    required
                  />
                </div>
              </div>

              {/* Project Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Information
                </h2>
                <div className="space-y-6">
                  <Select
                    label="Domain / Track"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    options={DOMAINS}
                    error={errors.domain}
                    required
                  />
                  <Input
                    label="Project Name"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    error={errors.projectName}
                    placeholder="Enter your innovative project name"
                    required
                  />
                  <Input
                    label="PPT Link"
                    name="pptLink"
                    value={formData.pptLink}
                    onChange={handleChange}
                    error={errors.pptLink}
                    placeholder="https://drive.google.com/..."
                    required
                  />
                  <Input
                    label="Prototype Link"
                    name="prototypeLink"
                    value={formData.prototypeLink}
                    onChange={handleChange}
                    error={errors.prototypeLink}
                    placeholder="https://github.com/..."
                    required
                  />
                  <Input
                    label="Demo Video Link (Optional)"
                    name="demoVideoLink"
                    value={formData.demoVideoLink}
                    onChange={handleChange}
                    error={errors.demoVideoLink}
                    placeholder="https://youtube.com/..."
                  />
                </div>
              </div>

              {/* Team Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Team Information
                </h2>
                <div className="space-y-6">
                  <Select
                    label="Team Size"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleTeamSizeChange}
                    options={TEAM_SIZES}
                    required
                  />

                  {formData.teamSize > 1 && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add {formData.teamSize - 1} team member(s) (excluding yourself)
                      </p>
                      {formData.teamMembers.map((member, index) => (
                        <div
                          key={index}
                          className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg space-y-4"
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Team Member {index + 1}
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              label="Member Name"
                              value={member.memberName}
                              onChange={(e) =>
                                handleTeamMemberChange(
                                  index,
                                  'memberName',
                                  e.target.value
                                )
                              }
                              error={errors[`member${index}Name`]}
                              required
                            />
                            <Input
                              label="Member Email"
                              type="email"
                              value={member.memberEmail}
                              onChange={(e) =>
                                handleTeamMemberChange(
                                  index,
                                  'memberEmail',
                                  e.target.value
                                )
                              }
                              error={errors[`member${index}Email`]}
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  loading={submitLoading}
                  className="flex-1"
                >
                  {existingRegistration ? 'Update Registration' : 'Submit Registration'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;