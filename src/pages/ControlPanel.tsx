
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Settings2, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ControlPanel = () => {
  const [formSubmissionEnabled, setFormSubmissionEnabled] = useState(true);
  const [wishSubmissionEnabled, setWishSubmissionEnabled] = useState(true);
  const [teacherRegistrationEnabled, setTeacherRegistrationEnabled] = useState(true);
  const [courseCreationEnabled, setCourseCreationEnabled] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Here you would typically save the settings to a backend or local storage
    toast({
      title: "Settings Saved",
      description: "Form submission settings have been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    setFormSubmissionEnabled(true);
    setWishSubmissionEnabled(true);
    setTeacherRegistrationEnabled(true);
    setCourseCreationEnabled(true);
    toast({
      title: "Settings Reset",
      description: "All form submission settings have been reset to default.",
    });
  };

  return (
    <>
      <Header title="Control Panel" />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                Form Submission Controls
              </CardTitle>
              <p className="text-sm text-gray-600">
                Enable or disable form submissions across the application
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">General Form Submissions</h3>
                  <p className="text-sm text-gray-600">
                    Master control for all form submissions in the application
                  </p>
                </div>
                <Switch
                  checked={formSubmissionEnabled}
                  onCheckedChange={setFormSubmissionEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Wish Submissions</h3>
                  <p className="text-sm text-gray-600">
                    Allow users to submit new wish requests
                  </p>
                </div>
                <Switch
                  checked={wishSubmissionEnabled && formSubmissionEnabled}
                  onCheckedChange={setWishSubmissionEnabled}
                  disabled={!formSubmissionEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Teacher Registration</h3>
                  <p className="text-sm text-gray-600">
                    Allow registration of new teachers
                  </p>
                </div>
                <Switch
                  checked={teacherRegistrationEnabled && formSubmissionEnabled}
                  onCheckedChange={setTeacherRegistrationEnabled}
                  disabled={!formSubmissionEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Course Creation</h3>
                  <p className="text-sm text-gray-600">
                    Allow creation of new courses
                  </p>
                </div>
                <Switch
                  checked={courseCreationEnabled && formSubmissionEnabled}
                  onCheckedChange={setCourseCreationEnabled}
                  disabled={!formSubmissionEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <p className="text-sm text-gray-600">
                Current status of form submission controls
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${formSubmissionEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">General Forms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${wishSubmissionEnabled && formSubmissionEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">Wish Submissions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${teacherRegistrationEnabled && formSubmissionEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">Teacher Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${courseCreationEnabled && formSubmissionEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">Course Creation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleSaveSettings} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleResetSettings} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset to Default
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
