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
    <div className="min-h-screen min-h-[100vh] min-h-[100dvh] relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-bg opacity-95"></div>
      
      {/* Floating geometric shapes - responsive positioning */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-white/20 rounded-full animate-bounce-soft"></div>
      <div className="absolute bottom-24 sm:bottom-32 right-6 sm:right-12 w-10 sm:w-16 h-10 sm:h-16 bg-accent/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/6 sm:left-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-secondary/25 rounded-full animate-bounce-soft" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative z-10 min-h-screen min-h-[100vh] min-h-[100dvh] flex items-center justify-center mobile-container py-6 sm:py-8">
        <div className="w-full max-w-sm sm:max-w-md animate-slide-up">
          {/* Logo/Brand Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-white rounded-full mb-3 sm:mb-4 shadow-lg">
              <Flame className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            </div>
            <h1 className="text-responsive-2xl font-bold text-white mb-2">
              Projeto Glúteo Gigante™
            </h1>
            <p className="text-white/90 text-responsive-base">
              Sua jornada para o bumbum dos sonhos
            </p>
          </div>
          
          {/* Login Form */}
          <Card className="glass-effect shadow-2xl mobile-card">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-responsive-xl font-semibold text-foreground mb-4 sm:mb-6 text-center flex items-center justify-center">
                <Flame className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2" />
                Acesse Sua Área VIP
              </h2>
              
              
              
              {/* Login Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium text-responsive-sm">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 sm:mt-2 mobile-button"
                    placeholder="Digite seu email"
                    autoComplete="email"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-foreground font-medium text-responsive-sm">Senha:</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 sm:mt-2 mobile-button"
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full animate-pulse-glow mobile-button text-responsive-sm"
                  disabled={isSubmitting}
                >
                  <Rocket className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
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
