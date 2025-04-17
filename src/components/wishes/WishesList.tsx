import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ChevronRight, BookOpen, Clock, Layout, ListOrdered, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Wish, wishes, teachers, getTeacherById, courses, classes, getClassById } from '@/lib/data';

export const WishItem = ({ wish, showTeacher = true }: { wish: Wish, showTeacher?: boolean }) => {
  const teacher = getTeacherById(wish.teacherId);
  
  // Get preferred courses names
  const preferredCourses = wish.preferredCourses.map(courseId => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  });
  
  // Get preferred classes names
  const preferredClasses = wish.preferredClasses.map(classId => {
    const cls = classes.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown Class';
  });
  
  return (
    <Card className="hover-scale">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Teacher Information - Replace title and tags */}
          <div className="flex items-start gap-3 md:w-1/4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={teacher?.avatar} alt={teacher?.name} />
              <AvatarFallback>{teacher?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{teacher?.name}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Briefcase className="w-3 h-3 mr-1" /> 
                <span>{teacher?.department}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="w-3 h-3 mr-1" /> 
                <span>{teacher?.subject}</span>
              </div>
            </div>
          </div>
          
          {/* Courses Section - Middle */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-1 mb-2">
              <ListOrdered className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Preferred Courses:</span>
            </div>
            <div className="space-y-1">
              {preferredCourses.slice(0, 3).map((course, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-xs font-medium bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm truncate">{course}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Classes Section */}
          <div className="md:w-1/4">
            <div className="flex items-center gap-1 mb-2">
              <Layout className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Preferred Classes:</span>
            </div>
            <div className="space-y-1">
              {preferredClasses.slice(0, 3).map((cls, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-xs font-medium bg-gray-100 rounded-full w-4 h-4 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm truncate">{cls}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Hours Section - Right Side */}
          <div className="md:w-1/6 flex flex-row md:flex-col justify-between md:items-end">
            <div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <div className="text-sm font-medium">{wish.teachingHours.total} hours</div>
              </div>
              <div className="text-xs space-y-1 text-gray-600">
                <div>Lectures: {wish.teachingHours.lecture}h</div>
                <div>TD: {wish.teachingHours.tutorial}h</div>
                <div>TP: {wish.teachingHours.practical}h</div>
                {wish.teachingHours.additional > 0 && (
                  <div className="text-primary">+{wish.teachingHours.additional}h additional</div>
                )}
              </div>
            </div>
            <Link to={`/wishes/${wish.id}`}>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const WishesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredWishes = wishes.filter(wish => {
    const matchesSearch = 
      wish.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wish.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || wish.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || wish.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  const categories = [...new Set(wishes.map(wish => wish.category))];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search wishes..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="w-4 h-4" />
                <span>Status</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('approved')}>Approved</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('declined')}>Declined</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="w-4 h-4" />
                <span>Category</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCategoryFilter('all')}>
                All Categories
              </DropdownMenuItem>
              {categories.map(category => (
                <DropdownMenuItem key={category} onClick={() => setCategoryFilter(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button className="flex items-center gap-1">
            <Plus className="w-4 h-4" />
            <span>Add Wish</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {filteredWishes.length > 0 ? (
          filteredWishes.map((wish) => (
            <WishItem key={wish.id} wish={wish} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No wishes found matching your filters</p>
            <Button onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCategoryFilter('all');
            }}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};
