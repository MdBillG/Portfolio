"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Mail, MessageCircle, X, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';

// Simulated chatbot responses based on keywords
const chatbotResponses = {
  experience: "I have over 5 years of experience in software development, including roles at Tech Corp and StartUp Inc.",
  education: "I hold a Master's in Computer Science from Stanford University and a Bachelor's from MIT.",
  skills: "My core skills include JavaScript, TypeScript, React, Node.js, and cloud technologies like AWS and Google Cloud.",
  projects: "I've worked on several projects including an AI-powered analytics platform and a real-time collaboration tool.",
  default: "Hello! I'm John's virtual assistant. Feel free to ask about my experience, education, skills, or projects!",
};

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);

  useEffect(() => {
    if (chatOpen && chatMessages.length === 0) {
      setChatMessages([{ type: 'bot', text: chatbotResponses.default }]);
    }

    // Initialize Intersection Observer for skills and education sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'skills-section' && entry.isIntersecting) {
            setSkillsVisible(true);
          }
          if (entry.target.id === 'education-section' && entry.isIntersecting) {
            setEducationVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const skillsSection = document.getElementById('skills-section');
    const educationSection = document.getElementById('education-section');

    if (skillsSection) observer.observe(skillsSection);
    if (educationSection) observer.observe(educationSection);

    return () => observer.disconnect();
  }, [chatOpen]);

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('experience')) return chatbotResponses.experience;
    if (lowerMessage.includes('education')) return chatbotResponses.education;
    if (lowerMessage.includes('skills')) return chatbotResponses.skills;
    if (lowerMessage.includes('projects')) return chatbotResponses.projects;
    return "I'm not sure about that. Feel free to ask about my experience, education, skills, or projects!";
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setChatMessages(prev => [...prev, { type: 'user', text: messageInput }]);
    setMessageInput('');
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages(prev => [...prev, { type: 'bot', text: getBotResponse(messageInput) }]);
      setIsTyping(false);
    }, 1500);
  };

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Python", "AWS", "Docker", "GraphQL",
    "MongoDB", "PostgreSQL", "Next.js", "TailwindCSS"
  ];

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "A sophisticated analytics platform leveraging machine learning algorithms to provide predictive insights for business intelligence.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tags: ["React", "Python", "TensorFlow", "AWS"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Real-time Collaboration Tool",
      description: "A modern collaboration platform enabling real-time document editing, video conferencing, and team communication.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      tags: ["Next.js", "WebRTC", "Socket.io", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Blockchain-based Supply Chain",
      description: "A decentralized supply chain management system using blockchain technology for transparency and traceability.",
      image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f",
      tags: ["Solidity", "React", "Node.js", "Ethereum"],
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 grid grid-cols-2 -skew-y-12 opacity-20 dark:opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-t border-primary/10"></div>
          ))}
        </div>
        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
                  John Doe
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Senior Software Engineer specialized in building exceptional digital experiences
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex gap-2 bg-primary hover:bg-primary/90">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
                <Button variant="outline">Contact Me</Button>
              </div>
            </div>
            <div className="relative aspect-square group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-primary/50 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Profile"
                fill
                className="object-cover rounded-full ring-2 ring-primary/20"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="py-24 bg-muted/50 overflow-hidden">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <Card 
                key={skill} 
                className={`
                  p-4 text-center hover:bg-primary/5 transition-all hover:scale-105 cursor-default
                  transform opacity-0
                  ${skillsVisible ? 'animate-[slideIn_0.5s_ease-out_forwards]' : ''}
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: skillsVisible ? `slideIn 0.5s ease-out ${index * 0.1}s forwards` : 'none'
                }}
              >
                {skill}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Experience</h2>
          <div className="space-y-8">
            {[
              {
                company: "Tech Corp",
                position: "Senior Software Engineer",
                period: "2020 - Present",
                description: "Led development of cloud-native applications using React and Node.js"
              },
              {
                company: "StartUp Inc",
                position: "Full Stack Developer",
                period: "2018 - 2020",
                description: "Developed and maintained multiple web applications using modern JavaScript frameworks"
              }
            ].map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <h3 className="font-bold text-xl">{job.position}</h3>
                <p className="text-primary">{job.company}</p>
                <p className="text-sm text-muted-foreground">{job.period}</p>
                <p className="mt-2">{job.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education-section" className="py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-8">Education</h2>
              <div className="space-y-4">
                {[
                  {
                    degree: "Master of Computer Science",
                    school: "Stanford University",
                    period: "2016 - 2018"
                  },
                  {
                    degree: "Bachelor of Engineering",
                    school: "MIT",
                    period: "2012 - 2016"
                  }
                ].map((edu, index) => (
                  <Card 
                    key={index} 
                    className={`
                      p-6 hover:shadow-lg transition-all transform opacity-0
                      ${educationVisible ? 'animate-[slideInRight_0.5s_ease-out_forwards]' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animation: educationVisible ? `slideInRight 0.5s ease-out ${index * 0.2}s forwards` : 'none'
                    }}
                  >
                    <h3 className="font-bold text-xl">{edu.degree}</h3>
                    <p className="text-primary">{edu.school}</p>
                    <p className="text-sm text-muted-foreground">{edu.period}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-8">Certifications</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "AWS Solutions Architect",
                    year: "2023"
                  },
                  {
                    name: "Google Cloud Professional",
                    year: "2022"
                  }
                ].map((cert, index) => (
                  <Card 
                    key={index} 
                    className={`
                      p-6 hover:shadow-lg transition-all transform opacity-0
                      ${educationVisible ? 'animate-[slideInLeft_0.5s_ease-out_forwards]' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      animation: educationVisible ? `slideInLeft 0.5s ease-out ${index * 0.2}s forwards` : 'none'
                    }}
                  >
                    <h3 className="font-bold text-xl">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.year}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Contact Me</h2>
          <Card className="max-w-2xl mx-auto p-6">
            <form className="space-y-4">
              <div>
                <Input placeholder="Your Name" />
              </div>
              <div>
                <Input type="email" placeholder="Your Email" />
              </div>
              <div>
                <Textarea placeholder="Your Message" className="min-h-[150px]" />
              </div>
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Chatbot */}
      <div className={`fixed bottom-4 left-4 z-50 ${chatOpen ? 'w-80' : 'w-auto'}`}>
        {chatOpen ? (
          <Card className="h-[500px] flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-primary/5">
              <h3 className="font-semibold">Chat with me</h3>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        msg.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <form onSubmit={handleChatSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  disabled={isTyping}
                />
                <Button type="submit" disabled={isTyping}>Send</Button>
              </div>
            </form>
          </Card>
        ) : (
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </main>
  );
}