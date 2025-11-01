import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye, 
  TrendingUp,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';
import { Job, Application } from '../../types';

const RecruiterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API calls
  const stats = {
    activeJobs: 8,
    totalApplications: 156,
    interviewsScheduled: 12,
    hiredCandidates: 5
  };

  const myJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      description: 'We are looking for a Senior Software Engineer...',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120,000 - $180,000',
      type: 'FULL_TIME',
      experience: '5+ years',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      postedBy: 'recruiter1',
      postedDate: '2025-01-15',
      deadline: '2025-02-15',
      status: 'ACTIVE'
    },
    {
      id: '2',
      title: 'Product Manager',
      description: 'Join our product team to drive innovation...',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      salary: '$100,000 - $150,000',
      type: 'FULL_TIME',
      experience: '3+ years',
      skills: ['Product Strategy', 'Analytics', 'Agile'],
      postedBy: 'recruiter1',
      postedDate: '2025-01-10',
      deadline: '2025-02-10',
      status: 'ACTIVE'
    }
  ];

  const recentApplications: Application[] = [
    {
      id: '1',
      jobId: '1',
      userId: '1',
      resumeUrl: '/resume.pdf',
      coverLetter: 'I am very interested in this position...',
      status: 'PENDING',
      appliedDate: '2025-01-16',
      job: myJobs[0],
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'JOB_SEEKER',
        createdAt: '2025-01-01'
      }
    },
    {
      id: '2',
      jobId: '1',
      userId: '2',
      resumeUrl: '/resume2.pdf',
      coverLetter: 'Perfect fit for my skills and experience...',
      status: 'REVIEWED',
      appliedDate: '2025-01-15',
      job: myJobs[0],
      user: {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'JOB_SEEKER',
        createdAt: '2025-01-01'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-red-100 text-red-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationStatusColor = (status: string) => {
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

  const handleApplicationAction = (applicationId: string, action: 'accept' | 'reject') => {
    // Mock API call to update application status
    console.log(`${action} application ${applicationId}`);
    // In real app, update the applications list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
          </div>
          <Link
            to="/recruiter/post-job"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Post New Job</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
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

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Hired</p>
                <p className="text-2xl font-bold text-gray-900">{stats.hiredCandidates}</p>
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
                { id: 'jobs', label: 'My Jobs', icon: Briefcase },
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'candidates', label: 'Candidates', icon: Users }
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
                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          New application for Senior Software Engineer
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Product Manager job viewed 15 times today
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Jobs</h3>
                    <div className="space-y-3">
                      {myJobs.slice(0, 3).map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{job.title}</h4>
                            <p className="text-sm text-gray-500">23 applications</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-green-600">+5 today</p>
                            <p className="text-xs text-gray-500">85% match rate</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Actions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Review Applications</h4>
                          <p className="text-sm text-gray-500">8 new applications to review</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Review →
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Schedule Interviews</h4>
                          <p className="text-sm text-gray-500">3 candidates waiting</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Schedule →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Job Postings</h3>
                  <Link
                    to="/recruiter/post-job"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Post New Job</span>
                  </Link>
                </div>

                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h4>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                          <div className="flex space-x-1">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          Expires {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-600">
                            <strong>23</strong> applications
                          </span>
                          <span className="text-gray-600">
                            <strong>156</strong> views
                          </span>
                        </div>
                        <div className="flex space-x-3">
                          <Link
                            to={`/jobs/${job.id}`}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Job
                          </Link>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            View Applications
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Applications</h3>
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{application.user?.name}</h4>
                            <p className="text-gray-600">{application.user?.email}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Applied for: <span className="font-medium">{application.job?.title}</span>
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Cover Letter:</h5>
                        <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                          {application.coverLetter}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Applied {new Date(application.appliedDate).toLocaleDateString()}</span>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Download Resume
                          </button>
                        </div>
                        
                        {application.status === 'PENDING' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApplicationAction(application.id, 'reject')}
                              className="flex items-center space-x-1 px-3 py-1 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <XCircle className="h-4 w-4" />
                              <span>Reject</span>
                            </button>
                            <button
                              onClick={() => handleApplicationAction(application.id, 'accept')}
                              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Accept</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Candidates Tab */}
            {activeTab === 'candidates' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Candidate Pipeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-3">Under Review (8)</h4>
                    <div className="space-y-2">
                      {recentApplications.filter(app => app.status === 'PENDING').map((application) => (
                        <div key={application.id} className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">{application.user?.name}</p>
                          <p className="text-xs text-gray-500">{application.job?.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Interview Scheduled (5)</h4>
                    <div className="space-y-2">
                      {recentApplications.filter(app => app.status === 'REVIEWED').map((application) => (
                        <div key={application.id} className="bg-white p-3 rounded border">
                          <p className="font-medium text-sm">{application.user?.name}</p>
                          <p className="text-xs text-gray-500">{application.job?.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-3">Hired (3)</h4>
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border">
                        <p className="font-medium text-sm">Alice Johnson</p>
                        <p className="text-xs text-gray-500">Senior Software Engineer</p>
                      </div>
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

export default RecruiterDashboard;