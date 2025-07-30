import React, { useState, useEffect } from 'react';
import { patientsService } from '@/services/api/patientsService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'react-toastify';

function ActivityTimeline({ patientId, className = '' }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (patientId) {
      loadActivities();
    }
  }, [patientId]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patientsService.getPatientActivities(patientId);
      setActivities(data);
    } catch (err) {
      console.error('Error loading patient activities:', err);
      setError(err.message);
      toast.error('Failed to load patient activity timeline');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      admission: 'UserPlus',
      discharge: 'UserMinus',
      appointment: 'Calendar',
      treatment: 'Activity',
      prescription: 'Pill',
      update: 'Edit',
      'lab-result': 'TestTube',
      note: 'FileText'
    };
    return iconMap[type] || 'Circle';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      admission: 'text-emerald-600 bg-emerald-100',
      discharge: 'text-amber-600 bg-amber-100',
      appointment: 'text-sky-600 bg-sky-100',
      treatment: 'text-primary-600 bg-primary-100',
      prescription: 'text-red-600 bg-red-100',
      update: 'text-slate-600 bg-slate-100',
      'lab-result': 'text-purple-600 bg-purple-100',
      note: 'text-indigo-600 bg-indigo-100'
    };
    return colorMap[type] || 'text-slate-600 bg-slate-100';
  };

  const getActivityLabel = (type) => {
    const labelMap = {
      admission: 'Admission',
      discharge: 'Discharge',
      appointment: 'Appointment',
      treatment: 'Treatment',
      prescription: 'Prescription',
      update: 'Record Update',
      'lab-result': 'Lab Result',
      note: 'Clinical Note'
    };
    return labelMap[type] || 'Activity';
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadActivities} />;
  }

  if (!activities || activities.length === 0) {
    return (
      <Empty 
        title="No Activity Found" 
        description="No recent activity has been recorded for this patient."
        icon="Activity"
      />
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
        
        {/* Activity items */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.Id} className="relative flex items-start gap-4">
              {/* Timeline dot */}
              <div className={`
                relative z-10 flex items-center justify-center w-12 h-12 rounded-full
                ${getActivityColor(activity.type)} flex-shrink-0
              `}>
                <ApperIcon 
                  name={getActivityIcon(activity.type)} 
                  size={18} 
                />
              </div>
              
              {/* Activity content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-soft hover:shadow-medium transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`
                        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${getActivityColor(activity.type)}
                      `}>
                        {getActivityLabel(activity.type)}
                      </span>
                    </div>
                    <div className="text-right text-sm text-slate-500 flex-shrink-0">
                      <div className="font-medium">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </div>
                      <div className="text-xs">
                        {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-700 mb-3 leading-relaxed">
                    {activity.description}
                  </p>
                  
                  {/* User attribution */}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <ApperIcon name="User" size={14} />
                    <span>by {activity.user}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Timeline end indicator */}
      <div className="flex items-center gap-4 ml-6">
        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
        <span className="text-sm text-slate-500 italic">End of activity timeline</span>
      </div>
    </div>
  );
}

export default ActivityTimeline;