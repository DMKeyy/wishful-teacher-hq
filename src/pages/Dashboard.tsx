
import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { AreaChart, Area } from 'recharts';
import { Users, BookOpen, CheckCircle, Clock, GraduationCap, FileText } from 'lucide-react';
import { teachers, wishes, courses, getWishStatusCounts, getCourseWishCounts, getTeachersByCourse } from '@/lib/data';

const Dashboard = () => {
  const wishStatusCounts = getWishStatusCounts();
  const courseWishCounts = getCourseWishCounts();
  const teachersByCourse = getTeachersByCourse();
  
  // Format course wish data for charts
  const courseWishData = Object.keys(courseWishCounts).map(courseId => {
    const courseName = courses.find(c => c.id === parseInt(courseId))?.name || 'Unknown';
    return {
      name: courseName,
      wishes: courseWishCounts[courseId]
    };
  });
  
  // Format teacher by course data for chart
  const teacherCourseData = Object.keys(teachersByCourse).map(courseId => {
    const courseName = courses.find(c => c.id === parseInt(courseId))?.name || 'Unknown';
    return {
      name: courseName,
      count: teachersByCourse[courseId]
    };
  });
  
  // Format status data for the pie chart
  const statusData = [
    { name: 'Pending', value: wishStatusCounts.pending, color: '#F59E0B' },
    { name: 'Approved', value: wishStatusCounts.approved, color: '#10B981' },
    { name: 'Completed', value: wishStatusCounts.completed, color: '#3B82F6' },
    { name: 'Declined', value: wishStatusCounts.declined, color: '#EF4444' },
  ];
  
  return (
    <>
      <Header title="Dashboard" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-[#9eb2b4] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Teachers
              </CardTitle>
              <Users className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{teachers.length}</div>
              <p className="text-xs text-white/80">
                Active teachers in the system
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#9eb2b4] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Total Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{courses.length}</div>
              <p className="text-xs text-white/80">
                Total courses available
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#9eb2b4] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Submitted Wishes
              </CardTitle>
              <FileText className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{wishes.length}</div>
              <p className="text-xs text-white/80">
                Total wish requests submitted
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#9eb2b4] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_-2px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">
                Pending Wishes
              </CardTitle>
              <Clock className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{wishStatusCounts.pending}</div>
              <p className="text-xs text-white/80">
                Wishes awaiting completion
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Wishes by Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseWishData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="wishes" 
                      fill="#6366F1" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Wishes by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Teachers by Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teacherCourseData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Course Credit Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={courses.map(course => ({ name: course.name, credits: course.credits }))} 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="credits" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
