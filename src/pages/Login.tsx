
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple role-based routing based on email domain
    if (email.endsWith('@admin.com')) {
      navigate('/dashboard');
    } else if (email.endsWith('@teacher.com')) {
      navigate('/teachers');
    } else {
      navigate('/wishes');
    }
  };
  
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Content */}
      <div className="bg-[#536c6d] p-8 flex flex-col justify-center text-white">
        <h1 className="text-4xl font-bold mb-6">
          Gérez les fiches de vœux pédagogiques en toute simplicité.
        </h1>
        <p className="text-xl opacity-90">
          Outil dédié aux départements universitaires.
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 h-12 border-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  className="pl-10 h-12 border-gray-200"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-12 bg-[#536c6d] hover:bg-[#455a5b] text-white font-medium"
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
