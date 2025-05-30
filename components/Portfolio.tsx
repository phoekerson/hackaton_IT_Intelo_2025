import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Phone, Globe, Plus, Trash2, Edit3, Eye, Code2, Sparkles, Rocket, Star, Heart } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  tech: string[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface PortfolioData {
  fullName: string;
  bio: string;
  skills: string[];
  projects: Project[];
  socialLinks: SocialLink[];
  email: string;
  phone: string;
}

const DynamicPortfolio = () => {
  const [isFormMode, setIsFormMode] = useState(true);
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentProject, setCurrentProject] = useState({ name: '', description: '', link: '', tech: [] });
  const [currentTech, setCurrentTech] = useState('');
  const [editingProject, setEditingProject] = useState<string | null>(null);
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    fullName: '',
    bio: '',
    skills: [],
    projects: [],
    socialLinks: [
      { platform: 'GitHub', url: '', icon: <Github className="w-4 h-4" /> },
      { platform: 'LinkedIn', url: '', icon: <Linkedin className="w-4 h-4" /> },
      { platform: 'Portfolio', url: '', icon: <Globe className="w-4 h-4" /> }
    ],
    email: '',
    phone: ''
  });

  const portfolioRef = useRef(null);
  const isInView = useInView(portfolioRef, { once: true, amount: 0.3 });

  const addSkill = () => {
    if (currentSkill.trim() && !portfolioData.skills.includes(currentSkill.trim())) {
      setPortfolioData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setPortfolioData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addTechToProject = () => {
    const trimmedTech = currentTech.trim();
    
    if (trimmedTech && !currentProject.tech.includes(trimmedTech)) {
      setCurrentProject(prev => ({
        ...prev,
        tech: [...prev.tech, trimmedTech]
      }));
      setCurrentTech('');
    }
  };

  const removeTechFromProject = (techToRemove: string) => {
    setCurrentProject(prev => ({
      ...prev,
      tech: prev.tech.filter(tech => tech !== techToRemove)
    }));
  };

  const addProject = () => {
    if (currentProject.name.trim() && currentProject.description.trim()) {
      const newProject = {
        ...currentProject,
        id: editingProject || Date.now().toString()
      };
      
      if (editingProject) {
        setPortfolioData(prev => ({
          ...prev,
          projects: prev.projects.map(p => p.id === editingProject ? newProject : p)
        }));
        setEditingProject(null);
      } else {
        setPortfolioData(prev => ({
          ...prev,
          projects: [...prev.projects, newProject]
        }));
      }
      
      setCurrentProject({ name: '', description: '', link: '', tech: [] });
    }
  };

  const editProject = (project: Project) => {
    setCurrentProject(project);
    setEditingProject(project.id);
  };

  const removeProject = (projectId: string) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const updateSocialLink = (platform: string, url: string) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(link => 
        link.platform === platform ? { ...link, url } : link
      )
    }));
  };

  const resetPortfolio = () => {
    setPortfolioData({
      fullName: '',
      bio: '',
      skills: [],
      projects: [],
      socialLinks: [
        { platform: 'GitHub', url: '', icon: <Github className="w-4 h-4" /> },
        { platform: 'LinkedIn', url: '', icon: <Linkedin className="w-4 h-4" /> },
        { platform: 'Portfolio', url: '', icon: <Globe className="w-4 h-4" /> }
      ],
      email: '',
      phone: ''
    });
    setCurrentProject({ name: '', description: '', link: '', tech: [] });
    setCurrentSkill('');
    setCurrentTech('');
    setEditingProject(null);
    setIsFormMode(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20],
      rotate: [-5, 5],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.6)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with Toggle */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-8"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            Portfolio Dynamique
          </motion.h1>
          
          <motion.div 
            className="flex justify-center gap-4 mb-6"
            variants={floatingVariants}
            animate="animate"
          >
            <Button
              onClick={() => setIsFormMode(true)}
              variant={isFormMode ? "default" : "outline"}
              size="lg"
              className="relative overflow-hidden group"
            >
              <Edit3 className="w-5 h-5 mr-2" />
              Éditer
            </Button>
            
            <Button
              onClick={() => setIsFormMode(false)}
              variant={!isFormMode ? "default" : "outline"}
              size="lg"
              className="relative overflow-hidden group"
            >
              <Eye className="w-5 h-5 mr-2" />
              Aperçu
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isFormMode ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Informations personnelles */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        Informations personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">Nom complet</label>
                        <Input
                          value={portfolioData.fullName}
                          onChange={(e) => setPortfolioData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="John Doe"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                      
                      <div>
                        <label className="text-white/80 text-sm mb-2 block">Biographie</label>
                        <Textarea
                          value={portfolioData.bio}
                          onChange={(e) => setPortfolioData(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Développeur passionné..."
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-white/80 text-sm mb-2 block">Email</label>
                          <Input
                            value={portfolioData.email}
                            onChange={(e) => setPortfolioData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="john@example.com"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        <div>
                          <label className="text-white/80 text-sm mb-2 block">Téléphone</label>
                          <Input
                            value={portfolioData.phone}
                            onChange={(e) => setPortfolioData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+33 1 23 45 67 89"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Compétences */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Code2 className="w-6 h-6 text-green-400" />
                        Compétences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={currentSkill}
                          onChange={(e) => setCurrentSkill(e.target.value)}
                          placeholder="Nouvelle compétence"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                        />
                        <Button onClick={addSkill} size="sm" className="shrink-0">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {portfolioData.skills.map((skill) => (
                            <motion.div
                              key={skill}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white cursor-pointer hover:from-blue-600 hover:to-purple-600 transition-all"
                                onClick={() => removeSkill(skill)}
                              >
                                {skill} ×
                              </Badge>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Liens sociaux */}
                <motion.div variants={itemVariants}>
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Heart className="w-6 h-6 text-pink-400" />
                        Liens sociaux
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {portfolioData.socialLinks.map((link) => (
                        <div key={link.platform} className="flex items-center gap-3">
                          <div className="text-white">{link.icon}</div>
                          <Input
                            value={link.url}
                            onChange={(e) => updateSocialLink(link.platform, e.target.value)}
                            placeholder={`URL ${link.platform}`}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Projets */}
                <motion.div variants={itemVariants} className="lg:col-span-1">
                  <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Rocket className="w-6 h-6 text-orange-400" />
                        Projets
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <Input
                          value={currentProject.name}
                          onChange={(e) => setCurrentProject(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Nom du projet"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        
                        <Textarea
                          value={currentProject.description}
                          onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Description du projet"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        
                        <Input
                          value={currentProject.link}
                          onChange={(e) => setCurrentProject(prev => ({ ...prev, link: e.target.value }))}
                          placeholder="Lien GitHub/Démo"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />

                        <div className="flex gap-2">
                          <Input
                            value={currentTech}
                            onChange={(e) => setCurrentTech(e.target.value)}
                            placeholder="Technologie"
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                addTechToProject();
                              }
                            }}
                          />
                          <Button onClick={addTechToProject} size="sm" className="shrink-0">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {currentProject.tech.map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="outline" 
                              className="text-white border-white/40 cursor-pointer hover:bg-white/10"
                              onClick={() => removeTechFromProject(tech)}
                            >
                              {tech} ×
                            </Badge>
                          ))}
                        </div>
                        
                        <Button onClick={addProject} className="w-full">
                          {editingProject ? 'Modifier' : 'Ajouter'} le projet
                        </Button>
                      </div>

                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        <AnimatePresence>
                          {portfolioData.projects.map((project) => (
                            <motion.div
                              key={project.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="p-3 bg-white/5 rounded-lg border border-white/10"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="text-white font-medium">{project.name}</h4>
                                  <p className="text-white/70 text-sm">{project.description}</p>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {project.tech.map((tech) => (
                                      <Badge key={tech} variant="outline" className="text-xs text-white/60 border-white/30">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-1 ml-2">
                                  <Button size="sm" variant="ghost" onClick={() => editProject(project)}>
                                    <Edit3 className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => removeProject(project.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="portfolio"
              ref={portfolioRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Hero Section */}
              <motion.section
                variants={glowVariants}
                animate="animate"
                className="text-center mb-16 p-8 rounded-3xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-lg border border-white/20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-4xl font-bold text-white">
                    {portfolioData.fullName ? 
                      portfolioData.fullName.split(' ').map(name => name[0]).join('').toUpperCase() : 
                      'JD'
                    }
                  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-4"
                >
                  {portfolioData.fullName || 'Votre Nom'}
                </motion.h1>
                
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
                >
                  {portfolioData.bio || 'Votre biographie apparaîtra ici...'}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-center gap-4 flex-wrap"
                >
                  {portfolioData.email && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`mailto:${portfolioData.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      {portfolioData.email}
                    </motion.a>
                  )}
                  
                  {portfolioData.phone && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`tel:${portfolioData.phone}`}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      {portfolioData.phone}
                    </motion.a>
                  )}
                  
                  {portfolioData.socialLinks.filter(link => link.url).map((link) => (
                    <motion.a
                      key={link.platform}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 text-white hover:bg-white/20 transition-all"
                    >
                      {link.icon}
                      {link.platform}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.section>

              {/* Compétences */}
              {portfolioData.skills.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="mb-16"
                >
                  <motion.h2
                    className="text-3xl font-bold text-white mb-8 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star className="inline w-8 h-8 mr-2 text-yellow-400" />
                    Compétences
                  </motion.h2>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-wrap justify-center gap-4"
                  >
                    {portfolioData.skills.map((skill) => (
                      <motion.div
                        key={skill}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium shadow-lg"
                      >
                        {skill}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              )}

              {/* Projets */}
              {portfolioData.projects.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="mb-16"
                >
                  <motion.h2
                    className="text-3xl font-bold text-white mb-8 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Rocket className="inline w-8 h-8 mr-2 text-orange-400" />
                    Mes Projets
                  </motion.h2>
                  
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {portfolioData.projects.map((project) => (
                      <motion.div
                        key={project.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 shadow-2xl"
                      >
                        <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
                        <p className="text-white/80 mb-4">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-white/70 border-white/30">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        {project.link && (
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Globe className="w-4 h-4" />
                            Voir le projet
                          </motion.a>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.section>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DynamicPortfolio;
