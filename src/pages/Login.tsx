
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex bg-[#536c6d]">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center px-12 text-white">
        <h1 className="text-5xl font-light mb-6 leading-tight animate-fade-in">
          Gérez les fiches de vœux pédagogiques en toute simplicité.
        </h1>
        <p className="text-xl text-gray-100 animate-fade-in delay-100">
          Outil dédié aux départements universitaires.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-[#eef1f5]">
        <Card className="w-[400px] border-0 shadow-lg hover-lift animate-fade-in delay-200">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Connexion
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-12 text-base bg-white border border-gray-200"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mot de passe"
                  className="h-12 text-base bg-white border border-gray-200"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium bg-[#536c6d] hover:bg-[#465a5b] transition-colors"
              >
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
