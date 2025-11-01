import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Filter, 
  Briefcase, 
  Clock, 
  DollarSign,
  Building,
  Heart,
  ChevronDown,
  X
} from 'lucide-react';
import { Job, JobFilters } from '../../types';

const JobList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const [filters, setFilters] = useState<JobFilters>({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    experience: searchParams.get('experience') || '',
    salary: searchParams.get('salary') || ''
  });

  // Mock job data - replace with API call to your Spring Boot backend
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      description: 'We are looking for a Senior Software Engineer to join our dynamic team...',
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
      description: 'Join our product team to drive innovation and growth...',
      company: 'Innovation Labs',
      location: 'New York, NY',
      salary: '$100,000 - $150,000',
      type: 'FULL_TIME',
      experience: '3+ years',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'Leadership'],
      postedBy: 'recruiter2',
      postedDate: '2025-01-14',
      deadline: '2025-02-14',
      status: 'ACTIVE'
    },
    {
      id: '3',
      title: 'UX Designer',
      description: 'Create amazing user experiences for our digital products...',
      company: 'Design Studio',
      location: 'Remote',
      salary: '$80,000 - $120,000',
      type: 'FULL_TIME',
      experience: '2+ years',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      postedBy: 'recruiter3',
      postedDate: '2025-01-13',
      deadline: '2025-02-13',
      status: 'ACTIVE'
    },
    {
      id: '4',
      title: 'Data Scientist',
      description: 'Analyze complex data to drive business insights...',
      company: 'DataTech Solutions',
      location: 'Boston, MA',
      salary: '$110,000 - $160,000',
      type: 'FULL_TIME',
      experience: '4+ years',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      postedBy: 'recruiter4',
      postedDate: '2025-01-12',
      deadline: '2025-02-12',
      status: 'ACTIVE'
    },
    {
      id: '5',
      title: 'Marketing Specialist',
      description: 'Drive marketing campaigns and brand awareness...',
      company: 'Growth Marketing Co.',
      location: 'Austin, TX',
      salary: '$60,000 - $90,000',
      type: 'FULL_TIME',
      experience: '2+ years',
      skills: ['Digital Marketing', 'SEO', 'Content Marketing', 'Analytics'],
      postedBy: 'recruiter5',
      postedDate: '2025-01-11',
      deadline: '2025-02-11',
      status: 'ACTIVE'
    },
    {
      id: '6',
      title: 'Frontend Developer Intern',
      description: 'Learn and grow with our development team...',
      company: 'StartupXYZ',
      location: 'Seattle, WA',
      salary: '$20 - $25/hour',
      type: 'INTERNSHIP',
      experience: 'Entry level',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      postedBy: 'recruiter6',
      postedDate: '2025-01-10',
      deadline: '2025-02-10',
      status: 'ACTIVE'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let filteredJobs = mockJobs;

      // Apply filters
      if (filters.search) {
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()))
        );
      }

      if (filters.location) {
        filteredJobs = filteredJobs.filter(job =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.type) {
        filteredJobs = filteredJobs.filter(job => job.type === filters.type);
      }

      setJobs(filteredJobs);
      setLoading(false);
    }, 500);
  }, [filters]);

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      location: '',
      type: '',
      experience: '',
      salary: ''
    };
    setFilters(clearedFilters);
    setSearchParams(new URLSearchParams());
  };

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Job</h1>
              <p className="text-gray-600 mt-1">
                {loading ? 'Loading...' : `${jobs.length} jobs found`}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-4 lg:mt-0 flex-1 lg:max-w-2xl lg:ml-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="relative sm:w-64">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <select
                    value={filters.experience}
                    onChange={(e) => handleFilterChange('experience', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    <option value="Entry level">Entry Level</option>
                    <option value="2+ years">2+ Years</option>
                    <option value="3+ years">3+ Years</option>
                    <option value="5+ years">5+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <select
                    value={filters.salary}
                    onChange={(e) => handleFilterChange('salary', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Salary</option>
                    <option value="0-50k">$0 - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k-150k">$100k - $150k</option>
                    <option value="150k+">$150k+</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-800"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="h-10 w-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters.</p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          <Link to={`/jobs/${job.id}`} className="hover:text-blue-600 transition-colors">
                            {job.title}
                          </Link>
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Building className="h-4 w-4 mr-1" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-full transition-colors ${
                          savedJobs.has(job.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
                        {formatJobType(job.type)}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="text-gray-500 text-xs">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-3">
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                          Save Job
                        </button>
                        <Link
                          to={`/jobs/${job.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;