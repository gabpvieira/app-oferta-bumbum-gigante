import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn, getCurrentUser, logout } from "@/lib/auth";
import { initializeProgress, calculateProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";
import ModuleCard from "@/components/ModuleCard";
import AchievementCard from "@/components/AchievementCard";
import { Flame, LogOut, Trophy, Star, Headphones, MessageCircle, Users } from "lucide-react";

const moduleData = [
  {
    id: 1,
    title: "Módulo 1: Ativação Muscular Diária",
    description: "A transformação começa com a ativação dos glúteos",
    duration: "15 minutos por dia",
    icon: "fa-dumbbell",
    iconBg: "bg-primary",
    lessons: [
      {
        id: "1-1",
        number: 1,
        title: "Exercícios de Ativação Básica",
        description: "Aprenda os movimentos fundamentais para acordar seus glúteos. Começamos com exercícios simples que preparam seus músculos para treinos mais intensos.",
        example: {
          title: "Exemplo Prático",
          content: "Agachamento na Cadeira: Use uma cadeira como apoio. Desça lentamente até quase tocar o assento, mantenha por 2 segundos e suba. Sinta a contração no glúteo durante todo o movimento."
        },
        tip: {
          title: "Dica Importante",
          content: "Mantenha a postura correta: coluna reta, ombros para trás e core contraído. A qualidade do movimento é mais importante que a quantidade.",
          type: "important" as const
        }
      },
      {
        id: "1-2",
        number: 2,
        title: "Ponte Glútea Perfeita",
        description: "Domine o exercício mais eficaz para ativação dos glúteos. A ponte é a base de todo desenvolvimento posterior.",
        example: {
          title: "Técnica Correta",
          content: "Deite de costas, joelhos dobrados, pés apoiados no chão. Contraia os glúteos e eleve o quadril formando uma linha reta do joelho ao ombro. Segure por 3 segundos."
        },
        tip: {
          title: "Evite Este Erro",
          content: "Não arqueie demais as costas. O movimento deve partir dos glúteos, não da lombar. Mantenha o core ativo durante todo o exercício.",
          type: "warning" as const
        }
      },
      {
        id: "1-3",
        number: 3,
        title: "Caminhada Lateral Ativadora",
        description: "Ative os músculos laterais dos glúteos com este movimento simples mas poderoso. Perfeito para moldar e definir.",
        example: {
          title: "Como Fazer",
          content: "Em pé, pés paralelos, dê um passo largo para o lado mantendo o joelho alinhado com o pé. Volte à posição inicial. Faça 10 repetições para cada lado."
        },
        tip: {
          title: "Benefício Extra",
          content: "Este exercício também fortalece os músculos estabilizadores, melhorando seu equilíbrio e postura no dia a dia.",
          type: "extra" as const
        }
      }
    ],
    summary: {
      content: "Parabéns! Você aprendeu os três exercícios fundamentais para ativar seus glúteos. Estes movimentos são a base de toda sua transformação.",
      nextSteps: "Pratique estes exercícios por 3 dias consecutivos antes de avançar para o Módulo 2. Seu corpo precisa se adaptar aos novos estímulos."
    }
  },
  {
    id: 2,
    title: "Módulo 2: Mini-Dieta Potencializadora",
    description: "Alimentação estratégica para resultados acelerados",
    duration: "Nutrição focada em resultados",
    icon: "fa-utensils",
    iconBg: "bg-secondary",
    lessons: [
      {
        id: "2-1",
        number: 1,
        title: "Café da Manhã Energizante",
        description: "Comece o dia com energia e nutrientes que apoiam o desenvolvimento muscular.",
        example: {
          title: "Cardápio Ideal",
          content: "2 ovos mexidos + 1 fatia de pão integral + 1 banana com 1 colher de sopa de pasta de amendoim + água com limão."
        },
        tip: {
          title: "Dica Nutricional",
          content: "As proteínas do ovo e a gordura boa do amendoim fornecem energia sustentada para seus treinos.",
          type: "important" as const
        }
      },
      {
        id: "2-2",
        number: 2,
        title: "Almoço Nutritivo",
        description: "Combine proteínas, carboidratos complexos e vegetais para otimizar a recuperação muscular.",
        example: {
          title: "Prato Balanceado",
          content: "150g de proteína (frango, peixe ou leguminosas) + salada colorida com azeite + 1 porção de carboidrato complexo (arroz integral, batata doce)."
        },
        tip: {
          title: "Hidratação",
          content: "Beba pelo menos 2 litros de água por dia. A hidratação adequada melhora a recuperação muscular e potencializa os resultados.",
          type: "extra" as const
        }
      },
      {
        id: "2-3",
        number: 3,
        title: "Jantar Leve",
        description: "Termine o dia com uma refeição leve que promove recuperação durante o sono.",
        example: {
          title: "Sugestão de Jantar",
          content: "Sopa de legumes com proteína + salada verde com grãos + chá relaxante antes de dormir."
        },
        tip: {
          title: "Sono Reparador",
          content: "Um jantar leve melhora a qualidade do sono, fundamental para o crescimento muscular.",
          type: "important" as const
        }
      }
    ],
    summary: {
      content: "Você aprendeu como potencializar seus resultados com uma alimentação inteligente, sem dietas restritivas.",
      nextSteps: "Implemente gradualmente essas mudanças alimentares. Pequenas mudanças consistentes geram grandes resultados."
    }
  },
  {
    id: 3,
    title: "Módulo 3: Segredos de Postura e Estilo",
    description: "Valorize sua silhueta mesmo durante a transformação",
    duration: "Confiança e autoestima",
    icon: "fa-star",
    iconBg: "bg-accent",
    lessons: [
      {
        id: "3-1",
        number: 1,
        title: "Postura que Transforma",
        description: "Uma boa postura pode fazer você parecer mais confiante e realçar suas curvas instantaneamente.",
        example: {
          title: "Técnica dos 3 Pontos",
          content: "1. Ombros para trás e relaxados, 2. Core levemente contraído, 3. Quadril levemente projetado."
        },
        tip: {
          title: "Pratica Diária",
          content: "Pratique essa postura várias vezes ao dia até se tornar natural. Use lembretes no celular.",
          type: "important" as const
        }
      },
      {
        id: "3-2",
        number: 2,
        title: "Roupas Estratégicas",
        description: "Escolhas inteligentes no guarda-roupa podem realçar seus pontos fortes.",
        example: {
          title: "Dicas de Styling",
          content: "Cintura marcada valoriza a silhueta, calças de cintura alta alongam as pernas, cores escuras emagrecem, cores claras destacam."
        },
        tip: {
          title: "Autoconfiança",
          content: "Vista-se para si mesma. Quando você se sente bem com suas roupas, sua confiança transparecer naturalmente.",
          type: "extra" as const
        }
      },
      {
        id: "3-3",
        number: 3,
        title: "Mindset de Sucesso",
        description: "Desenvolva a mentalidade necessária para manter a motivação durante toda a jornada.",
        example: {
          title: "Afirmações Positivas",
          content: "Eu estou me transformando todos os dias, Meu corpo responde positivamente aos cuidados que tenho com ele, Eu mereço me sentir linda e confiante."
        },
        tip: {
          title: "Celebre Pequenas Vitórias",
          content: "Comemore cada progresso, por menor que seja. Cada dia de treino é uma vitória!",
          type: "important" as const
        }
      }
    ],
    summary: {
      content: "Você descobriu como valorizar seu corpo e desenvolver uma mentalidade positiva para sua transformação.",
      nextSteps: "Continue aplicando essas técnicas diariamente. A transformação física e mental andam juntas."
    }
  }
];

const achievements = [
  {
    id: "first-access",
    title: "Primeiro Acesso",
    description: "Em breve...",
    icon: "user-plus",
    unlocked: true
  },
  {
    id: "first-week",
    title: "Primeira Semana",
    description: "Em breve...",
    icon: "dumbbell",
    unlocked: false
  },
  {
    id: "half-month",
    title: "15 Dias",
    description: "Meta de meio mês",
    icon: "medal",
    unlocked: false
  },
  {
    id: "transformation",
    title: "30 Dias",
    description: "Transformação completa",
    icon: "crown",
    unlocked: false
  }
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(calculateProgress());
  const userEmail = getCurrentUser();

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }
    
    initializeProgress();
    setProgress(calculateProgress());
  }, [setLocation]);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleProgressUpdate = () => {
    setProgress(calculateProgress());
  };

  const displayEmail = userEmail ? userEmail.split('@')[0] + '@projeto...' : '';

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground text-lg">Glúteo Gigante™</h1>
                <p className="text-muted-foreground text-xs">Área de Membros</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Bem-vinda!</p>
                <p className="text-xs text-muted-foreground">{displayEmail}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <ProgressBar className="mt-4" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <section className="gradient-bg rounded-2xl p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 flex items-center">
                Bem-vinda ao Projeto Glúteo Gigante™! 
                <Flame className="w-6 h-6 ml-2" />
              </h2>
              <p className="text-white/90 mb-4">
                Estamos animados para ajudá-la a alcançar o bumbum dos seus sonhos em apenas 30 dias!
              </p>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-accent mr-2" />
                <span className="font-medium">Sua transformação começa agora!</span>
              </div>
            </div>
            {/* Motivational graphic */}
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Section */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Trophy className="w-6 h-6 text-accent mr-3" />
              Suas Conquistas
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Modules */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
              <Flame className="w-6 h-6 text-primary mr-3" />
              Método de Ativação Muscular
            </h3>
            <p className="text-muted-foreground mb-6">
              Aprenda a ativar e desenvolver seus glúteos rapidamente em apenas 15 minutos por dia!
            </p>
            
            <div className="space-y-4">
              {moduleData.map((module) => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  onProgressUpdate={handleProgressUpdate}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bonus Section */}
        <section className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-6 animate-slide-up">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center">
              <Star className="w-6 h-6 text-accent mr-3" />
              Seus Bônus Exclusivos
            </h3>
            <p className="text-muted-foreground">
              Além do conteúdo principal, você tem acesso a estes materiais de valor inestimável
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bonus 1 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-calendar-check text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cronograma 30 Dias</h4>
                    <p className="text-muted-foreground text-sm">Planejamento dia a dia</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Um cronograma detalhado que organiza todos os exercícios e dicas em uma sequência 
                  otimizada para máximos resultados.
                </p>
                <div className="bg-accent/10 rounded-lg p-3">
                  <h6 className="font-medium text-foreground mb-2">📋 Inclui:</h6>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Rotina diária de exercícios</li>
                    <li>• Lembretes nutricionais</li>
                    <li>• Marcos de progresso</li>
                    <li>• Dicas motivacionais</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            {/* Bonus 2 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-chart-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Planilha de Medidas</h4>
                    <p className="text-muted-foreground text-sm">Acompanhe sua evolução</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Template completo para registrar suas medidas e fotos de progresso, 
                  mantendo você motivada ao ver os resultados.
                </p>
                <div className="bg-secondary/10 rounded-lg p-3">
                  <h6 className="font-medium text-foreground mb-2">📊 Recursos:</h6>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Tabela de medidas corporais</li>
                    <li>• Registro fotográfico</li>
                    <li>• Gráficos de evolução</li>
                    <li>• Metas semanais</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Progress Stats */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
              <i className="fas fa-chart-bar text-primary mr-3"></i>
              Suas Estatísticas
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-primary/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">{progress.completedModules}</div>
                <div className="text-muted-foreground text-sm">Módulos Concluídos</div>
              </div>
              
              <div className="text-center bg-secondary/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-secondary">{progress.completedLessons}</div>
                <div className="text-muted-foreground text-sm">Lições Finalizadas</div>
              </div>
              
              <div className="text-center bg-accent/5 rounded-xl p-4">
                <div className="text-2xl font-bold text-accent">1</div>
                <div className="text-muted-foreground text-sm">Dia da Jornada</div>
              </div>
              
              <div className="text-center bg-muted rounded-xl p-4">
                <div className="text-2xl font-bold text-foreground">{progress.progressPercentage}%</div>
                <div className="text-muted-foreground text-sm">Progresso Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <Headphones className="w-6 h-6 text-primary mr-3" />
              Suporte & Comunidade
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-green-50 border-green-200 hover:bg-green-100 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Suporte WhatsApp</h4>
                      <p className="text-muted-foreground text-sm">Tire suas dúvidas diretamente conosco</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Comunidade VIP</h4>
                      <p className="text-muted-foreground text-sm">Conecte-se com outras mulheres</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <section className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl p-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center justify-center">
            <Star className="w-6 h-6 text-accent mr-3" />
            Resultados de Nossos Membros
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">Maria S.</h5>
                    <div className="flex text-accent text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "Em apenas 2 semanas já notei diferença! Os exercícios são simples mas muito eficazes. 
                  Recomendo para todas as amigas!"
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">A</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">Ana L.</h5>
                    <div className="flex text-accent text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "O método é incrível! Consegui resultados que nunca imaginei em casa. 
                  Minha autoestima melhorou muito!"
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
