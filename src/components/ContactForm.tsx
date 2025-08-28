"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"
import { toast } from "sonner"
import emailjs from "emailjs-com";

interface FormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => void | Promise<void>
  className?: string
}

export default function ContactForm({ onSubmit, className }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: ""
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  const nameInputRef = useRef<HTMLInputElement>(null)
  const successMessageRef = useRef<HTMLDivElement>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    return newErrors
  }

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
      setShowSuccess(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check honeypot field for spam protection
    if (formData.honeypot) {
      return // Silent fail for bots
    }

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0]
      toast.error(`Validation Error: ${firstError}`)
      return
    }

    setIsSubmitting(true)

    try {
      // Call optional onSubmit prop if provided
      if (onSubmit) {
        await onSubmit(formData)
      }

      // Simulate successful submission
      // TODO: Replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Clear form and show success
      setFormData({
        name: "",
        email: "",
        message: "",
        honeypot: ""
      })
      
      setShowSuccess(true)
      toast.success("Message sent — I'll get back to you soon.")

      // Focus management for accessibility
      setTimeout(() => {
        successMessageRef.current?.focus()
      }, 100)

    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTryAgain = () => {
    setShowSuccess(false)
    nameInputRef.current?.focus()
  }

const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const res = await fetch("api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (res.ok) {
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } else {
      console.error(await res.json());
      alert("❌ Failed to send message");
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <Card className={`w-full max-w-md mx-auto bg-card ${className}`}>
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-semibold">Get in Touch</CardTitle>
        <CardDescription className="text-muted-foreground">
          Send me a message and I'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {showSuccess ? (
          <div 
            ref={successMessageRef}
            tabIndex={-1}
            className="text-center space-y-4 py-8"
            role="status"
            aria-live="polite"
          >
            <div className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleTryAgain}
              className="mt-4"
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-6" noValidate>
            {/* Honeypot field for spam protection */}
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={handleInputChange("honeypot")}
              style={{ position: "absolute", left: "-9999px" }}
              tabIndex={-1}
              aria-hidden="true"
            />

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name *
              </Label>
              <Input
                ref={nameInputRef}
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleInputChange("name")}
                className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                aria-describedby={errors.name ? "name-error" : undefined}
                aria-invalid={!!errors.name}
                required
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange("email")}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project or just say hello..."
                value={formData.message}
                onChange={handleInputChange("message")}
                className={`min-h-[120px] resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                aria-describedby={errors.message ? "message-error" : undefined}
                aria-invalid={!!errors.message}
                required
              />
              {errors.message && (
                <p id="message-error" className="text-sm text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              disabled={isSubmitting}
              onClick={() => { setShowSuccess(false) }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}