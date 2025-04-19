import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
      {/* Left side - Content with text and background */}
      <div 
        className="relative bg-cover bg-center p-8 flex flex-col justify-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/651df8e0-8e9b-46fb-9acb-02f654b35a5b.png")',
          backgroundColor: 'rgba(83, 108, 109, 0.85)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="relative z-10 text-white">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Gérez les fiches de vœux pédagogiques en toute simplicité.
          </h1>
          <p className="text-xl">
            Outil dédié aux départements universitaires.
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex items-center justify-center p-8 bg-[#e8ecee]">
        <Card className="w-full max-w-md border-0 shadow-none bg-white rounded-3xl">
          <CardContent className="pt-6 px-8 pb-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Connexion</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-12 border-gray-300 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  className="h-12 border-gray-300 rounded-xl"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-12 bg-[#536c6d] hover:bg-[#455a5b] text-white font-medium rounded-xl"
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
