import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiUser,
  HiMail,
  HiCheckCircle,
  HiXCircle,
  HiPlusCircle,
  HiPencil,
} from 'react-icons/hi';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Loading from '../components/common/Loading';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../context/AuthContext';
import { hackathonService } from '../services/api';
import toast from 'react-hot-toast';
import { formatDateTime } from '../utils/helpers';

const Dashboard = () => {
  const { user } = useAuth();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistration();
  }, []);

  const fetchRegistration = async () => {
    try {
      const response = await hackathonService.getMyEntry();
      setRegistration(response.data.registration);
    } catch (error) {
      console.error('Failed to fetch registration:', error);
    } finally {
      setLoading(false);
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
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user?.fullName}! 👋
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl text-white font-bold">
                      {user?.fullName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {user?.fullName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {user?.email}
                  </p>
                  <Badge variant="success" size="md">
                    <HiCheckCircle className="inline mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <HiUser className="mr-2" />
                    <span className="text-sm">Member since</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDateTime(user?.createdAt)}
                  </p>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Registration Status Card */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Hackathon Registration
                  </h3>
                  {registration ? (
                    <Badge variant="success">Registered</Badge>
                  ) : (
                    <Badge variant="warning">Not Registered</Badge>
                  )}
                </div>

                {registration ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Project Name
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {registration.projectName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Domain
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {registration.domain}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Team Size
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {registration.teamSize}{' '}
                          {registration.teamSize === 1 ? 'Member' : 'Members'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Status
                        </p>
                        <Badge
                          variant={
                            registration.status === 'approved'
                              ? 'success'
                              : registration.status === 'rejected'
                              ? 'danger'
                              : 'warning'
                          }
                        >
                          {registration.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Submitted on
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatDateTime(registration.createdAt)}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Link to="/registration" className="flex-1">
                        <Button variant="outline" className="w-full">
                          <HiPencil className="mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <EmptyState
                    icon="📝"
                    title="No Registration Found"
                    description="You haven't registered for the hackathon yet. Register now to participate!"
                    action={
                      <Link to="/registration">
                        <Button icon={<HiPlusCircle />}>
                          Register Now
                        </Button>
                      </Link>
                    }
                  />
                )}
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold gradient-text">₹1L+</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Prize Pool
                  </p>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-2xl font-bold gradient-text">500+</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Participants
                  </p>
                </Card>
                <Card className="text-center">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-2xl font-bold gradient-text">30</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Days Left
                  </p>
                </Card>
              </div>

              {/* Important Information */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Important Information
                </h3>
                <ul className="space-y-3">
                  {[
                    'Make sure to submit your project before the deadline',
                    'All team members must be registered separately',
                    'Keep checking your email for updates',
                    'Join our Discord server for announcements',
                  ].map((info, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-600 dark:text-gray-400"
                    >
                      <span className="text-purple-600 mr-2">•</span>
                      {info}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;