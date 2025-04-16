
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  BookOpen 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock data for courses
const mockCourses = [
  { id: 1, name: 'Introduction to Computer Science', credits: 3 },
  { id: 2, name: 'Calculus I', credits: 4 },
  { id: 3, name: 'Digital Marketing', credits: 3 },
  { id: 4, name: 'Physics 101', credits: 4 },
  { id: 5, name: 'English Composition', credits: 3 },
];

export const CoursesList = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({ id: 0, name: '', credits: 0 });
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseCredits, setNewCourseCredits] = useState(3);

  // Filter courses based on search term
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    if (newCourseName.trim() === '') {
      toast({
        title: "Error",
        description: "Course name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newCourse = {
      id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
      name: newCourseName,
      credits: newCourseCredits
    };

    setCourses([...courses, newCourse]);
    setNewCourseName('');
    setNewCourseCredits(3);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Course added successfully",
    });
  };

  const handleEditCourse = () => {
    if (newCourseName.trim() === '') {
      toast({
        title: "Error",
        description: "Course name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const updatedCourses = courses.map(course => 
      course.id === currentCourse.id 
        ? { ...course, name: newCourseName, credits: newCourseCredits } 
        : course
    );

    setCourses(updatedCourses);
    setNewCourseName('');
    setNewCourseCredits(3);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Course updated successfully",
    });
  };

  const handleDeleteCourse = () => {
    const updatedCourses = courses.filter(course => course.id !== currentCourse.id);
    setCourses(updatedCourses);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Course deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search courses..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-primary" />
                      {course.name}
                    </div>
                  </TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentCourse(course);
                          setNewCourseName(course.name);
                          setNewCourseCredits(course.credits);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentCourse(course);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No courses found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="course-name">
                Course Name
              </label>
              <Input
                id="course-name"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="course-credits">
                Credits
              </label>
              <Input
                id="course-credits"
                type="number"
                min="1"
                max="6"
                value={newCourseCredits}
                onChange={(e) => setNewCourseCredits(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCourse}>
              Add Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-course-name">
                Course Name
              </label>
              <Input
                id="edit-course-name"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-course-credits">
                Credits
              </label>
              <Input
                id="edit-course-credits"
                type="number"
                min="1"
                max="6"
                value={newCourseCredits}
                onChange={(e) => setNewCourseCredits(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCourse}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the course "{currentCourse.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
