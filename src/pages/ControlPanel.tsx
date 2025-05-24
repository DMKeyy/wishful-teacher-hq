
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
      title: "Paramètres sauvegardés",
      description: "Le paramètre de soumission de souhaits a été mis à jour avec succès.",
    });
  };

  const handleResetSettings = () => {
    setWishSubmissionEnabled(true);
    toast({
      title: "Paramètres réinitialisés",
      description: "Le paramètre de soumission de souhaits a été réinitialisé par défaut.",
    });
  };

  return (
    <>
      <Header title="Panneau de contrôle" />
      
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GiftIcon className="h-5 w-5" />
                Contrôle de soumission de souhaits
              </CardTitle>
              <p className="text-sm text-gray-600">
                Activer ou désactiver les soumissions de souhaits dans l'application
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Soumissions de souhaits</h3>
                  <p className="text-sm text-gray-600">
                    Permettre aux utilisateurs de soumettre de nouvelles demandes de souhaits
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
              <CardTitle>Statut du système</CardTitle>
              <p className="text-sm text-gray-600">
                Statut actuel du contrôle de soumission de souhaits
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${wishSubmissionEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm">Soumissions de souhaits</span>
                <span className="text-xs text-gray-500">
                  ({wishSubmissionEnabled ? 'Activé' : 'Désactivé'})
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={handleSaveSettings} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Sauvegarder les paramètres
            </Button>
            <Button variant="outline" onClick={handleResetSettings} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Réinitialiser par défaut
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
