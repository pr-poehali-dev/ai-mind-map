import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

type NodeData = {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  color: string;
  children?: NodeData[];
};

const mindMapData: NodeData = {
  id: 'root',
  label: 'Искусственный Интеллект',
  description: 'Наука и технологии создания интеллектуальных машин',
  icon: 'Brain',
  color: 'bg-indigo-600',
  children: [
    {
      id: 'ml',
      label: 'Машинное Обучение',
      icon: 'Cpu',
      color: 'bg-indigo-500',
      description: 'Алгоритмы, которые обучаются на данных',
      children: [
        {
          id: 'supervised',
          label: 'Обучение с учителем',
          color: 'bg-indigo-400',
          description: 'Размеченные данные',
          children: [
            { id: 'reg', label: 'Регрессия', color: 'bg-indigo-300' },
            { id: 'class', label: 'Классификация', color: 'bg-indigo-300' }
          ]
        },
        {
          id: 'unsupervised',
          label: 'Обучение без учителя',
          color: 'bg-indigo-400',
          description: 'Поиск скрытых структур',
          children: [
            { id: 'cluster', label: 'Кластеризация', color: 'bg-indigo-300' },
            { id: 'dim', label: 'Снижение размерности', color: 'bg-indigo-300' }
          ]
        }
      ]
    },
    {
      id: 'dl',
      label: 'Глубокое Обучение',
      icon: 'Network',
      color: 'bg-purple-600',
      description: 'Многослойные нейронные сети',
      children: [
        {
          id: 'nn',
          label: 'Нейросети',
          color: 'bg-purple-500',
          children: [
            { id: 'cnn', label: 'CNN (Сверточные)', description: 'Для изображений', color: 'bg-purple-400' },
            { id: 'rnn', label: 'RNN / LSTM', description: 'Для последовательностей', color: 'bg-purple-400' },
            { id: 'trans', label: 'Transformers', description: 'Attention механизм', color: 'bg-purple-400' }
          ]
        }
      ]
    },
    {
      id: 'nlp',
      label: 'Обработка Языка',
      icon: 'MessageSquare',
      color: 'bg-green-600',
      children: [
        { id: 'translate', label: 'Машинный перевод', color: 'bg-green-500' },
        { id: 'chatbots', label: 'Чат-боты', color: 'bg-green-500' },
        { id: 'sentiment', label: 'Анализ тональности', color: 'bg-green-500' }
      ]
    },
    {
      id: 'cv',
      label: 'Компьютерное Зрение',
      icon: 'Eye',
      color: 'bg-orange-500',
      children: [
        { id: 'detect', label: 'Детекция объектов', color: 'bg-orange-400' },
        { id: 'face', label: 'Распознавание лиц', color: 'bg-orange-400' },
        { id: 'ocr', label: 'OCR', color: 'bg-orange-400' }
      ]
    }
  ]
};

const TreeNode = ({ 
  node, 
  level = 0 
}: { 
  node: NodeData; 
  level?: number;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      <div 
        className={`
          group relative flex items-center gap-4 p-4 mb-3 rounded-xl border-l-4
          ${node.color} bg-white/80 backdrop-blur-sm border-current
          hover:shadow-lg hover:translate-x-1 transition-all duration-300 cursor-pointer
          animate-fade-in
        `}
        style={{ animationDelay: `${level * 0.1}s` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {node.icon && (
          <div className={`p-3 rounded-xl text-white ${node.color} shadow-sm`}>
            <Icon name={node.icon as any} size={20} />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
            {node.label}
          </h3>
          {node.description && (
            <p className="text-xs text-gray-500 leading-tight">
              {node.description}
            </p>
          )}
        </div>

        {hasChildren && (
          <Icon 
            name={isOpen ? 'ChevronDown' : 'ChevronRight'} 
            size={18} 
            className="text-gray-400 transition-transform" 
          />
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="ml-8 pl-6 border-l-2 border-gray-200 space-y-2 animate-accordion-down">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 animate-fade-in">
            <Icon name="Brain" size={28} className="text-indigo-600" />
            <span className="text-xl font-semibold text-gray-900">AI Mind Map</span>
          </div>
          
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveSection('home');
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-medium"
            >
              Главная
            </Button>
            <Button
              variant={activeSection === 'features' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveSection('features');
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-medium"
            >
              Функции
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Карта Знаний
            <span className="block text-indigo-600 mt-2">Искусственного Интеллекта</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Исследуйте структурированную визуализацию технологий ИИ.
            Раскрывайте узлы, изучайте связи и погружайтесь в мир машинного обучения.
          </p>
          
          <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <p className="text-sm text-indigo-800 flex items-center gap-2 justify-center">
                <Icon name="Info" size={18} />
                <span>Нажимайте на карточки, чтобы раскрывать или скрывать ветви знаний</span>
              </p>
            </div>
            
            <TreeNode node={mindMapData} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Возможности приложения
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Интерактивная визуализация, удобная навигация и структурированная информация
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Layers',
                title: 'Иерархическая структура',
                description: 'Данные организованы в виде многоуровневого дерева для удобного изучения'
              },
              {
                icon: 'MousePointerClick',
                title: 'Интерактивность',
                description: 'Раскрывайте и скрывайте разделы одним кликом для фокусировки на нужной информации'
              },
              {
                icon: 'Sparkles',
                title: 'Плавные анимации',
                description: 'Элегантные переходы и эффекты создают приятный опыт взаимодействия'
              },
              {
                icon: 'Palette',
                title: 'Цветовое кодирование',
                description: 'Каждая категория имеет свой цвет для быстрой визуальной навигации'
              },
              {
                icon: 'FileText',
                title: 'Подробные описания',
                description: 'Каждый узел содержит краткое описание для быстрого понимания темы'
              },
              {
                icon: 'Zap',
                title: 'Быстрая навигация',
                description: 'Плавная прокрутка между разделами и удобное меню навигации'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 bg-white/50">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          Создано с помощью React & Tailwind CSS • Структура знаний ИИ
        </div>
      </footer>
    </div>
  );
}
