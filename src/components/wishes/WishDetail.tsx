
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, User, Tag, Clock, Edit, Trash2, CheckCircle, XCircle, BookOpen, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getWishById, getTeacherById, courses } from '@/lib/data';

export const WishDetail = () => {
  const { id } = useParams();
  const wishId = parseInt(id || '0');
  
  const wish = getWishById(wishId);
  const teacher = wish ? getTeacherById(wish.teacherId) : null;
  const course = wish?.courseId ? courses.find(course => course.id === wish.courseId) : null;
  
  if (!wish || !teacher) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Wish not found</h2>
        <Link to="/wishes">
          <Button>Back to Wishes</Button>
        </Link>
      </div>
    );
  }
  
  // Status badge colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Priority badge colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Generate hours breakdown (mocked for now, would use actual data in real implementation)
  const lectureHours = Math.floor(Math.random() * 15);
  const tutorialHours = Math.floor(Math.random() * 10);
  const practicalHours = Math.floor(Math.random() * 8);
  const additionalHours = Math.floor(Math.random() * 5);
  const totalHours = lectureHours + tutorialHours + practicalHours;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/wishes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Wish Details</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{wish.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className={getStatusColor(wish.status)} variant="outline">
                      {wish.status.charAt(0).toUpperCase() + wish.status.slice(1)}
                    </Badge>
                    <Badge className={getPriorityColor(wish.priority)} variant="outline">
                      {wish.priority.charAt(0).toUpperCase() + wish.priority.slice(1)} Priority
                    </Badge>
                    <Badge variant="outline">{wish.category}</Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                  <Button variant="destructive" className="flex items-center gap-1">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{wish.description}</p>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Date Created</div>
                    <div className="font-medium">{new Date(wish.dateCreated).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Estimated Cost</div>
                    <div className="font-medium">${wish.estimatedCost.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Course</div>
                    <div className="font-medium">{course ? course.name : 'Unknown'}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Total Hours</div>
                    <div className="font-medium">{totalHours} hours</div>
                  </div>
                </div>
              </div>
              
              {/* New Teaching Hours Breakdown */}
              <div className="mt-6">
                <h3 className="text-md font-medium flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" />
                  <span>Teaching Hours Breakdown</span>
                </h3>
                
                <div className="mt-3 grid grid-cols-2 gap-y-3 border rounded-md p-4">
                  <div>
                    <div className="text-sm text-gray-500">Lectures</div>
                    <div className="font-medium">{lectureHours} hours</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Tutorials (TD)</div>
                    <div className="font-medium">{tutorialHours} hours</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Practicals (TP)</div>
                    <div className="font-medium">{practicalHours} hours</div>
                  </div>
                  {additionalHours > 0 && (
                    <div>
                      <div className="text-sm text-gray-500">Additional Hours</div>
                      <div className="font-medium text-primary">+{additionalHours} hours</div>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1"
                  disabled={wish.status === 'declined'}
                >
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Decline</span>
                </Button>
                
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-1"
                    disabled={wish.status === 'approved'}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Approve</span>
                  </Button>
                  
                  <Button
                    className="flex items-center gap-1"
                    disabled={wish.status === 'completed' || wish.status === 'declined'}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Teacher Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{teacher.name}</div>
                  <div className="text-sm text-gray-500">{teacher.email}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Department</div>
                    <div className="font-medium">{teacher.department}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-500">Joined</div>
                    <div className="font-medium">{new Date(teacher.joinDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Wishes</span>
                  <span className="font-medium">{teacher.wishesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Completed</span>
                  <span className="font-medium">{teacher.completedWishesCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Additional Hours Requested</span>
                  <span className="font-medium">{additionalHours} hours</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Link to={`/teachers/${teacher.id}`}>
                  <Button variant="outline" className="w-full">View Teacher Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
