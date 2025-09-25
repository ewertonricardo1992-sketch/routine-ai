"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Brain, 
  Calendar, 
  Target, 
  MessageCircle, 
  Smartphone, 
  Clock, 
  Zap, 
  TrendingUp,
  Settings,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Smile,
  Meh,
  Frown,
  Coffee,
  BookOpen,
  Dumbbell,
  Users,
  Home,
  Briefcase
} from 'lucide-react'
import { toast } from 'sonner'

interface RoutineTask {
  id: string
  title: string
  category: 'trabalho' | 'estudo' | 'lazer' | 'saude'
  duration: number
  priority: 'alta' | 'media' | 'baixa'
  completed: boolean
  scheduledTime: string
}

interface UserProfile {
  name: string
  goals: string[]
  workHours: { start: string; end: string }
  preferences: {
    workIntensity: 'baixa' | 'media' | 'alta'
    breakFrequency: number
    focusTime: number
  }
  integrations: {
    whatsapp: boolean
    telegram: boolean
    phone: string
  }
}

const moodEmojis = {
  energizado: { icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  focado: { icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
  cansado: { icon: Frown, color: 'text-gray-500', bg: 'bg-gray-50' },
  motivado: { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  estressado: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  neutro: { icon: Meh, color: 'text-gray-400', bg: 'bg-gray-50' }
}

const categoryIcons = {
  trabalho: { icon: Briefcase, color: 'text-blue-600' },
  estudo: { icon: BookOpen, color: 'text-purple-600' },
  lazer: { icon: Home, color: 'text-green-600' },
  saude: { icon: Dumbbell, color: 'text-red-600' }
}

export default function RoutineAI() {
  const [currentMood, setCurrentMood] = useState<keyof typeof moodEmojis>('neutro')
  const [todayRoutine, setTodayRoutine] = useState<RoutineTask[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    goals: [],
    workHours: { start: '09:00', end: '18:00' },
    preferences: {
      workIntensity: 'media',
      breakFrequency: 60,
      focusTime: 25
    },
    integrations: {
      whatsapp: false,
      telegram: false,
      phone: ''
    }
  })
  const [activeTab, setActiveTab] = useState('dashboard')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }))
    }
    
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const generateSmartRoutine = async () => {
    setIsGenerating(true)
    
    // Simular chamada para IA
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const sampleTasks: RoutineTask[] = [
      {
        id: '1',
        title: 'Revisão de emails importantes',
        category: 'trabalho',
        duration: 30,
        priority: 'alta',
        completed: false,
        scheduledTime: '09:00'
      },
      {
        id: '2',
        title: 'Sessão de foco profundo - Projeto principal',
        category: 'trabalho',
        duration: 90,
        priority: 'alta',
        completed: false,
        scheduledTime: '09:30'
      },
      {
        id: '3',
        title: 'Pausa para café e alongamento',
        category: 'saude',
        duration: 15,
        priority: 'media',
        completed: false,
        scheduledTime: '11:00'
      },
      {
        id: '4',
        title: 'Estudo - Curso online',
        category: 'estudo',
        duration: 60,
        priority: 'media',
        completed: false,
        scheduledTime: '14:00'
      },
      {
        id: '5',
        title: 'Exercício físico',
        category: 'saude',
        duration: 45,
        priority: 'alta',
        completed: false,
        scheduledTime: '18:30'
      },
      {
        id: '6',
        title: 'Tempo livre - Leitura',
        category: 'lazer',
        duration: 30,
        priority: 'baixa',
        completed: false,
        scheduledTime: '20:00'
      }
    ]
    
    setTodayRoutine(sampleTasks)
    setIsGenerating(false)
    toast.success('Rotina inteligente gerada com base no seu humor e metas!')
  }

  const toggleTaskComplete = (taskId: string) => {
    setTodayRoutine(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const sendReminder = (platform: 'whatsapp' | 'telegram') => {
    if (!profile.integrations.phone) {
      toast.error('Configure seu número de telefone primeiro!')
      return
    }
    
    toast.success(`Lembrete enviado via ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`)
  }

  const completedTasks = todayRoutine.filter(task => task.completed).length
  const totalTasks = todayRoutine.length
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const MoodIcon = moodEmojis[currentMood].icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                RoutineAI
              </h1>
              <p className="text-gray-600 mt-1">
                Rotinas inteligentes personalizadas para você
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Agora</p>
                <p className="font-mono text-lg" suppressHydrationWarning>
                  {mounted ? currentTime : '--:--'}
                </p>
              </div>
              <div className={`p-3 rounded-full ${moodEmojis[currentMood].bg}`}>
                <MoodIcon className={`w-6 h-6 ${moodEmojis[currentMood].color}`} />
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-fit">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <Smile className="w-4 h-4" />
              Humor
            </TabsTrigger>
            <TabsTrigger value="routine" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Rotina
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Progress Card */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progresso Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold">
                      {completedTasks}/{totalTasks}
                    </div>
                    <Progress value={progressPercentage} className="bg-white/20" />
                    <p className="text-sm opacity-90">
                      {Math.round(progressPercentage)}% das tarefas concluídas
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Mood Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MoodIcon className={`w-5 h-5 ${moodEmojis[currentMood].color}`} />
                    Humor Atual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-2xl font-semibold capitalize">
                      {currentMood}
                    </div>
                    <p className="text-sm text-gray-600">
                      A IA está adaptando sua rotina com base no seu humor atual
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Next Task Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Próxima Tarefa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todayRoutine.length > 0 ? (
                    <div className="space-y-2">
                      <div className="font-semibold">
                        {todayRoutine.find(task => !task.completed)?.title || 'Todas concluídas!'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {todayRoutine.find(task => !task.completed)?.scheduledTime || '🎉'}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Gere sua rotina primeiro</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Generate Routine Button */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Gerar Rotina Inteligente</h3>
                    <p className="text-gray-600">
                      A IA analisará seu humor, calendário e metas para criar a rotina perfeita
                    </p>
                  </div>
                  <Button 
                    onClick={generateSmartRoutine}
                    disabled={isGenerating}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-spin" />
                        Gerando com IA...
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5 mr-2" />
                        Gerar Rotina com IA
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mood Analysis */}
          <TabsContent value="mood" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Como você está se sentindo hoje?</CardTitle>
                <CardDescription>
                  Sua resposta ajudará a IA a personalizar sua rotina
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(moodEmojis).map(([mood, config]) => {
                    const IconComponent = config.icon
                    return (
                      <Button
                        key={mood}
                        variant={currentMood === mood ? "default" : "outline"}
                        className={`h-20 flex-col gap-2 ${
                          currentMood === mood 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                            : ''
                        }`}
                        onClick={() => setCurrentMood(mood as keyof typeof moodEmojis)}
                      >
                        <IconComponent className="w-6 h-6" />
                        <span className="capitalize text-sm">{mood}</span>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise do Humor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MoodIcon className={`w-8 h-8 ${moodEmojis[currentMood].color}`} />
                    <div>
                      <h4 className="font-semibold capitalize">{currentMood}</h4>
                      <p className="text-sm text-gray-600">
                        {currentMood === 'energizado' && 'Perfeito para tarefas desafiadoras!'}
                        {currentMood === 'focado' && 'Ideal para trabalho profundo.'}
                        {currentMood === 'cansado' && 'Vamos incluir mais pausas.'}
                        {currentMood === 'motivado' && 'Ótimo dia para metas ambiciosas!'}
                        {currentMood === 'estressado' && 'Priorizaremos atividades relaxantes.'}
                        {currentMood === 'neutro' && 'Rotina equilibrada recomendada.'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Routine View */}
          <TabsContent value="routine" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl font-bold">Sua Rotina de Hoje</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sendReminder('whatsapp')}
                  disabled={!profile.integrations.whatsapp}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sendReminder('telegram')}
                  disabled={!profile.integrations.telegram}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
              </div>
            </div>

            {todayRoutine.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Calendar className="w-16 h-16 mx-auto text-gray-400" />
                    <div>
                      <h3 className="text-lg font-semibold">Nenhuma rotina gerada</h3>
                      <p className="text-gray-600">
                        Vá para o Dashboard e gere sua rotina inteligente
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {todayRoutine.map((task) => {
                  const CategoryIcon = categoryIcons[task.category].icon
                  return (
                    <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-6 w-6 rounded-full"
                            onClick={() => toggleTaskComplete(task.id)}
                          >
                            {task.completed ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                            )}
                          </Button>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <CategoryIcon className={`w-4 h-4 ${categoryIcons[task.category].color}`} />
                              <h4 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
                                {task.title}
                              </h4>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <Badge variant="outline" className="capitalize">
                                {task.category}
                              </Badge>
                              <Badge variant={
                                task.priority === 'alta' ? 'destructive' : 
                                task.priority === 'media' ? 'default' : 'secondary'
                              }>
                                {task.priority}
                              </Badge>
                              <span className="text-gray-600">
                                {task.duration} min
                              </span>
                              <span className="text-gray-600">
                                {task.scheduledTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Pessoal</CardTitle>
                <CardDescription>
                  Configure suas informações para rotinas mais personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Seu nome"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="goals">Metas Principais</Label>
                  <Textarea
                    id="goals"
                    placeholder="Ex: Aprender programação, exercitar-se diariamente, ler mais livros..."
                    className="min-h-20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Horário de Trabalho - Início</Label>
                    <Input
                      type="time"
                      value={profile.workHours.start}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        workHours: { ...prev.workHours, start: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Horário de Trabalho - Fim</Label>
                    <Input
                      type="time"
                      value={profile.workHours.end}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        workHours: { ...prev.workHours, end: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferências de Rotina</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Intensidade de Trabalho</Label>
                  <Select
                    value={profile.preferences.workIntensity}
                    onValueChange={(value: 'baixa' | 'media' | 'alta') => 
                      setProfile(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, workIntensity: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baixa">Baixa</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Frequência de Pausas (minutos)</Label>
                  <Input
                    type="number"
                    value={profile.preferences.breakFrequency}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, breakFrequency: parseInt(e.target.value) }
                    }))}
                    min="15"
                    max="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tempo de Foco (minutos)</Label>
                  <Input
                    type="number"
                    value={profile.preferences.focusTime}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, focusTime: parseInt(e.target.value) }
                    }))}
                    min="15"
                    max="90"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrações de Lembretes</CardTitle>
                <CardDescription>
                  Configure para receber lembretes automáticos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.integrations.phone}
                    onChange={(e) => setProfile(prev => ({
                      ...prev,
                      integrations: { ...prev.integrations, phone: e.target.value }
                    }))}
                    placeholder="+55 11 99999-9999"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>WhatsApp</Label>
                      <p className="text-sm text-gray-600">
                        Receber lembretes via WhatsApp
                      </p>
                    </div>
                    <Switch
                      checked={profile.integrations.whatsapp}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, whatsapp: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Telegram</Label>
                      <p className="text-sm text-gray-600">
                        Receber lembretes via Telegram
                      </p>
                    </div>
                    <Switch
                      checked={profile.integrations.telegram}
                      onCheckedChange={(checked) => setProfile(prev => ({
                        ...prev,
                        integrations: { ...prev.integrations, telegram: checked }
                      }))}
                    />
                  </div>
                </div>

                <Button className="w-full">
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
