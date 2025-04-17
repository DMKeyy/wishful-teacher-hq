
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, Check, X, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getTeacherById, getWishesByTeacherId } from '@/lib/data';
import { WishItem } from '../wishes/WishesList';

export const TeacherDetail = () => {
  const { id } = useParams();
  const teacherId = parseInt(id || '0');
  
  const teacher = getTeacherById(teacherId);
  const wishes = getWishesByTeacherId(teacherId);
  
  if (!teacher) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Teacher not found</h2>
        <Link to="/teachers">
          <Button>Back to Teachers</Button>
        </Link>
      </div>
    );
  }
  
  // Check if teacher has submitted wishes
  const hasSubmittedWishes = wishes.length > 0;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/teachers">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">Teacher Profile</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={teacher.avatar} alt={teacher.name} />
                <AvatarFallback className="text-2xl">{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>{teacher.name}</CardTitle>
            <CardDescription>{teacher.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>Joined {new Date(teacher.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                {hasSubmittedWishes ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600">Wishes submitted</span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-500" />
                    <span className="text-red-600">No wishes submitted</span>
                  </>
                )}
              </div>
              
              <div className="pt-4 flex justify-between">
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
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="wishes">
            <TabsList className="mb-4">
              <TabsTrigger value="wishes">Wishes ({wishes.length})</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wishes" className="space-y-4">
              {wishes.length > 0 ? (
                <div className="space-y-3">
                  {wishes.map((wish) => (
                    <WishItem key={wish.id} wish={wish} showTeacher={false} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-gray-500 mb-4">No wishes found for this teacher</p>
                    <Button>Add New Wish</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="stats">
              <Card>
                <CardContent className="py-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="stats-card">
                      <h3 className="text-sm font-medium text-gray-500">Total Wishes</h3>
                      <p className="text-3xl font-bold">{teacher.wishesCount}</p>
                    </div>
                    <div className="stats-card">
                      <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                      <p className="text-3xl font-bold">{teacher.completedWishesCount}</p>
                    </div>
                    <div className="stats-card col-span-2">
                      <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
                      <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(teacher.completedWishesCount / teacher.wishesCount) * 100}%` }}
                        ></div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {Math.round((teacher.completedWishesCount / teacher.wishesCount) * 100)}% complete
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardContent className="py-6">
                  <p className="text-gray-500 italic">No notes added yet.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
