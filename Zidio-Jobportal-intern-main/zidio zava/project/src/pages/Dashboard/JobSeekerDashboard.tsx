import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  Heart, 
  Bell, 
  TrendingUp, 
  MapPin,
  Calendar,
  Eye,
  Download,
  Edit,
  Plus
} from 'lucide-react';
import { Application, Job } from '../../types';

const JobSeekerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API calls
  const stats = {
    appliedJobs: 12,
    savedJobs: 8,
    profileViews: 45,
    interviewsScheduled: 3
  };

  const recentApplications: Application[] = [
    {
      id: '1',
      jobId: '1',
      userId: '1',
      resumeUrl: '/resume.pdf',
      coverLetter: 'I am very interested...',
      status: 'PENDING',
      appliedDate: '2025-01-15',
      job: {
        id: '1',
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        salary: '$120k - $180k',
        type: 'FULL_TIME',
        experience: '5+ years',
        skills: ['React', 'Node.js'],
        postedBy: 'recruiter1',
        postedDate: '2025-01-10',
        deadline: '2025-02-10',
        status: 'ACTIVE',
        description: 'Great opportunity...'
      }
    },
    {
      id: '2',
      jobId: '2',
      userId: '1',
      resumeUrl: '/resume.pdf',
      coverLetter: 'Perfect fit for my skills...',
      status: 'REVIEWED',
      appliedDate: '2025-01-12',
      job: {
        id: '2',
        title: 'Product Manager',
        company: 'Innovation Labs',
        location: 'New York, NY',
        salary: '$100k - $150k',
        type: 'FULL_TIME',
        experience: '3+ years',
        skills: ['Product Strategy', 'Analytics'],
        postedBy: 'recruiter2',
        postedDate: '2025-01-08',
        deadline: '2025-02-08',
        status: 'ACTIVE',
        description: 'Join our product team...'
      }
    }
  ];

  const savedJobs: Job[] = [
    {
      id: '3',
      title: 'UX Designer',
      company: 'Design Studio',
      location: 'Remote',
      salary: '$80k - $120k',
      type: 'FULL_TIME',
      experience: '2+ years',
      skills: ['Figma', 'User Research'],
      postedBy: 'recruiter3',
      postedDate: '2025-01-13',
      deadline: '2025-02-13',
      status: 'ACTIVE',
      description: 'Create amazing user experiences...'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWED':
        return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Under Review';
      case 'REVIEWED':
        return 'Reviewed';
      case 'ACCEPTED':
        return 'Accepted';
      case 'REJECTED':
        return 'Not Selected';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your job search progress and manage applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Applied Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.appliedJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Saved Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.savedJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.profileViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.interviewsScheduled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'applications', label: 'My Applications', icon: FileText },
                { id: 'saved', label: 'Saved Jobs', icon: Heart },
                { id: 'profile', label: 'Profile', icon: Edit }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Briefcase className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Applied to Senior Software Engineer at TechCorp Inc.
                        </p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Eye className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Your profile was viewed by Innovation Labs
                        </p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Jobs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedJobs.slice(0, 2).map((job) => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-gray-900 mb-2">{job.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Applications</h3>
                  <Link
                    to="/jobs"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Apply to More Jobs</span>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {application.job?.title}
                          </h4>
                          <p className="text-gray-600">{application.job?.company}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusText(application.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {application.job?.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Resume submitted
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <Link
                          to={`/jobs/${application.jobId}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Job
                        </Link>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                          Download Resume
                        </button>
                        {application.status === 'PENDING' && (
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Withdraw Application
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Jobs Tab */}
            {activeTab === 'saved' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Saved Jobs</h3>
                  <Link
                    to="/jobs"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Browse More Jobs →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h4>
                      <p className="text-gray-600 mb-3">{job.company}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Apply Now
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Heart className="h-4 w-4 text-red-500 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-blue-600 mr-2" />
                    <p className="text-blue-800 text-sm">
                      Complete your profile to get better job recommendations and increase your visibility to employers.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                      <p className="text-gray-600 text-sm mb-4">Update your basic information and contact details.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Edit Information →
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Resume & Portfolio</h4>
                      <p className="text-gray-600 text-sm mb-4">Upload your latest resume and showcase your work.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Manage Files →
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Skills & Experience</h4>
                      <p className="text-gray-600 text-sm mb-4">Add your skills and work experience to attract employers.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Update Skills →
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Job Preferences</h4>
                      <p className="text-gray-600 text-sm mb-4">Set your preferred job types, locations, and salary range.</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Set Preferences →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;