
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  FileText 
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

// Mock data for modules
const mockModules = [
  { id: 1, name: 'Math', sections: 5, createdAt: '2023-04-10' },
  { id: 2, name: 'Science', sections: 3, createdAt: '2023-04-11' },
  { id: 3, name: 'English', sections: 7, createdAt: '2023-04-12' },
  { id: 4, name: 'History', sections: 4, createdAt: '2023-04-13' },
  { id: 5, name: 'Art', sections: 2, createdAt: '2023-04-14' },
];

// Mock data for sections
const mockSections = {
  1: [
    { id: 1, name: 'Algebra', order: 1, createdAt: '2023-04-15' },
    { id: 2, name: 'Geometry', order: 2, createdAt: '2023-04-16' },
    { id: 3, name: 'Calculus', order: 3, createdAt: '2023-04-17' },
    { id: 4, name: 'Statistics', order: 4, createdAt: '2023-04-18' },
    { id: 5, name: 'Trigonometry', order: 5, createdAt: '2023-04-19' },
  ],
  2: [
    { id: 1, name: 'Physics', order: 1, createdAt: '2023-04-15' },
    { id: 2, name: 'Chemistry', order: 2, createdAt: '2023-04-16' },
    { id: 3, name: 'Biology', order: 3, createdAt: '2023-04-17' },
  ],
  3: [
    { id: 1, name: 'Grammar', order: 1, createdAt: '2023-04-15' },
    { id: 2, name: 'Literature', order: 2, createdAt: '2023-04-16' },
    { id: 3, name: 'Poetry', order: 3, createdAt: '2023-04-17' },
    { id: 4, name: 'Essay Writing', order: 4, createdAt: '2023-04-18' },
    { id: 5, name: 'Vocabulary', order: 5, createdAt: '2023-04-19' },
    { id: 6, name: 'Reading', order: 6, createdAt: '2023-04-20' },
    { id: 7, name: 'Comprehension', order: 7, createdAt: '2023-04-21' },
  ],
  4: [
    { id: 1, name: 'Ancient History', order: 1, createdAt: '2023-04-15' },
    { id: 2, name: 'Medieval History', order: 2, createdAt: '2023-04-16' },
    { id: 3, name: 'Modern History', order: 3, createdAt: '2023-04-17' },
    { id: 4, name: 'World Wars', order: 4, createdAt: '2023-04-18' },
  ],
  5: [
    { id: 1, name: 'Painting', order: 1, createdAt: '2023-04-15' },
    { id: 2, name: 'Sculpture', order: 2, createdAt: '2023-04-16' },
  ],
};

export const ModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const moduleId = parseInt(id || '0');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const module = mockModules.find(m => m.id === moduleId);
  const [sections, setSections] = useState(mockSections[moduleId as keyof typeof mockSections] || []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState({ id: 0, name: '', order: 0 });
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionOrder, setNewSectionOrder] = useState(1);

  if (!module) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-4">Module not found</h2>
        <Button onClick={() => navigate('/modules')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
        </Button>
      </div>
    );
  }

  // Filter sections based on search term
  const filteredSections = sections.filter(section => 
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSection = () => {
    if (newSectionName.trim() === '') {
      toast({
        title: "Error",
        description: "Section name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newSection = {
      id: sections.length + 1,
      name: newSectionName,
      order: newSectionOrder,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedSections = [...sections, newSection].sort((a, b) => a.order - b.order);
    setSections(updatedSections);
    setNewSectionName('');
    setNewSectionOrder(sections.length + 1);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Section added successfully",
    });
  };

  const handleEditSection = () => {
    if (newSectionName.trim() === '') {
      toast({
        title: "Error",
        description: "Section name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const updatedSections = sections.map(section => 
      section.id === currentSection.id 
        ? { ...section, name: newSectionName, order: newSectionOrder } 
        : section
    ).sort((a, b) => a.order - b.order);

    setSections(updatedSections);
    setNewSectionName('');
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Section updated successfully",
    });
  };

  const handleDeleteSection = () => {
    const updatedSections = sections.filter(section => section.id !== currentSection.id);
    setSections(updatedSections);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Section deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/modules')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{module.name} Module Sections</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search sections..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => {
          setNewSectionOrder(sections.length + 1);
          setIsAddDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add Section
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Section Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <TableRow key={section.id}>
                  <TableCell>{section.order}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-gray-500" />
                      {section.name}
                    </div>
                  </TableCell>
                  <TableCell>{section.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentSection(section);
                          setNewSectionName(section.name);
                          setNewSectionOrder(section.order);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentSection(section);
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
                  No sections found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Section Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="section-name">
                Section Name
              </label>
              <Input
                id="section-name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Enter section name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="section-order">
                Order
              </label>
              <Input
                id="section-order"
                type="number"
                min="1"
                value={newSectionOrder}
                onChange={(e) => setNewSectionOrder(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSection}>
              Add Section
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Section Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-section-name">
                Section Name
              </label>
              <Input
                id="edit-section-name"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Enter section name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="edit-section-order">
                Order
              </label>
              <Input
                id="edit-section-order"
                type="number"
                min="1"
                value={newSectionOrder}
                onChange={(e) => setNewSectionOrder(parseInt(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSection}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Section Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the section "{currentSection.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSection}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
