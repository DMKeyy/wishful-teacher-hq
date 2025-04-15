
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  FolderIcon,
  FolderOpen 
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

export const ModulesList = () => {
  const { toast } = useToast();
  const [modules, setModules] = useState(mockModules);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState({ id: 0, name: '' });
  const [newModuleName, setNewModuleName] = useState('');

  // Filter modules based on search term
  const filteredModules = modules.filter(module => 
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddModule = () => {
    if (newModuleName.trim() === '') {
      toast({
        title: "Error",
        description: "Module name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newModule = {
      id: modules.length + 1,
      name: newModuleName,
      sections: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setModules([...modules, newModule]);
    setNewModuleName('');
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Module added successfully",
    });
  };

  const handleEditModule = () => {
    if (newModuleName.trim() === '') {
      toast({
        title: "Error",
        description: "Module name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const updatedModules = modules.map(module => 
      module.id === currentModule.id ? { ...module, name: newModuleName } : module
    );

    setModules(updatedModules);
    setNewModuleName('');
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Module updated successfully",
    });
  };

  const handleDeleteModule = () => {
    const updatedModules = modules.filter(module => module.id !== currentModule.id);
    setModules(updatedModules);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Module deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search modules..." 
              className="pl-10 w-full" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Module
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Module Name</TableHead>
              <TableHead>Sections</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredModules.length > 0 ? (
              filteredModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FolderIcon className="mr-2 h-5 w-5 text-blue-500" />
                      {module.name}
                    </div>
                  </TableCell>
                  <TableCell>{module.sections}</TableCell>
                  <TableCell>{module.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        asChild
                      >
                        <Link to={`/modules/${module.id}`}>
                          <FolderOpen className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentModule(module);
                          setNewModuleName(module.name);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentModule(module);
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
                  No modules found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Module Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium mb-2" htmlFor="module-name">
              Module Name
            </label>
            <Input
              id="module-name"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              placeholder="Enter module name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddModule}>
              Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Module Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <label className="block text-sm font-medium mb-2" htmlFor="edit-module-name">
              Module Name
            </label>
            <Input
              id="edit-module-name"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              placeholder="Enter module name"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditModule}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Module Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Module</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete the module "{currentModule.name}"?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteModule}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
