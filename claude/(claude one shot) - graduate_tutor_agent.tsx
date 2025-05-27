import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Brain, Search, FileText, Lightbulb, MessageCircle, User, Bot } from 'lucide-react';

const GraduateTutor = () => {
  const [currentSubject, setCurrentSubject] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [priorKnowledge, setPriorKnowledge] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [tutorPersonality, setTutorPersonality] = useState({
    name: 'Dr. Sophia Chen',
    expertise: 'Interdisciplinary Studies',
    teachingStyle: 'Socratic method with practical applications'
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const subjects = [
    'Mathematics & Statistics',
    'Computer Science & AI',
    'Physics & Engineering',
    'Chemistry & Materials Science',
    'Biology & Life Sciences',
    'Psychology & Cognitive Science',
    'Economics & Finance',
    'Philosophy & Logic',
    'Literature & Linguistics',
    'History & Political Science',
    'Sociology & Anthropology',
    'Business & Management',
    'Law & Legal Studies',
    'Medicine & Health Sciences',
    'Environmental Science',
    'Art History & Theory',
    'Education & Pedagogy',
    'Other (specify)'
  ];

  const generateTutorResponse = (userMessage, context) => {
    const { subject, goal, knowledge } = context;
    
    // Simulate sophisticated AI tutor responses based on context
    const responses = {
      greeting: `Welcome! I'm Dr. Sophia Chen, and I'm delighted to guide you through ${subject}. Based on your goal of "${goal}" and your background in ${knowledge}, I'll tailor our sessions to challenge you appropriately while building on your existing foundation.

Let's start with a diagnostic question: What specific aspect of ${subject} would you like to explore first? I prefer to begin by understanding your current mental models before we dive deeper.`,

      
      clarification: `That's an excellent question about ${subject}. Let me break this down systematically:

First, let's establish the theoretical framework. In graduate-level study, we need to understand not just the "what" but the "why" and "how it connects to broader principles."

Could you tell me what you already know about this topic? I'd like to assess your current understanding before we proceed with more advanced concepts.`,

      
      deepDive: `Now we're getting into the fascinating complexities of ${subject}. This is exactly the kind of thinking that separates undergraduate from graduate-level analysis.

Consider this: the question you've asked touches on several interconnected concepts. Let me guide you through a structured exploration:

1. **Foundational Principles**: What are the core assumptions underlying this area?
2. **Current Debates**: What are scholars currently disagreeing about?
3. **Methodological Considerations**: How do we actually study/analyze this?
4. **Implications**: What are the broader consequences of different approaches?

Which of these angles interests you most right now?`,

      
      socratic: `Excellent thinking! Now let me push you a bit further with some probing questions:

• What evidence would you need to see to change your mind about this?
• How does this connect to what we discussed earlier about [related concept]?
• If you were to explain this to a colleague in a different field, what analogies would you use?
• What are the potential limitations or criticisms of this approach?

Take your time thinking through these. Graduate-level learning is about developing critical thinking, not just absorbing information.`
    };

    // Simple response selection based on message content and context
    if (userMessage.toLowerCase().includes('what is') || userMessage.toLowerCase().includes('define')) {
      return responses.clarification;
    } else if (userMessage.toLowerCase().includes('how') || userMessage.toLowerCase().includes('why')) {
      return responses.deepDive;
    } else if (userMessage.length > 100) {
      return responses.socratic;
    } else {
      return responses.greeting;
    }
  };

  const handleSetup = () => {
    if (!currentSubject || !learningGoal) {
      alert('Please fill in at least the subject and learning goal to continue.');
      return;
    }

    setIsSetupComplete(true);
    const welcomeMessage = {
      id: Date.now(),
      type: 'tutor',
      content: generateTutorResponse('', {
        subject: currentSubject,
        goal: learningGoal,
        knowledge: priorKnowledge || 'undergraduate level'
      })
    };
    setMessages([welcomeMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    };

    const tutorMessage = {
      id: Date.now() + 1,
      type: 'tutor',
      content: generateTutorResponse(inputMessage, {
        subject: currentSubject,
        goal: learningGoal,
        knowledge: priorKnowledge
      })
    };

    setMessages(prev => [...prev, userMessage, tutorMessage]);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetSession = () => {
    setIsSetupComplete(false);
    setMessages([]);
    setCurrentSubject('');
    setLearningGoal('');
    setPriorKnowledge('');
    setInputMessage('');
  };

  if (!isSetupComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-12 w-12 text-indigo-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">Graduate-Level AI Tutor</h1>
            </div>
            <p className="text-lg text-gray-600">Your personal academic mentor for advanced learning</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <BookOpen className="inline h-4 w-4 mr-2" />
                    Subject Area *
                  </label>
                  <select 
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select your subject...</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Lightbulb className="inline h-4 w-4 mr-2" />
                    Learning Goal *
                  </label>
                  <textarea
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    placeholder="What do you want to achieve? (e.g., 'Master quantum field theory for my thesis', 'Understand advanced statistical methods for my research')"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Search className="inline h-4 w-4 mr-2" />
                    Prior Knowledge
                  </label>
                  <textarea
                    value={priorKnowledge}
                    onChange={(e) => setPriorKnowledge(e.target.value)}
                    placeholder="Describe your background in this subject (courses taken, research experience, etc.)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-800 mb-2">Your Tutor</h3>
                  <div className="text-sm text-indigo-700">
                    <p><strong>Dr. Sophia Chen</strong></p>
                    <p>Interdisciplinary Studies</p>
                    <p>Teaching Style: Socratic method with practical applications</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleSetup}
                disabled={!currentSubject || !learningGoal}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Begin Learning Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Graduate Tutor Session</h1>
              <p className="text-sm text-gray-600">{currentSubject} • {learningGoal}</p>
            </div>
          </div>
          <button
            onClick={resetSession}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            New Session
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-blue-500' : 'bg-indigo-500'
                    }`}>
                      {message.type === 'user' ? 
                        <User className="h-5 w-5 text-white" /> : 
                        <Bot className="h-5 w-5 text-white" />
                      }
                    </div>
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question, share your thoughts, or request clarification..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows="2"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors duration-200 flex-shrink-0"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduateTutor;