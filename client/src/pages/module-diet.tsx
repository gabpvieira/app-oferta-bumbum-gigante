import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn } from "@/lib/auth";
import { ArrowLeft, Utensils, Target, Clock, Heart, Star, Apple, Coffee, Salad, Cookie } from "lucide-react";

const principles = [
  {
    title: "Proteína Todo Dia",
    description: "ovos, frango, iogurte, leguminosas",
    icon: "💪"
  },
  {
    title: "Carboidrato de Qualidade", 
    description: "batata-doce, arroz, mandioca",
    icon: "🍠"
  },
  {
    title: "Gordura Boa = Bumbum Bonito",
    description: "azeite, abacate, castanhas",
    icon: "🥑"
  },
  {
    title: "Fibra e Água",
    description: "vegetais e 2L de água por dia",
    icon: "💧"
  },
  {
    title: "Nada de Dieta Louca",
    description: "foco em energia, saciedade e constância",
    icon: "✅"
  }
];

const mealSchedule = [
  {
    time: "Café da manhã",
    objective: "Ativar metabolismo e energia",
    foods: "Proteína + carbo bom + fruta"
  },
  {
    time: "Lanche",
    objective: "Sustentar energia e evitar fome", 
    foods: "Shake ou fruta + castanhas ou iogurte"
  },
  {
    time: "Almoço",
    objective: "Construção muscular",
    foods: "Prato com proteína + carbo + legumes"
  },
  {
    time: "Lanche tarde",
    objective: "Preparo para treino",
    foods: "Banana com aveia ou pão integral com ovo"
  },
  {
    time: "Jantar",
    objective: "Recuperação e regeneração",
    foods: "Vegetais + proteína + gordura boa"
  },
  {
    time: "Ceia (opcional)",
    objective: "Evitar catabolismo noturno",
    foods: "Ovo cozido, chá com colágeno ou iogurte"
  }
];

const breakfastRecipes = [
  {
    name: "Omelete da Bumbum Queen",
    ingredients: "2 ovos, tomate picado, cebola, orégano",
    instructions: "Misture tudo e frite sem óleo em frigideira antiaderente."
  },
  {
    name: "Panqueca Proteica de Banana", 
    ingredients: "1 banana + 1 ovo + 1 colher aveia",
    instructions: "Misture e frite. Sirva com canela."
  },
  {
    name: "Mingau Turbo",
    ingredients: "Aveia + leite vegetal + chia + canela + 1 scoop de whey",
    instructions: "Misture tudo e aqueça."
  },
  {
    name: "Iogurte Proteico com Frutas",
    ingredients: "Iogurte natural + morango + 1 colher de granola sem açúcar",
    instructions: "Misture e sirva."
  },
  {
    name: "Tapioca da Hipertrofia",
    ingredients: "2 colheres de goma de tapioca + recheio de ovo mexido",
    instructions: "Faça a tapioca e recheie com ovo mexido e tomate."
  }
];

const lunchDinnerRecipes = [
  {
    name: "Bowl Glúteo Gigante",
    ingredients: "Arroz integral + frango desfiado + cenoura ralada + abobrinha grelhada + couve",
    instructions: "Monte o bowl com todos os ingredientes."
  },
  {
    name: "Macarrão Integral com Frango",
    ingredients: "Macarrão integral + frango grelhado + azeite e ervas",
    instructions: "Cozinhe o macarrão e misture com frango temperado."
  },
  {
    name: "Arroz com Lentilha + Ovo",
    ingredients: "½ xícara de arroz integral + ½ de lentilha + 2 ovos cozidos",
    instructions: "Cozinhe arroz e lentilha separadamente, sirva com ovos."
  },
  {
    name: "Tilápia Grelhada com Batata-Doce",
    ingredients: "Tilápia + ½ batata-doce assada + salada verde",
    instructions: "Grelhe a tilápia, asse a batata-doce e monte a salada."
  },
  {
    name: "Estrogonofe Fit",
    ingredients: "Frango + iogurte natural + tomate + cebola + cúrcuma",
    instructions: "Refogue o frango com os temperos e adicione iogurte."
  }
];

const snackRecipes = [
  {
    name: "Banana com Canela",
    ingredients: "1 banana + 1 colher de aveia + pitada de canela",
    instructions: "Corte a banana, polvilhe aveia e canela."
  },
  {
    name: "Sanduíche de Atum",
    ingredients: "Pão integral + atum + alface e azeite", 
    instructions: "Monte o sanduíche com os ingredientes."
  },
  {
    name: "Shake Pós-Treino",
    ingredients: "Banana + leite + cacau + aveia + gelo",
    instructions: "Bata tudo no liquidificador."
  },
  {
    name: "Maçã com Pasta de Amendoim",
    ingredients: "1 maçã fatiada + 1 colher de pasta de amendoim natural",
    instructions: "Fatieq a maçã e sirva com pasta de amendoim."
  },
  {
    name: "Mix Caseiro de Energia",
    ingredients: "Castanhas, amendoim, semente de abóbora, coco ralado",
    instructions: "Misture todos os ingredientes e armazene."
  }
];

const practicalTips = [
  {
    title: "Hidratação = Crescimento",
    content: "Beba no mínimo 2L de água por dia. Adicione 1 copo logo ao acordar. Beba água durante o treino."
  },
  {
    title: "Proteína em Todas as Refeições",
    content: "Mantém o anabolismo. Fontes baratas: ovo, sardinha, frango, iogurte natural, lentilha."
  },
  {
    title: "Evite Carboidratos Vazios",
    content: "Fuja de: bolacha recheada, pão branco, refrigerantes. Troque por: arroz integral, batata-doce, banana."
  },
  {
    title: "Coma Antes e Depois do Treino",
    content: "Antes: energia (banana, pão integral, aveia). Depois: proteína + carboidrato (ovo + fruta)."
  },
  {
    title: "Planeje o Que Vai Comer",
    content: "Não espere a fome bater. Tenha lanches prontos. Deixe potinhos preparados na geladeira."
  },
  {
    title: "Mastigue Bem",
    content: "Mastigar bem melhora a digestão e evita estufamento. Evita sensação de barriga inchada."
  }
];

export default function ModuleDiet() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("principles");

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }
  }, [setLocation]);

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const tabs = [
    { id: "principles", label: "Princípios", icon: Target },
    { id: "schedule", label: "Rotina", icon: Clock },
    { id: "breakfast", label: "Café", icon: Coffee },
    { id: "lunch", label: "Almoço", icon: Salad },
    { id: "snacks", label: "Lanches", icon: Cookie },
    { id: "tips", label: "Dicas", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="font-bold text-foreground">Mini-Dieta Bônus</h1>
              <p className="text-muted-foreground text-sm">Nutrição Estratégica</p>
            </div>
            <div className="w-9" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Introduction */}
        <Card className="gradient-bg text-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Utensils className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Mini-Dieta Bônus</h2>
                <p className="text-white/90">Receitas e Dicas Que Potencializam Seus Resultados</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              A nutrição é o combustível dos seus resultados. Sem uma alimentação que nutre e constrói massa muscular, seus treinos não geram o impacto que você merece.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Apple className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">30 Receitas</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Heart className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Simples</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Target className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Focadas</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Star className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Resultados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center"
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Principles Tab */}
        {activeTab === "principles" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-6 h-6 text-primary mr-3" />
                Princípios da Mini-Dieta
              </h3>
              <p className="text-muted-foreground mb-6">
                Os 5 pilares da alimentação no Projeto Glúteo Gigante™:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {principles.map((principle, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{principle.icon}</span>
                        <h4 className="font-semibold text-foreground">{principle.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">{principle.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-6 h-6 text-primary mr-3" />
                Como Organizar Sua Rotina Alimentar
              </h3>
              <div className="space-y-4">
                {mealSchedule.map((meal, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-foreground">{meal.time}</h4>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">{meal.objective}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{meal.foods}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Breakfast Tab */}
        {activeTab === "breakfast" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Coffee className="w-6 h-6 text-primary mr-3" />
                Receitas - Café da Manhã (10)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {breakfastRecipes.map((recipe, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{index + 1}. {recipe.name}</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Ingredientes:</p>
                          <p className="text-sm text-foreground">{recipe.ingredients}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Modo:</p>
                          <p className="text-sm text-foreground">{recipe.instructions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lunch Tab */}
        {activeTab === "lunch" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Salad className="w-6 h-6 text-primary mr-3" />
                Receitas - Almoço e Jantar (10)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {lunchDinnerRecipes.map((recipe, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{index + 11}. {recipe.name}</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Ingredientes:</p>
                          <p className="text-sm text-foreground">{recipe.ingredients}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Modo:</p>
                          <p className="text-sm text-foreground">{recipe.instructions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Snacks Tab */}
        {activeTab === "snacks" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Cookie className="w-6 h-6 text-primary mr-3" />
                Receitas - Lanches e Pré-Treino (10)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {snackRecipes.map((recipe, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">{index + 21}. {recipe.name}</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Ingredientes:</p>
                          <p className="text-sm text-foreground">{recipe.ingredients}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Modo:</p>
                          <p className="text-sm text-foreground">{recipe.instructions}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Tab */}
        {activeTab === "tips" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="w-6 h-6 text-primary mr-3" />
                Dicas Práticas Que Potencializam os Resultados
              </h3>
              <div className="space-y-4">
                {practicalTips.map((tip, index) => (
                  <Card key={index} className="border-l-4 border-l-accent">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center">
                        <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs mr-3">
                          {index + 1}
                        </span>
                        {tip.title}
                      </h4>
                      <p className="text-muted-foreground">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Final Summary */}
        <Card className="bg-gradient-to-r from-secondary/10 to-primary/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Resumo Final do Módulo
            </h3>
            <p className="text-muted-foreground mb-4">
              Você acabou de acessar um plano alimentar 100% focado em reduzir retenção, acelerar a construção dos glúteos, aumentar disposição e manter constância sem sacrifício.
            </p>
            <div className="bg-primary text-white rounded-lg p-4 inline-block">
              <h4 className="font-semibold mb-2">Missão Diária:</h4>
              <ul className="text-sm space-y-1 text-left">
                <li>✓ Coma proteína em todas as refeições</li>
                <li>✓ Beba 2L de água</li>
                <li>✓ Tenha lanches saudáveis por perto</li>
                <li>✓ Prepare as receitas com foco</li>
                <li>✓ Fotografe seus pratos e celebre sua evolução!</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}