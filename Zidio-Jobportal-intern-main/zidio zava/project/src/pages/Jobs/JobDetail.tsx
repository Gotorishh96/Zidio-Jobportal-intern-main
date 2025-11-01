import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  Building, 
  Users, 
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle,
  Upload,
  FileText
} from 'lucide-react';
import { Job } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null as File | null
  });

  // Mock job data - replace with API call
  const mockJob: Job = {
    id: '1',
    title: 'Senior Software Engineer',
    description: `We are looking for a Senior Software Engineer to join our dynamic team and help build the next generation of our platform.

**About the Role:**
As a Senior Software Engineer, you will be responsible for designing, developing, and maintaining high-quality software solutions. You'll work closely with cross-functional teams to deliver features that impact millions of users worldwide.

**Key Responsibilities:**
• Design and implement scalable software solutions
• Collaborate with product managers and designers to define requirements
• Mentor junior developers and contribute to code reviews
• Optimize application performance and ensure high availability
• Stay up-to-date with emerging technologies and best practices

**What We Offer:**
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements and remote-friendly culture
• Professional development opportunities and conference attendance
• State-of-the-art equipment and modern office space
• Unlimited PTO and sabbatical programs

**Company Culture:**
We believe in fostering an inclusive environment where everyone can thrive. Our team values collaboration, innovation, and continuous learning. We're committed to building products that make a positive impact on people's lives.`,
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $180,000',
    type: 'FULL_TIME',
    experience: '5+ years',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'Redis'],
    postedBy: 'recruiter1',
    postedDate: '2025-01-15',
    deadline: '2025-02-15',
    status: 'ACTIVE'
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    // Mock application submission
    console.log('Submitting application:', {
      jobId: job?.id,
      userId: user?.id,
      coverLetter: applicationData.coverLetter,
      resume: applicationData.resume
    });

    // Close modal and show success message
    setShowApplicationModal(false);
    alert('Application submitted successfully!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({ ...prev, resume: file }));
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'FULL_TIME':
        return 'bg-green-100 text-green-800';
      case 'PART_TIME':
        return 'bg-blue-100 text-blue-800';
      case 'CONTRACT':
        return 'bg-purple-100 text-purple-800';
      case 'INTERNSHIP':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatJobType = (type: string) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-700 font-medium">
            Browse all jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/jobs"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to jobs
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center text-lg text-gray-600 mb-4">
                <Building className="h-5 w-5 mr-2" />
                <span className="font-medium">{job.company}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {job.experience}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                  {formatJobType(job.type)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-full border transition-colors ${
                  isSaved
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-gray-300 bg-white text-gray-600 hover:text-red-600'
                }`}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
              <button className="p-3 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-gray-800 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setShowApplicationModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
              <div className="prose prose-blue max-w-none">
                {job.description.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('•')) {
                    return (
                      <li key={index} className="text-gray-700 mb-1">
                        {paragraph.substring(2)}
                      </li>
                    );
                  } else if (paragraph.trim()) {
                    return (
                      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Posted</div>
                    <div className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Deadline</div>
                    <div className="font-medium">{new Date(job.deadline).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Applicants</div>
                    <div className="font-medium">23 applied</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
              <div className="text-4xl mb-4">🚀</div>
              <p className="text-gray-600 text-sm mb-4">
                TechCorp Inc. is a leading technology company focused on building innovative solutions 
                that transform how people work and collaborate.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Industry:</span>
                  <span className="font-medium">Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Company Size:</span>
                  <span className="font-medium">1,000+ employees</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Founded:</span>
                  <span className="font-medium">2015</span>
                </div>
              </div>
              <Link
                to={`/companies/${job.company}`}
                className="inline-block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View company profile →
              </Link>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                {[
                  { title: 'Full Stack Developer', company: 'StartupXYZ', location: 'Remote' },
                  { title: 'Software Engineer', company: 'Innovation Labs', location: 'New York, NY' },
                  { title: 'Backend Developer', company: 'DataTech', location: 'Boston, MA' }
                ].map((similarJob, index) => (
                  <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <h4 className="font-medium text-gray-900 text-sm">{similarJob.title}</h4>
                    <p className="text-gray-600 text-xs">{similarJob.company}</p>
                    <p className="text-gray-500 text-xs">{similarJob.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for {job.title}</h3>
            
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData(prev => ({ ...prev, coverLetter: e.target.value }))}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us why you're interested in this position..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resume
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                    required
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    {applicationData.resume ? (
                      <div className="flex items-center justify-center">
                        <FileText className="h-8 w-8 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{applicationData.resume.name}</span>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload your resume</p>
                        <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;