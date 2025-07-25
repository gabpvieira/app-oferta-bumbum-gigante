import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isLoggedIn } from "@/lib/auth";
import { saveProgress, loadProgress } from "@/lib/checklist-storage";
import { ArrowLeft, Crown, Target, CheckCircle, Heart, Sparkles, Music, Camera, MessageCircle } from "lucide-react";

const dailyAffirmations = [
  "Eu tenho um corpo forte, bonito e em transformação.",
  "Cada repetição me aproxima da minha melhor versão.",
  "Eu me amo em todas as fases. Meu corpo é minha casa.",
  "Eu atraio olhares porque exalo confiança.",
  "Eu sou sexy, elegante e poderosa."
];

const eleganceTips = [
  "Falar devagar e com voz firme",
  "Sentar com postura alinhada",
  "Agradecer elogios com um simples 'obrigada'",
  "Evitar se justificar o tempo todo",
  "Andar com intenção, sem pressa ou culpa"
];

const dailyRitual = [
  { step: "Limpe o rosto com água fria", time: "1 min" },
  { step: "Penteie o cabelo com intenção", time: "2 min" },
  { step: "Passe um hidratante (mesmo simples)", time: "2 min" },
  { step: "Perfume leve – mesmo em casa", time: "1 min" },
  { step: "Olhe no espelho e diga: 'Eu tô pronta pra brilhar'", time: "1 min" }
];

const photoTips = [
  "Coloque o celular num tripé ou em cima de livros",
  "Fique de lado ou levemente de costas",
  "Contraia os glúteos",
  "Use luz natural (janela)",
  "Use short justo, legging ou vestido colado",
  "Sorria com os olhos"
];

const playlist = [
  "Beyoncé – \"Feeling Myself\"",
  "IZA – \"Gueto\"",
  "Ludmilla – \"Rainha da Favela\"",
  "Anitta – \"Bang\"",
  "Karol G – \"Provenza\""
];

const weekChallenge = [
  { dia: 1, missao: "Andar com postura de modelo por 10 min", tempo: "10 min" },
  { dia: 2, missao: "Tirar 1 foto se olhando com carinho", tempo: "5 min" },
  { dia: 3, missao: "Fazer um look só pra você e usar em casa", tempo: "10 min" },
  { dia: 4, missao: "Escutar sua afirmação preferida antes do treino", tempo: "3 min" },
  { dia: 5, missao: "Passar perfume e hidratante mesmo sem sair", tempo: "2 min" },
  { dia: 6, missao: "Dançar 1 música no quarto como se estivesse num palco", tempo: "4 min" },
  { dia: 7, missao: "Dizer 3 coisas que ama em você na frente do espelho", tempo: "3 min" }
];

const styleSecrets = [
  {
    title: "AUTOIMAGEM É CONSTRUÍDA, NÃO NASCE PRONTA",
    content: "Antes de qualquer roupa, maquiagem ou ângulo: o que define se você se sente linda é a forma como você fala com você mesma.",
    action: "Diga toda manhã: 'Meu corpo está se transformando. Eu sou linda em cada fase desse processo.'"
  },
  {
    title: "POSTURA MUDA TUDO",
    content: "Uma mulher que se posiciona com presença, mesmo com roupa simples, transborda beleza e autoridade.",
    action: "Treine por 1 minuto por dia: Ombros para trás, barriga contraída, queixo paralelo ao chão."
  },
  {
    title: "VISTA-SE PARA SUA NOVA VERSÃO",
    content: "Você está se transformando. Mostre isso. Não espere 'ficar pronta' para se vestir como uma mulher poderosa.",
    action: "Separe 3 looks favoritos. Vista um mesmo sem sair de casa. Tire fotos para você mesma."
  },
  {
    title: "CUIDADOS RÁPIDOS QUE ELEVAM SUA AUTOESTIMA",
    content: "Você não precisa de horas ou dinheiro para se sentir mais bonita. Você precisa de intenção.",
    action: "Ritual de 10 minutos: limpeza, penteado, hidratante, perfume e afirmação positiva."
  }
];

export default function BonusBody() {
  const [, setLocation] = useLocation();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("secrets");

  useEffect(() => {
    if (!isLoggedIn()) {
      setLocation("/");
      return;
    }

    // Load saved progress on component mount
    const savedProgress = loadProgress();
    const checkedSet = new Set<string>();
    
    Object.entries(savedProgress).forEach(([key, value]) => {
      if (value && key.startsWith('bonus-body-')) {
        checkedSet.add(key);
      }
    });
    
    setCheckedItems(checkedSet);
  }, [setLocation]);

  const handleBack = () => {
    setLocation("/dashboard");
  };

  const toggleCheck = (item: string) => {
    const fullKey = `bonus-body-${item}`;
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
    { id: "secrets", label: "Segredos", icon: Crown },
    { id: "ritual", label: "Ritual", icon: Sparkles },
    { id: "affirmations", label: "Afirmações", icon: Heart },
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
              <h1 className="font-bold text-foreground">Segredos Para Valorizar Seu Corpo</h1>
              <p className="text-muted-foreground text-sm">Dicas Para Se Sentir Linda</p>
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
              <Heart className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Segredos Para Valorizar Seu Corpo</h2>
                <p className="text-white/90">Dicas práticas para se sentir linda todos os dias</p>
              </div>
            </div>
            <p className="text-white/90 mb-4">
              Este bônus é um verdadeiro reforço emocional e visual. Você não está apenas moldando um bumbum – está moldando uma nova identidade.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Crown className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Autoimagem</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Sparkles className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Elegância</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <Heart className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Autoestima</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <MessageCircle className="w-6 h-6 mx-auto mb-2" />
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

        {/* Secrets Tab */}
        {activeTab === "secrets" && (
          <div className="space-y-6">
            {styleSecrets.map((secret, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {index + 1}º SEGREDO: {secret.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{secret.content}</p>
                      <div className="bg-accent/10 rounded-lg p-3">
                        <h4 className="font-medium text-foreground mb-2">💬 Ação Prática:</h4>
                        <p className="text-muted-foreground text-sm">{secret.action}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`secret-${index}`)}
                      className={`ml-4 ${checkedItems.has(`bonus-body-secret-${index}`) ? "text-secondary" : ""}`}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Elegance Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Crown className="w-6 h-6 text-accent mr-3" />
                  ELEGÂNCIA É ENERGIA
                </h3>
                <p className="text-muted-foreground mb-4">
                  Não é sobre quanto você gasta. É sobre como você se porta.
                </p>
                <div className="space-y-3">
                  {eleganceTips.map((tip, index) => (
                    <div key={index} className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                      <span className="text-foreground flex-1">{tip}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCheck(`elegance-${index}`)}
                        className={checkedItems.has(`bonus-body-elegance-${index}`) ? "text-secondary" : ""}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Photo Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Camera className="w-6 h-6 text-primary mr-3" />
                  ÂNGULO É TUDO - VALORIZE SEU BUMBUM NAS FOTOS
                </h3>
                <div className="space-y-3">
                  {photoTips.map((tip, index) => (
                    <div key={index} className="flex items-center p-3 bg-primary/10 rounded-lg">
                      <Camera className="w-4 h-4 text-primary mr-3" />
                      <span className="text-foreground flex-1">{tip}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCheck(`photo-tip-${index}`)}
                        className={checkedItems.has(`bonus-body-photo-tip-${index}`) ? "text-secondary" : ""}
                      >
                        <CheckCircle className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Playlist */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Music className="w-6 h-6 text-secondary mr-3" />
                  PLAYLIST GLÚTEA™ SUGERIDA
                </h3>
                <div className="space-y-2">
                  {playlist.map((song, index) => (
                    <div key={index} className="flex items-center p-2 bg-secondary/10 rounded">
                      <Music className="w-4 h-4 text-secondary mr-3" />
                      <span className="text-foreground">{song}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Dance, se mova e celebre seu corpo mesmo sem motivo. Isso acelera os resultados.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ritual Tab */}
        {activeTab === "ritual" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="w-6 h-6 text-primary mr-3" />
                Ritual de 10 Minutos Por Dia
              </h3>
              <p className="text-muted-foreground mb-6">
                Você não precisa de horas ou dinheiro para se sentir mais bonita. Você precisa de intenção.
              </p>
              <div className="space-y-4">
                {dailyRitual.map((item, index) => (
                  <div key={index} className="flex items-center p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{item.step}</p>
                      <p className="text-muted-foreground text-sm">{item.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`ritual-${index}`)}
                      className={checkedItems.has(`bonus-body-ritual-${index}`) ? "text-secondary" : ""}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="bg-accent/10 rounded-lg p-4 mt-6">
                <p className="text-foreground font-medium">
                  Mulher cheirosa, com olhar firme e postura confiante = magnetismo puro.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Affirmations Tab */}
        {activeTab === "affirmations" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Heart className="w-6 h-6 text-primary mr-3" />
                Afirmações Que Reprogramam Sua Autoimagem
              </h3>
              <p className="text-muted-foreground mb-6">
                Use essas frases diariamente, especialmente ao se olhar no espelho ou antes do treino:
              </p>
              <div className="space-y-4">
                {dailyAffirmations.map((affirmation, index) => (
                  <div key={index} className="flex items-start p-4 bg-secondary/10 rounded-lg">
                    <Heart className="w-5 h-5 text-secondary mr-3 mt-1" />
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{affirmation}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`affirmation-${index}`)}
                      className={checkedItems.has(`bonus-body-affirmation-${index}`) ? "text-secondary" : ""}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 rounded-lg p-4 mt-6">
                <p className="text-foreground font-medium">
                  💡 Dica: Grave essas frases com sua própria voz e escute antes de dormir. Sua mente precisa ouvir sua verdade até acreditar.
                </p>
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
                Desafio de 7 Dias - Valorize-se na Prática
              </h3>
              <div className="space-y-4">
                {weekChallenge.map((day, index) => (
                  <div key={index} className="flex items-start p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">Dia {day.dia}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{day.missao}</p>
                      <p className="text-muted-foreground text-sm">{day.tempo}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCheck(`challenge-${index}`)}
                      className={checkedItems.has(`bonus-body-challenge-${index}`) ? "text-secondary" : ""}
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
            <Crown className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Última Mensagem
            </h3>
            <div className="space-y-3 text-lg">
              <p className="text-muted-foreground">Você já é linda.</p>
              <p className="text-muted-foreground">Você está ficando ainda mais poderosa.</p>
              <p className="text-muted-foreground">E agora, você sabe como fazer o mundo perceber isso também.</p>
            </div>
            <div className="bg-primary text-white rounded-lg p-4 mt-6 inline-block">
              <p className="font-semibold">
                Seja sua própria referência.<br />
                O bumbum é o começo.<br />
                A nova mulher que você está se tornando... essa sim é imbatível.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}