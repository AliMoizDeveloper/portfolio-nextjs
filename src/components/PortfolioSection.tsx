"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Smartphone, Tablet } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface Project {
  id: string
  title: string
  description: string
  fullDescription: string
  platforms: ('iOS' | 'Android')[]
  screenshots: string[]
  appStoreLink?: string
  playStoreLink?: string
}

// Placeholder project data
const projects: Project[] = [
  {
    id: '1',
    title: 'Taskvare',
    description: 'TaskVare is a task and employee management app where employees can log hours, request different types of leaves, and track progress, while admins can assign projects, split tasks, and approve or reject completed work.',
    fullDescription: 'TaskVare is a productivity and workforce management app designed to help teams manage tasks, track hours, and streamline leave approvals. It allows employees to log their working hours, apply for different types of leaves, and stay aligned with project goals, while giving admins full control over task assignments and approvals.',
    platforms: ['iOS', 'Android'],
    screenshots: [
      '/projects/taskvare/screenshot1.jpeg',
      '/projects/taskvare/screenshot2.jpeg',
      '/projects/taskvare/screenshot3.jpeg',
      '/projects/taskvare/screenshot4.jpeg',
      '/projects/taskvare/screenshot5.jpeg',
      '/projects/taskvare/screenshot6.jpeg',
      '/projects/taskvare/screenshot7.jpeg',
      '/projects/taskvare/screenshot8.jpeg',
      '/projects/taskvare/screenshot9.jpeg',
    ],
    // appStoreLink: 'https://apps.apple.com',
    // playStoreLink: 'https://play.google.com'
  },
  {
    id: '2',
    title: 'StackUp',
    description: 'StackUp is a savings and financial tracking app that lets users set goals, link bank accounts, add payment details, and monitor progress with real-time stats and charts.',
    fullDescription: 'StackUp is a financial management app that empowers users to set personal savings goals, link their bank accounts, and track progress seamlessly. The app makes it easy to create goals such as travel funds, emergency savings, or big purchases while providing a clear visual dashboard to monitor progress.',
    platforms: ['iOS','Android'],
    screenshots: [
      '/projects/stackup/screenshot1.jpeg',
      '/projects/stackup/screenshot2.jpeg',
      '/projects/stackup/screenshot3.jpeg',
      '/projects/stackup/screenshot4.jpeg',
      '/projects/stackup/screenshot5.jpeg',
      '/projects/stackup/screenshot6.jpeg',
    ],
    // appStoreLink: 'https://apps.apple.com'
  },
  // {
  //   id: '3',
  //   title: 'Raheeb App',
  //   description: 'Comprehensive fitness tracking with detailed analytics and personalized workout plans.',
  //   fullDescription: 'FitTrack Analytics revolutionizes fitness tracking by providing in-depth analysis of your workouts, nutrition, and recovery. The app features advanced metrics visualization, AI-powered workout recommendations, integration with popular fitness devices, and social challenges to keep you motivated. Whether you\'re a beginner or professional athlete, FitTrack adapts to your fitness level and goals.',
  //   platforms: ['iOS','Android'],
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=800&fit=crop',
  //     'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=800&fit=crop',
  //     'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=800&fit=crop'
  //   ],
  //   // playStoreLink: 'https://play.google.com'
  // },
  // {
  //   id: '4',
  //   title: 'Halal Networks App',
  //   description: 'Smart recipe discovery with meal planning and grocery list automation.',
  //   fullDescription: 'Recipe Compass makes meal planning effortless with intelligent recipe recommendations based on your dietary preferences, available ingredients, and cooking skill level. The app features step-by-step cooking instructions, automatic grocery list generation, nutritional analysis, and the ability to save and share your favorite recipes. Connect with a community of food enthusiasts and discover new culinary adventures.',
  //   platforms: ['iOS', 'Android'],
  //   screenshots: [
  //     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=800&fit=crop',
  //     'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=800&fit=crop'
  //   ],

  // },
    {
    id: '3',
    title: 'Foldz',
    description: 'A cross-platform laundry booking app built with Flutter, featuring real-time order tracking, secure payments, and push notifications for seamless user experience',
    fullDescription: 'Foldz Laundry App is a modern mobile application designed to simplify laundry services for users. It allows customers to schedule pickups, track their orders in real-time, make secure payments, and receive notifications when their laundry is ready.',
    platforms: ['iOS', 'Android'],
    screenshots: [
      '/projects/foldz/screenshot7.jpeg',
      '/projects/foldz/screenshot2.jpeg',
      '/projects/foldz/screenshot3.jpeg',
      '/projects/foldz/screenshot4.jpeg',
      '/projects/foldz/screenshot5.jpeg',
      '/projects/foldz/screenshot6.jpeg',
      '/projects/foldz/screenshot1.jpeg'
    ],
  },
      {
    id: '4',
    title: 'Sac Pk',
    description: 'A simple e-commerce app with cart management (add/remove), abandoned cart recovery, secure payment gateway, and Shopify integration for product sync and order tracking.',
    fullDescription: 'I developed SACPK, a simple yet powerful e-commerce mobile application designed for a smooth shopping experience. \n 🛒 Cart Management – Add, remove, and manage products in the cart with real-time updates. \n 🔄 Abandoned Cart Handling – Reminds users of products left in their cart to boost conversions. \n 💳 Payment Gateway Integration – Secure online payments integrated directly into the app. \n 🔗 Shopify Integration – Connected with Shopify portal for seamless product sync, inventory management, and order tracking. \n 📱 Mobile-first UI – Built with Flutter for cross-platform support and responsive design.',
    platforms: ['iOS', 'Android'],
    screenshots: [
      '/projects/sacpk/screenshot2.jpeg',
      '/projects/sacpk/screenshot3.jpeg',
      '/projects/sacpk/screenshot4.jpeg',
      '/projects/sacpk/screenshot5.jpeg',
      '/projects/sacpk/screenshot6.jpeg',
      '/projects/sacpk/screenshot7.jpeg'
    ],
    appStoreLink: 'https://apps.apple.com',
    playStoreLink: 'https://play.google.com'
  },
]

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({})

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'ArrowLeft') {
      prevImage()
    }
  }

  const handleImageError = (src: string) => {
    setImageError(prev => ({ ...prev, [src]: true }))
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="p-2 pb-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-card-foreground truncate">{project.title}</h3>
          <div className="flex gap-1 ml-2 flex-shrink-0">
            {project.platforms.map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs">
                {platform === 'iOS' ? (
                  <Smartphone className="w-3 h-3" />
                ) : (
                  <Tablet className="w-3 h-3" />
                )}
                <span className="ml-1">{platform}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Screenshot Display */}
      <div className="relative aspect-[9/16] bg-muted mx-4 rounded-md overflow-hidden">
        {project.screenshots.length > 0 && (
          <>
            <div
              className="relative w-full h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              tabIndex={project.screenshots.length > 1 ? 0 : -1}
              onKeyDown={handleKeyDown}
              role={project.screenshots.length > 1 ? "region" : undefined}
              aria-label={project.screenshots.length > 1 ? `Screenshot carousel for ${project.title}, image ${currentImageIndex + 1} of ${project.screenshots.length}` : undefined}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  {!imageError[project.screenshots[currentImageIndex]] ? (
                    <Image
                      src={project.screenshots[currentImageIndex]}
                      alt={`Screenshot ${currentImageIndex + 1} of ${project.title}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() => handleImageError(project.screenshots[currentImageIndex])}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Smartphone className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {project.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {project.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-1 focus:ring-white ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to screenshot ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <div className="p-4 pt-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 flex-wrap">
          {/* <Button
            variant="outline"
            size="sm"
            disabled={!project.appStoreLink}
            onClick={() => project.appStoreLink && window.open(project.appStoreLink, '_blank')}
            aria-label={`View ${project.title} on App Store`}
            className="flex-1 min-w-0"
          >
            <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">App Store</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={!project.playStoreLink}
            onClick={() => project.playStoreLink && window.open(project.playStoreLink, '_blank')}
            aria-label={`View ${project.title} on Play Store`}
            className="flex-1 min-w-0"
          >
            <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">Play Store</span>
          </Button> */}
        </div>

        {/* Details Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mt-2">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {project.title}
                <div className="flex gap-1">
                  {project.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="text-xs">
                      {platform === 'iOS' ? (
                        <Smartphone className="w-3 h-3" />
                      ) : (
                        <Tablet className="w-3 h-3" />
                      )}
                      <span className="ml-1">{platform}</span>
                    </Badge>
                  ))}
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-semibold mb-2">Screenshots</h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative aspect-[9/16] bg-muted rounded-md overflow-hidden">
                      {!imageError[screenshot] ? (
                        <Image
                          src={screenshot}
                          alt={`Screenshot ${index + 1} of ${project.title}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 25vw"
                          onError={() => handleImageError(screenshot)}
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Smartphone className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.fullDescription}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {/* <Button
                    variant="default"
                    disabled={!project.appStoreLink}
                    onClick={() => project.appStoreLink && window.open(project.appStoreLink, '_blank')}
                    aria-label={`Download ${project.title} from App Store`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    App Store
                  </Button>
                  <Button
                    variant="default"
                    disabled={!project.playStoreLink}
                    onClick={() => project.playStoreLink && window.open(project.playStoreLink, '_blank')}
                    aria-label={`Download ${project.title} from Play Store`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Play Store
                  </Button> */}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  )
}

interface PortfolioSectionProps {
  className?: string
}

export default function PortfolioSection({ className = '' }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'All'>('All')

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'All') return true
    return project.platforms.includes(activeFilter)
  })

  return (
    <section className={`py-09 ${className}`}>
      <div className="container mx- px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my mobile app projects featuring innovative design and cutting-edge functionality across iOS and Android platforms.
          </p>
        </div>

        <div>
          <div className="text-center mb-4">
            <h1 className="text-lg bold capitalize">
              All Projects
            </h1>
          </div>
        </div>

        {/* Filter Controls */}
        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as typeof activeFilter)} className="mb-12">
        
            {/* <TabsTrigger value="iOS">iOS</TabsTrigger>
            <TabsTrigger value="Android">Android</TabsTrigger> */}
         
          
          <TabsContent value="All" className="mt-8">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Smartphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
                <p className="text-muted-foreground">No projects match the current filter. Try selecting a different platform.</p>
              </div>
            )}
          </TabsContent>
          
          {/* <TabsContent value="iOS" className="mt-8">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Smartphone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No iOS Projects</h3>
                <p className="text-muted-foreground">No iOS projects available at the moment. Check back soon for updates!</p>
              </div>
            )}
          </TabsContent> */}
          
          {/* <TabsContent value="Android" className="mt-8">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Tablet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Android Projects</h3>
                <p className="text-muted-foreground">No Android projects available at the moment. Check back soon for updates!</p>
              </div>
            )}
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  )
}