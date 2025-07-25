import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validateLogin, isLoggedIn, copyToClipboard, AUTH_CONFIG } from "@/lib/auth";
import { Copy, Key, Flame, Rocket, Lock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState(AUTH_CONFIG.validEmail);
  const [password, setPassword] = useState(AUTH_CONFIG.validPassword);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isLoggedIn()) {
      setLocation("/dashboard");
    }
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (validateLogin(email, password)) {
        setLocation("/dashboard");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await copyToClipboard(text);
      toast({
        description: `${label} copiado para a área de transferência!`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Erro ao copiar para a área de transferência.",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-bg opacity-95"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-bounce-soft"></div>
      <div className="absolute bottom-32 right-12 w-16 h-16 bg-accent/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-secondary/25 rounded-full animate-bounce-soft" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-slide-up">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <Flame className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Projeto Glúteo Gigante™
            </h1>
            <p className="text-white/90 text-lg">
              Sua jornada para o bumbum dos sonhos
            </p>
          </div>
          
          {/* Login Form */}
          <Card className="glass-effect shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary mr-2" />
                Acesse Sua Área VIP
              </h2>
              
              {/* Login Credentials Display */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 mb-6 border border-primary/20">
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Key className="w-5 h-5 text-primary mr-2" />
                  Seus Dados de Acesso:
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Email:</Label>
                      <div className="font-medium text-foreground text-sm">
                        {AUTH_CONFIG.validEmail}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(AUTH_CONFIG.validEmail, "Email")}
                      className="text-primary hover:text-primary/80"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">Senha:</Label>
                      <div className="font-medium text-foreground">{AUTH_CONFIG.validPassword}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(AUTH_CONFIG.validPassword, "Senha")}
                      className="text-primary hover:text-primary/80"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Login Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-foreground font-medium">Senha:</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full animate-pulse-glow"
                  disabled={isSubmitting}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Entrando..." : "Acessar Minha Área VIP"}
                </Button>
              </form>
              
              {/* Error Message */}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
          
          {/* Additional Info */}
          <div className="text-center mt-6 text-white/80">
            <p className="text-sm flex items-center justify-center">
              <Lock className="w-4 h-4 mr-2" />
              Área protegida para membros premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
