
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';
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
import { Wish, wishes, teachers, getTeacherById } from '@/lib/data';

export const WishItem = ({ wish, showTeacher = true }: { wish: Wish, showTeacher?: boolean }) => {
  const teacher = getTeacherById(wish.teacherId);
  
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
  
  return (
    <Card className="hover-scale">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{wish.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{wish.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className={getStatusColor(wish.status)} variant="outline">
                {wish.status.charAt(0).toUpperCase() + wish.status.slice(1)}
              </Badge>
              <Badge className={getPriorityColor(wish.priority)} variant="outline">
                {wish.priority.charAt(0).toUpperCase() + wish.priority.slice(1)} Priority
              </Badge>
              <Badge variant="outline">{wish.category}</Badge>
            </div>
            
            {showTeacher && teacher && (
              <div className="mt-4 flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{teacher.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col items-end justify-between">
            <div className="text-sm font-medium">${wish.estimatedCost.toLocaleString()}</div>
            <Link to={`/wishes/${wish.id}`}>
              <Button variant="ghost" size="icon" className="mt-4">
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
