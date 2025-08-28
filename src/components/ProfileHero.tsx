"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

interface ProfileHeroProps {
  className?: string
}

export default function ProfileHero({ className }: ProfileHeroProps) {
  const [imageError, setImageError] = useState(false)

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

    const handleDownload = () => {
    // Replace with your actual file path or URL
    const fileUrl = "/Muhammad_Ali_Moiz_Resume.pdf"
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "Muhammad_Ali_Moiz_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      <Card className="w-full bg-card shadow-sm border border-border rounded-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Avatar Section */}
            <motion.div 
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-accent/20 ring-offset-4 ring-offset-card">
                  {!imageError && (
                    <AvatarImage 
                      src="/profile-image.jpeg" 
                      alt="Muhammad Ali Moiz"
                      onError={() => setImageError(true)}
                      loading="lazy"
                      className="object-cover"
                    />
                  )}
                  {/* <AvatarFallback className="text-2xl md:text-3xl font-semibold bg-primary/10 text-primary">
                    MAM
                  </AvatarFallback> */}
                </Avatar>
                {/* Status indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-card shadow-sm" />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="md:col-span-2 text-center md:text-left space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Name and Role */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Muhammad Ali Moiz
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  Mobile Application Developer — Flutter • 3 years
                </p>
              </div>

              {/* Description */}
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl">
                I am a Mobile Application Developer with 3 years of experience specializing in Flutter. 
                I have successfully developed and deployed 4 applications on the Apple App Store and Google Play Store.
              </p>

              {/* Info Badges */}
              <motion.div 
                className="flex flex-wrap gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                  Flutter
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                  3 yrs experience
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                  4 apps published
                </Badge>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Button 
                  size="lg" 
                  className="font-semibold px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => handleScrollTo("portfolio")}
                >
                  View Portfolio
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="font-semibold px-8 py-3 border-2 border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  onClick={() => handleScrollTo("contact")}
                >
                  Contact Me
                </Button>
                  <Button
                  variant="secondary"
                  size="lg"
                  className="font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={handleDownload}
                >
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}