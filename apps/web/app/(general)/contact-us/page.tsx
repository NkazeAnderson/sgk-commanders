"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Twitter
} from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Form submitted:", data)
      form.reset()
      alert("Thank you for your message! We'll get back to you soon.")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqItems = [
    {
      id: "faq-1",
      question: "What are your business hours?",
      answer:
        "We operate Monday to Friday, 9:00 AM to 6:00 PM. Our team is available for urgent inquiries via email or phone on weekends.",
    },
    {
      id: "faq-2",
      question: "How quickly will you respond to my inquiry?",
      answer:
        "We typically respond to all inquiries within 24-48 business hours. For urgent matters, please call us directly or mark your message as urgent.",
    },
    {
      id: "faq-3",
      question: "Do you offer support in multiple languages?",
      answer:
        "Yes, we provide support in English and French. Please indicate your preferred language when contacting us.",
    },
    {
      id: "faq-4",
      question: "Can I schedule a meeting with your team?",
      answer:
        "Absolutely! You can use our contact form to request a meeting or call us directly to schedule an appointment at your convenience.",
    },
    {
      id: "faq-5",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, bank transfers, and PayPal. Please contact us for specific payment arrangements.",
    },
  ]

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com",
      color: "hover:text-blue-700",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      color: "hover:text-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-950 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Get in Touch</h1>
          <p className="text-lg text-blue-200">
            Have questions or feedback? We'd love to hear from you. Reach out
            using the form below or through any of our contact methods.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-blue-800 bg-blue-900/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="border-blue-700 bg-blue-800/50 text-white placeholder:text-blue-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              className="border-blue-700 bg-blue-800/50 text-white placeholder:text-blue-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What is this about?"
                              className="border-blue-700 bg-blue-800/50 text-white placeholder:text-blue-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your inquiry..."
                              rows={6}
                              className="border-blue-700 bg-blue-800/50 text-white placeholder:text-blue-300"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-blue-950 hover:bg-blue-50"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-blue-800 bg-blue-900/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-6 w-6 flex-shrink-0 text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href="mailto:info@sdgcommanders.com"
                      className="text-blue-200 hover:text-white"
                    >
                      info@sdgcommanders.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-6 w-6 flex-shrink-0 text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a
                      href="tel:+1234567890"
                      className="text-blue-200 hover:text-white"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-blue-300" />
                  <div>
                    <p className="font-semibold text-white">Office</p>
                    <p className="text-blue-200">
                      123 Innovation Street
                      <br />
                      Tech City, TC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="border-blue-800 bg-blue-900/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Follow Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors ${social.color}`}
                        title={social.name}
                      >
                        <Icon className="h-6 w-6 text-blue-300" />
                      </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="border-blue-800 bg-blue-900/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Visit Our Office
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-lg bg-blue-800">
                <iframe
                  title="Office Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1896868282887!2d-74.00601592346927!3d40.71277407138899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3855555%3A0xfe3ff4abc8ec2da9!2s123%20Innovation%20St%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1234567890"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-blue-200">
              Find answers to common questions about our services and support
            </p>
          </div>

          <Card className="border-blue-800 bg-blue-900/50 shadow-lg">
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="border-blue-700">
                    <AccordionTrigger className="text-white hover:text-blue-200">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-100">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}