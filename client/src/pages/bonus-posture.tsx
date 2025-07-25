import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn } from "@/lib/auth";
import { saveProgress, loadProgress } from "@/lib/checklist-storage";
import { ArrowLeft, Crown, Target, CheckCircle, Camera, Sparkles, Heart, Star, Eye } from "lucide-react";

const postureSteps = [
  {
    title: "Cabeça erguida",
    description: "como se uma linha puxasse o topo da sua cabeça pro alto"
  },
  {
    title: "Ombros pra trás e levemente pra baixo",
    description: "evita que a barriga projete pra frente"
  },
  {
    title: "Barriga contraída suavemente",
    description: "ativa o core, modela cintura"
  },
  {
    title: "Quadril levemente projetado para trás",
    description: "efeito 'bumbum empinado'"
  },
  {
    title: "Peso do corpo nos calcanhares",
    description: "base firme, postura imponente"
  }
];

const clothingTips = [
  {
    category: "Legging de Cintura Alta",
    tips: [
      "Ajusta a cintura, comprime o abdômen e projeta os glúteos",
      "Opte por tecidos firmes, sem transparência",
      "Dê preferência para cores lisas ou com listras verticais"
    ]
  },
  {
    category: "Shorts Justo de Algodão ou Jeans Stretch",
    tips: [
      "Realça as curvas e permite movimento",
      "Borda da barra logo abaixo do bumbum deixa ele mais redondo"
    ]
  },
  {
    category: "Saias e Vestidos Justos na Parte de Trás",
    tips: [
      "Modelos tubinho, lápis ou envelope são ideais",
      "Marcam a cintura e deixam os glúteos desenhados"
    ]
  },
  {
    category: "Calça Jeans Levanta Bumbum",
    tips: [
      "Bolsos traseiros bem posicionados (mais centralizados e pequenos)",
      "Cintura alta + modelagem skinny = combo perfeito"
    ]
  },
  {
    category: "Blusas Curtas ou Croppeds",
    tips: [
      "Mostram mais a cintura e valorizam a silhueta",
      "Ao mostrar menos em cima, você dá destaque natural pro bumbum"
    ]
  }
];

const photoTips = [
  "Fique de lado e olhe por cima do ombro",
  "Perna de trás estendida e ponta do pé no chão",
  "Braço solto e leve curvatura da cintura",
  "Luz natural vinda de frente ou lateral",
  "Use ângulos de baixo para cima (ligeiramente)",
  "Contraia levemente o bumbum no clique"
];

const styleRules = [
  {
    item: "Calça Jeans",
    sim: "Cintura alta, bolsos pequenos",
    nao: "Cintura baixa, bolsos grandes"
  },
  {
    item: "Legging",
    sim: "Lisa, preta, malha firme",
    nao: "Transparente, estampa grande"
  },
  {
    item: "Saia",
    sim: "Tubinho, lápis, justa no quadril",
    nao: "Saia balonê, evasê, babado largo"
  },
  {
    item: "Shorts",
    sim: "Cintura alta, jeans ou moletom justo",
    nao: "Largo, com volume na frente"
  },
  {
    item: "Blusa",
    sim: "Cropped ou por dentro da calça",
    nao: "Longa, que tampa o bumbum"
  },
  {
    item: "Vestido",
    sim: "Justo com tecido encorpado",
    nao: "Muito solto, sem cintura marcada"
  }
];

const challenge = [
  { dia: 1, missao: "Tire uma foto com sua melhor legging e postura empinada" },
  { dia: 2, missao: "Monte um look com saia ou vestido justo e ande com postura ereta" },
  { dia: 3, missao: "Use um cinto fino sobre uma peça mais solta para valorizar sua cintura" },
  { dia: 4, missao: "Treine 3 poses de fotos com ângulos diferentes" },
  { dia: 5, missao: "Grave um vídeo curto andando com postura, leveza e intenção" }
];

export default function BonusPosture() {
  const [, setLocation] = useLocation();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("posture");

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }

    // Load saved progress on component mount
    const savedProgress = loadProgress();
    const checkedSet = new Set<string>();
    
    Object.entries(savedProgress).forEach(([key, value]) => {
      if (value && key.startsWith('bonus-posture-')) {
        checkedSet.add(key);
      }
    });
    
    setCheckedItems(checkedSet);
  }, [setLocation]);

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const toggleCheck = (item: string) => {
    const fullKey = `bonus-posture-${item}`;
    const newChecked = new Set(checkedItems);
    let isChecked = false;
    
    if (newChecked.has(fullKey)) {
      newChecked.delete(fullKey);
      isChecked = false;
    } else {
      newChecked.add(fullKey);
      isChecked = true;
    }
    
    setCheckedItems(newChecked);
    
    // Auto-save progress
    const currentProgress = loadProgress();
    currentProgress[fullKey] = isChecked;
    saveProgress(currentProgress);
  };

  const tabs = [
    { id: "posture", label: "Postura", icon: Crown },
    { id: "clothing", label: "Roupas", icon: Sparkles },
    { id: "photos", label: "Fotos", icon: Camera },
    { id: "challenge", label: "Desafio", icon: Target }
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
              <h1 className="font-bold text-foreground">Guia de Postura e Estilo</h1>
              <p className="text-muted-foreground text-sm">Como Realçar Seus Glúteos</p>
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
              <Crown className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Guia de Postura e Estilo</h2>
                <p className="text-white/90">Desperte o Poder de Ser Vista</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              Agora que seus glúteos estão crescendo e tomando forma, é hora de aprender como valorizá-los visualmente.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Crown className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Postura</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Sparkles className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Estilo</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Camera className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Fotos</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Eye className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Confiança</p>
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

        {/* Posture Tab */}
        {activeTab === "posture" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Crown className="w-6 h-6 text-primary mr-3" />
                Postura Glútea™ - Técnica de 5 Pontos
              </h3>
              <p className="text-muted-foreground mb-6">
                A postura é o acessório invisível mais poderoso que você pode usar. Ela empina os glúteos instantaneamente e transmite confiança.
              </p>
              <div className="space-y-4">
                {postureSteps.map((step, index) => (
                  <div key={index} className="flex items-start p-4 bg-muted/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`posture-${index}`)}
                      className={checkedItems.has(`bonus-posture-posture-${index}`) ? "text-secondary" : ""}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="bg-accent/10 rounded-lg p-4 mt-6">
                <p className="text-foreground font-medium">
                  ❗ Treine isso diariamente por 1 minuto em frente ao espelho. Quanto mais natural for, mais linda você parecerá em qualquer roupa.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Clothing Tab */}
        {activeTab === "clothing" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-primary mr-3" />
                Peças-Chave Para Realçar os Glúteos
              </h3>
              <div className="space-y-6">
                {clothingTips.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="border-l-4 border-l-secondary">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-3">{category.category}</h4>
                      <div className="space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                            <p className="text-muted-foreground text-sm">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Style Rules Table */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Tabela Rápida: SIM x NÃO</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Item</th>
                        <th className="text-left p-3 font-semibold text-secondary">SIM ✅</th>
                        <th className="text-left p-3 font-semibold text-destructive">NÃO ❌</th>
                      </tr>
                    </thead>
                    <tbody>
                      {styleRules.map((rule, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3 font-medium">{rule.item}</td>
                          <td className="p-3 text-sm text-muted-foreground">{rule.sim}</td>
                          <td className="p-3 text-sm text-muted-foreground">{rule.nao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Photos Tab */}
        {activeTab === "photos" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Camera className="w-6 h-6 text-primary mr-3" />
                Posicionamento Corporal nas Fotos
              </h3>
              <p className="text-muted-foreground mb-6">
                Se você quer mostrar seus resultados de forma poderosa (sem apelar), siga essas dicas de ouro:
              </p>
              <div className="space-y-4">
                {photoTips.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 bg-accent/10 rounded-lg">
                    <Camera className="w-5 h-5 text-accent mr-3 mt-1" />
                    <div className="flex-1">
                      <p className="text-foreground">{tip}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`photo-${index}`)}
                      className={checkedItems.has(`bonus-posture-photo-${index}`) ? "text-secondary" : ""}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Challenge Tab */}
        {activeTab === "challenge" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-6 h-6 text-primary mr-3" />
                Desafio de 5 Dias - Glúteos em Destaque
              </h3>
              <div className="space-y-4">
                {challenge.map((day, index) => (
                  <div key={index} className="flex items-start p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">Dia {day.dia}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">{day.missao}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`challenge-${index}`)}
                      className={checkedItems.has(`bonus-posture-challenge-${index}`) ? "text-secondary" : ""}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Final Message */}
        <Card className="bg-gradient-to-r from-secondary/10 to-primary/10">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Frase de Poder
            </h3>
            <p className="text-muted-foreground mb-4 text-lg italic">
              "Não é sobre o que você veste. É sobre como você veste.<br />
              Não é sobre ter o corpo perfeito. É sobre usar o corpo que tem com orgulho e presença."
            </p>
            <div className="bg-primary text-white rounded-lg p-4 inline-block">
              <p className="font-semibold">
                Com estilo, atitude e postura, todo mundo vai notar o que você construiu.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}