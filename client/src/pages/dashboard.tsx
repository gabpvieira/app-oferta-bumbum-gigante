import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn, getCurrentUser, logout } from "@/lib/auth";
import { initializeProgress, calculateProgress } from "@/lib/progress";
import ProgressBar from "@/components/ProgressBar";
import ModuleCard from "@/components/ModuleCard";

import { Flame, LogOut, Trophy, Star, Headphones, MessageCircle, Users, Crown, Heart, Lock, UserPlus } from "lucide-react";

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
    <div className="min-h-screen min-h-[100vh] min-h-[100dvh] bg-background">
      {/* Mobile Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50 mobile-scroll">
        <div className="mobile-container py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-primary rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Flame className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground text-responsive-base">Glúteo Gigante™</h1>
                <p className="text-muted-foreground text-xs">Área de Membros</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">Bem-vinda!</p>
                <p className="text-xs text-muted-foreground truncate max-w-[120px]">{displayEmail}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="mobile-button"
              >
                <LogOut className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="sr-only">Sair</span>
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <ProgressBar className="mt-3 sm:mt-4" />
        </div>
      </header>

      <main className="mobile-container py-4 sm:py-6 space-y-6 sm:space-y-8 pb-safe-bottom">
        {/* Welcome Section */}
        <section className="gradient-bg rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-responsive-xl font-bold mb-2 flex items-center flex-wrap">
                Bem-vinda ao Projeto Glúteo Gigante™! 
                <Flame className="w-5 sm:w-6 h-5 sm:h-6 ml-2" />
              </h2>
              <p className="text-white/90 mb-3 sm:mb-4 text-responsive-sm">
                Estamos animados para ajudá-la a alcançar o bumbum dos seus sonhos em apenas 30 dias!
              </p>
              <div className="flex items-center">
                <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-accent mr-2" />
                <span className="font-medium text-responsive-sm">Sua transformação começa agora!</span>
              </div>
            </div>
            {/* Motivational graphic */}
            <div className="hidden sm:block">
              <div className="w-16 sm:w-24 h-16 sm:h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Flame className="w-6 sm:w-8 h-6 sm:h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Section v3.0 - Compact Orange Design */}
        <div className="animate-slide-up">
          <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3 shadow-md">
                    <Trophy className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-orange-900 dark:text-orange-100">Suas Conquistas</h3>
                </div>
                <div className="text-xs sm:text-sm text-orange-600 dark:text-orange-300 font-medium">
                  1/4 Desbloqueadas
                </div>
              </div>
              
              {/* Horizontal Scrollable Achievement Cards */}
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {/* Achievement 1 - Conquistado */}
                <div className="flex-shrink-0 w-32 sm:w-36">
                  <Card className="h-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 border-0 group">
                    <CardContent className="p-3 sm:p-4 text-center relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 rounded-full"></div>
                      
                      <div className="relative z-10">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                          <UserPlus className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mb-1"></div>
                          <h4 className="text-xs sm:text-sm font-bold leading-tight">Primeiro</h4>
                          <p className="text-xs sm:text-sm font-bold leading-tight">Acesso</p>
                          <div className="text-xs text-white/80 mt-1">✓ Conquistado</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievement 2 - Primeira Semana */}
                <div className="flex-shrink-0 w-32 sm:w-36">
                  <Card className="h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 hover:shadow-md transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-3 sm:p-4 text-center relative">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-300 to-orange-400 dark:from-orange-600 dark:to-orange-700 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Lock className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div className="space-y-1">
                        <div className="w-2 h-2 bg-orange-300 rounded-full mx-auto mb-1"></div>
                        <h4 className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 leading-tight">Primeira</h4>
                        <p className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 leading-tight">Semana</p>
                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">7 dias</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievement 3 - 15 Dias */}
                <div className="flex-shrink-0 w-32 sm:w-36">
                  <Card className="h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 hover:shadow-md transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-3 sm:p-4 text-center relative">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-300 to-orange-400 dark:from-orange-600 dark:to-orange-700 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Lock className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div className="space-y-1">
                        <div className="w-2 h-2 bg-orange-300 rounded-full mx-auto mb-1"></div>
                        <h4 className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 leading-tight">Meio</h4>
                        <p className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 leading-tight">Mês</p>
                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">15 dias</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievement 4 - 30 Dias */}
                <div className="flex-shrink-0 w-32 sm:w-36">
                  <Card className="h-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 border border-orange-200 dark:border-orange-700 hover:shadow-md transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-3 sm:p-4 text-center relative">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-300 to-orange-400 dark:from-orange-600 dark:to-orange-700 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                        <Crown className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600 dark:text-orange-300" />
                      </div>
                      <div className="space-y-1">
                        <div className="w-2 h-2 bg-orange-300 rounded-full mx-auto mb-1"></div>
                        <h4 className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 leading-tight">Meta</h4>
                        <p className="text-xs sm:text-sm font-bold text-orange-800 dark:text-orange-200 leading-tight">Final</p>
                        <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">30 dias</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Progress Indicator */}
              <div className="mt-4 sm:mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-orange-700 dark:text-orange-300 font-medium">Progresso das Conquistas</span>
                  <span className="text-xs sm:text-sm text-orange-600 dark:text-orange-400">25%</span>
                </div>
                <div className="w-full bg-orange-200 dark:bg-orange-800/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500" style={{width: '25%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Modules & Bonuses - Compact Orange Design v4.0 */}
        <Card className="animate-slide-up bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 md:p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                🔥 Conteúdo Premium Completo
              </h3>
              <p className="text-orange-700/80 text-sm md:text-base">
                Módulos + Bônus Exclusivos para sua transformação total
              </p>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 min-w-max">
                
                {/* Module 1 - Complete Guide */}
                <div className="w-72 md:w-80 flex-shrink-0">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 bg-white">
                    <CardContent className="p-0">
                      {/* Cover Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                              <Flame className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-lg">Módulo Completo</h4>
                            <p className="text-xs opacity-90">Projeto Glúteo Gigante™</p>
                          </div>
                        </div>
                        {/* Premium Badge */}
                        <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          PREMIUM
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          Guia Completo de Transformação
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          Passo a passo para glúteos grandes e definidos em 30 dias
                        </p>
                        
                        {/* Compact Checklist */}
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-4">
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Cronograma</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Ativação</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Postura</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Monitoramento</div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 text-sm"
                          onClick={() => setLocation("/module-complete")}
                        >
                          Acessar Agora
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Module 2 - Schedule */}
                <div className="w-72 md:w-80 flex-shrink-0">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 bg-white">
                    <CardContent className="p-0">
                      {/* Cover Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                              <i className="fas fa-calendar-alt text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-lg">Cronograma</h4>
                            <p className="text-xs opacity-90">30 Dias Estruturados</p>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          MÓDULO
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          Cronograma de Treinos
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          Plano detalhado para seguir diariamente por 30 dias
                        </p>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-4">
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Por semana</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Intensificação</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Execução</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Progressão</div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 text-sm"
                          onClick={() => setLocation("/module-schedule")}
                        >
                          Acessar Agora
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Module 3 - Diet */}
                <div className="w-72 md:w-80 flex-shrink-0">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 bg-white">
                    <CardContent className="p-0">
                      {/* Cover Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-red-400 via-pink-500 to-rose-500 relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                              <i className="fas fa-utensils text-2xl"></i>
                            </div>
                            <h4 className="font-bold text-lg">Mini-Dieta</h4>
                            <p className="text-xs opacity-90">Nutrição Estratégica</p>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-pink-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          BÔNUS
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          Mini-Dieta Potencializadora
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          Receitas e dicas que potencializam seus resultados
                        </p>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-4">
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>30 receitas</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Nutrição</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Dicas práticas</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Rotina</div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2 text-sm"
                          onClick={() => setLocation("/module-diet")}
                        >
                          Acessar Agora
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bonus 1 - Posture */}
                <div className="w-72 md:w-80 flex-shrink-0">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 bg-white">
                    <CardContent className="p-0">
                      {/* Cover Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                              <Crown className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-lg">Postura & Estilo</h4>
                            <p className="text-xs opacity-90">Elegância Total</p>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          BÔNUS
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          Guia de Postura e Estilo
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          Como realçar seus glúteos com elegância
                        </p>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-4">
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Postura</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Roupas</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Fotos</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Styling</div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 text-sm"
                          onClick={() => setLocation("/bonus-posture")}
                        >
                          Acessar Agora
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bonus 2 - Body Secrets */}
                <div className="w-72 md:w-80 flex-shrink-0">
                  <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-orange-200 hover:border-orange-400 bg-white">
                    <CardContent className="p-0">
                      {/* Cover Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                              <Heart className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-lg">Autoestima</h4>
                            <p className="text-xs opacity-90">Confiança Total</p>
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          BÔNUS
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          Segredos Para Valorizar Seu Corpo
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          Dicas para se sentir linda e confiante todos os dias
                        </p>
                        
                        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-4">
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Autoimagem</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Elegância</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Afirmações</div>
                          <div className="flex items-center"><span className="text-orange-500 mr-1">✓</span>Ritual</div>
                        </div>
                        
                        <Button 
                          className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold py-2 text-sm"
                          onClick={() => setLocation("/bonus-body")}
                        >
                          Acessar Agora
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="mt-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-xs text-orange-700">Módulos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <div className="text-xs text-red-700">Bônus</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">30</div>
                  <div className="text-xs text-pink-700">Dias</div>
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>

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
        <Card className="animate-slide-up glass-effect">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-responsive-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
              <Headphones className="w-5 sm:w-6 h-5 sm:h-6 text-primary mr-2 sm:mr-3" />
              Suporte & Comunidade
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <a 
                href="https://wa.me/5584999389121?text=Olá! Preciso de ajuda com o Projeto Glúteo Gigante"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer touch-target">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center">
                      <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg group-hover:shadow-xl transition-shadow">
                        <MessageCircle className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-responsive-sm mb-1">Suporte WhatsApp</h4>
                        <p className="text-muted-foreground text-xs sm:text-sm mb-2">Tire suas dúvidas diretamente conosco</p>
                        <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-medium bg-white dark:bg-green-900/30 px-2 py-1 rounded-lg inline-block">
                          (84) 99938-9121
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
              
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 touch-target">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <Users className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-responsive-sm mb-1">Comunidade VIP</h4>
                      <p className="text-muted-foreground text-xs sm:text-sm mb-2">Conecte-se com outras mulheres</p>
                      <span className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium bg-white dark:bg-blue-900/30 px-2 py-1 rounded-lg inline-block">
                        Em breve
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="glass-effect animate-slide-up overflow-hidden">
          <div className="bg-gradient-to-r from-secondary/10 to-accent/10 p-4 sm:p-6">
            <h3 className="text-responsive-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center justify-center">
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-accent mr-2 sm:mr-3" />
              Resultados de Nossos Membros
            </h3>
            
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <Card className="glass-effect hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <span className="text-white font-bold text-responsive-sm">M</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground text-responsive-sm mb-1">Maria S.</h5>
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    "Em apenas 2 semanas já notei diferença! Os exercícios são simples mas muito eficazes. 
                    Recomendo para todas as amigas!"
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                      <span className="text-white font-bold text-responsive-sm">A</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-foreground text-responsive-sm mb-1">Ana L.</h5>
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    "O método é incrível! Consegui resultados que nunca imaginei em casa. 
                    Minha autoestima melhorou muito!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
