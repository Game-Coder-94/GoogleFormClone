import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  User,
  Send,
  Lightbulb,
  Command,
  Zap,
  MessageSquare,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isCommand?: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your AI assistant for Forms Hub. I can help you create forms, analyze responses, and manage your account. Try typing a command like `/newform` or just ask me anything!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const commands = [
    { command: "/newform", description: "Create a new form", icon: "📝" },
    { command: "/addquestion", description: "Add a question to current form", icon: "❓" },
    { command: "/analytics", description: "Show analytics dashboard", icon: "📊" },
    { command: "/responses", description: "View form responses", icon: "📋" },
    { command: "/share", description: "Get shareable link", icon: "🔗" },
    { command: "/exportcsv", description: "Download responses as CSV", icon: "📥" },
    { command: "/theme light", description: "Switch to light theme", icon: "☀️" },
    { command: "/theme dark", description: "Switch to dark theme", icon: "🌙" },
    { command: "/help", description: "Show all available commands", icon: "❓" },
    { command: "/settings", description: "Open settings", icon: "⚙️" },
  ];

  const quickActions = [
    "Create a customer feedback form",
    "Show my form analytics",
    "Export responses to CSV",
    "Share my latest form",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    let response = "";
    const isCommand = userMessage.startsWith("/");
    
    if (isCommand) {
      const command = userMessage.toLowerCase();
      switch (command) {
        case "/newform":
          response = "🎉 Let's create a new form! I'll guide you through the process:\n\n1. **Form Title**: What would you like to call your form?\n2. **Description**: Add a brief description\n3. **Questions**: What type of questions do you want to add?\n\nWould you like me to create a template or start from scratch?";
          break;
        case "/analytics":
          response = "📊 Here's your analytics overview:\n\n• **Total Forms**: 24 forms\n• **Total Responses**: 1,847 responses\n• **Completion Rate**: 87.2%\n• **Most Popular Form**: Customer Feedback Survey (245 responses)\n\nWould you like detailed analytics for a specific form?";
          break;
        case "/help":
          response = "🤖 **Available Commands:**\n\n" + commands.map(cmd => `**${cmd.command}** - ${cmd.description}`).join("\n") + "\n\nYou can also ask me questions in natural language!";
          break;
        case "/share":
          response = "🔗 **Share Your Forms:**\n\n• **Direct Link**: https://forms-hub.com/form/abc123\n• **QR Code**: Generated and ready to download\n• **Embed Code**: `<iframe src='...'></iframe>`\n\nI can also help you customize sharing settings!";
          break;
        default:
          response = `✨ I understand you want to use the command: **${userMessage}**\n\nThis feature is currently being developed. In the meantime, I can help you with form creation, analytics, and general questions. Try asking me something like "How do I create a survey?" or use one of the available commands!`;
      }
    } else {
      // Natural language responses
      const message = userMessage.toLowerCase();
      if (message.includes("create") && message.includes("form")) {
        response = "🎯 I'd love to help you create a form! Here are some popular form types:\n\n• **Customer Feedback Survey**\n• **Event Registration Form**\n• **Contact Form**\n• **Product Review Form**\n• **Employee Satisfaction Survey**\n\nWhich type interests you, or do you have something specific in mind?";
      } else if (message.includes("analytics") || message.includes("stats")) {
        response = "📈 Your analytics are looking great! Here's what I can show you:\n\n• **Response Trends**: See how responses change over time\n• **Form Performance**: Which forms get the most engagement\n• **Completion Rates**: Track where users drop off\n• **Geographic Data**: Where your responses come from\n\nWould you like me to generate a specific report?";
      } else if (message.includes("help") || message.includes("support")) {
        response = "🤝 I'm here to help! I can assist you with:\n\n• Creating and editing forms\n• Managing responses and analytics\n• Sharing and embedding forms\n• Account settings and preferences\n• Troubleshooting issues\n\nWhat would you like help with specifically?";
      } else {
        response = `💭 That's an interesting question! While I'm still learning, I can help you with form creation, analytics, and managing your Forms Hub account.\n\nTry asking about:\n• "How do I add a new question?"\n• "Show me my form analytics"\n• "How do I share my form?"\n\nOr use commands like \`/newform\` or \`/help\` for quick actions!`;
      }
    }
    
    const botMessage: Message = {
      id: Date.now().toString(),
      type: "bot",
      content: response,
      timestamp: new Date(),
      isCommand,
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
      isCommand: input.startsWith("/"),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    await simulateBotResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Your intelligent forms companion - ask questions or use commands
          </p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="glass flex-1 flex flex-col">
            <CardHeader className="border-b border-card-border">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Chat Assistant
                <Badge variant="outline" className="ml-auto">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            
            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea ref={scrollAreaRef} className="h-[500px] p-4 custom-scrollbar">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.type === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {message.type === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`flex-1 max-w-[80%] ${
                          message.type === "user" ? "text-right" : ""
                        }`}
                      >
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground ml-auto"
                              : "bg-secondary text-secondary-foreground"
                          } ${message.isCommand ? "font-mono text-sm" : ""}`}
                        >
                          <div className="whitespace-pre-wrap">
                            {formatMessage(message.content)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type === "bot" && (
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            
            {/* Input */}
            <div className="border-t border-card-border p-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message or command (e.g., /newform)..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                  className="gradient-primary text-white border-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start text-sm h-auto p-3"
                  onClick={() => setInput(action)}
                >
                  {action}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Available Commands */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Command className="w-4 h-4 text-primary" />
                Commands
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
                {commands.slice(0, 8).map((cmd, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(cmd.command)}
                    className="w-full text-left p-2 rounded-lg hover:bg-secondary/50 transition-smooth group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{cmd.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs text-primary group-hover:text-primary-hover">
                          {cmd.command}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {cmd.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-warning" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Use <code className="bg-muted px-1 rounded">/</code> for commands</p>
              <p>• Ask questions in natural language</p>
              <p>• Press Enter to send messages</p>
              <p>• Use quick actions for common tasks</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}