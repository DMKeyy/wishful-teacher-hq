
import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { GiftIcon, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ControlPanel = () => {
  const [wishSubmissionEnabled, setWishSubmissionEnabled] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Here you would typically save the settings to a backend or local storage
    toast({
      title: "Settings Saved",
      description: "Wish submission setting has been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    setWishSubmissionEnabled(true);
    toast({
      title: "Settings Reset",
      description: "Wish submission setting has been reset to default.",
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
                <GiftIcon className="h-5 w-5" />
                Wish Submission Control
              </CardTitle>
              <p className="text-sm text-gray-600">
                Enable or disable wish submissions across the application
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Wish Submissions</h3>
                  <p className="text-sm text-gray-600">
                    Allow users to submit new wish requests
                  </p>
                </div>
                <Switch
                  checked={wishSubmissionEnabled}
                  onCheckedChange={setWishSubmissionEnabled}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <p className="text-sm text-gray-600">
                Current status of wish submission control
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${wishSubmissionEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm">Wish Submissions</span>
                <span className="text-xs text-gray-500">
                  ({wishSubmissionEnabled ? 'Enabled' : 'Disabled'})
                </span>
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
