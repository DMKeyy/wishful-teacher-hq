
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Search, Filter, Plus, Edit, Trash2, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { teachers, Teacher } from '@/lib/data';

export const TeachersList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teachersList, setTeachersList] = useState(teachers);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);
  
  // Form state
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');
  const [newTeacherDepartment, setNewTeacherDepartment] = useState('');
  
  const filteredTeachers = teachersList.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && teacher.department === filter;
  });

  const departments = [...new Set(teachersList.map(teacher => teacher.department))];
  
  const handleAddTeacher = () => {
    if (newTeacherName.trim() === '' || newTeacherEmail.trim() === '') {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    const newTeacher = {
      id: teachersList.length > 0 ? Math.max(...teachersList.map(t => t.id)) + 1 : 1,
      name: newTeacherName,
      email: newTeacherEmail,
      subject: newTeacherSubject,
      department: newTeacherDepartment,
      avatar: "/placeholder.svg",
      joinDate: new Date().toISOString().split('T')[0],
      wishesCount: 0,
      completedWishesCount: 0,
      courses: []
    };

    setTeachersList([...teachersList, newTeacher]);
    resetForm();
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Teacher added successfully",
    });
  };

  const handleEditTeacher = () => {
    if (!currentTeacher) return;
    
    if (newTeacherName.trim() === '' || newTeacherEmail.trim() === '') {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    const updatedTeachers = teachersList.map(teacher => 
      teacher.id === currentTeacher.id 
        ? { 
            ...teacher, 
            name: newTeacherName, 
            email: newTeacherEmail,
            subject: newTeacherSubject,
            department: newTeacherDepartment 
          } 
        : teacher
    );

    setTeachersList(updatedTeachers);
    resetForm();
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Teacher updated successfully",
    });
  };

  const handleDeleteTeacher = () => {
    if (!currentTeacher) return;

    const updatedTeachers = teachersList.filter(teacher => teacher.id !== currentTeacher.id);
    setTeachersList(updatedTeachers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Teacher deleted successfully",
    });
  };

  const resetForm = () => {
    setNewTeacherName('');
    setNewTeacherEmail('');
    setNewTeacherSubject('');
    setNewTeacherDepartment('');
    setCurrentTeacher(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search teachers..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Filter className="w-4 h-4" />
                <span>Department</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilter('all')}>
                All Departments
              </DropdownMenuItem>
              {departments.map(dept => (
                <DropdownMenuItem key={dept} onClick={() => setFilter(dept)}>
                  {dept}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setIsAddDialogOpen(true)} style={{ backgroundColor: '#9eb2b4' }}>
            <Plus className="mr-2 h-4 w-4" /> Add Teacher
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Wishes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                          <span className="font-medium">{teacher.name}</span>
                        </div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{teacher.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{teacher.completedWishesCount}</span>
                      <span className="text-gray-500">/</span>
                      <span className="text-sm text-gray-500">{teacher.wishesCount}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentTeacher(teacher);
                          setNewTeacherName(teacher.name);
                          setNewTeacherEmail(teacher.email);
                          setNewTeacherSubject(teacher.subject);
                          setNewTeacherDepartment(teacher.department);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentTeacher(teacher);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Link to={`/teachers/${teacher.id}`}>
                        <Button variant="outline" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                  No teachers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Teacher Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Teacher</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="teacher-name">
                Teacher Name
              </label>
              <Input
                id="teacher-name"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
                placeholder="Enter teacher name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="teacher-email">
                Email
              </label>
              <Input
                id="teacher-email"
                type="email"
                value={newTeacherEmail}
                onChange={(e) => setNewTeacherEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="teacher-subject">
                Subject
              </label>
              <Input
                id="teacher-subject"
                value={newTeacherSubject}
                onChange={(e) => setNewTeacherSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="teacher-department">
                Department
              </label>
              <Input
                id="teacher-department"
                value={newTeacherDepartment}
                onChange={(e) => setNewTeacherDepartment(e.target.value)}
                placeholder="Enter department"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsAddDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleAddTeacher} style={{ backgroundColor: '#9eb2b4' }}>
              Add Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-teacher-name">
                Teacher Name
              </label>
              <Input
                id="edit-teacher-name"
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
                placeholder="Enter teacher name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-teacher-email">
                Email
              </label>
              <Input
                id="edit-teacher-email"
                type="email"
                value={newTeacherEmail}
                onChange={(e) => setNewTeacherEmail(e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-teacher-subject">
                Subject
              </label>
              <Input
                id="edit-teacher-subject"
                value={newTeacherSubject}
                onChange={(e) => setNewTeacherSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-teacher-department">
                Department
              </label>
              <Input
                id="edit-teacher-department"
                value={newTeacherDepartment}
                onChange={(e) => setNewTeacherDepartment(e.target.value)}
                placeholder="Enter department"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              resetForm();
              setIsEditDialogOpen(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleEditTeacher} style={{ backgroundColor: '#9eb2b4' }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Teacher Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Teacher</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the teacher "{currentTeacher?.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeacher}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
