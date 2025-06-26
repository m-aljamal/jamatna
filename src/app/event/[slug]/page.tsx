"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Heart,
  Share2,
  Clock,
  DollarSign,
  Star,
  User,
  Mail,
  Moon,
  Sun,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useTheme } from "next-themes"

const categories = [
  { id: "tech", name: "Technology", color: "bg-emerald-100 text-emerald-800" },
  { id: "business", name: "Business", color: "bg-orange-100 text-orange-800" },
  { id: "health", name: "Health & Wellness", color: "bg-rose-100 text-rose-800" },
  { id: "arts", name: "Arts & Culture", color: "bg-purple-100 text-purple-800" },
  { id: "sports", name: "Sports", color: "bg-cyan-100 text-cyan-800" },
  { id: "food", name: "Food & Drink", color: "bg-amber-100 text-amber-800" },
]

const events = [
  {
    id: 1,
    slug: "react-nextjs-developers-meetup",
    title: "React & Next.js Developers Meetup",
    description:
      "Join us for an evening of learning about the latest in React and Next.js development. We'll have talks from industry experts and networking opportunities.",
    fullDescription: `
      <h3>About This Event</h3>
      <p>Join us for an exciting evening dedicated to React and Next.js development! This meetup is perfect for developers of all levels who want to stay up-to-date with the latest trends and best practices in modern web development.</p>
      
      <h3>What to Expect</h3>
      <ul>
        <li>🎤 <strong>Expert Talks:</strong> Industry professionals will share insights on React 18 features, Next.js 14 updates, and performance optimization techniques</li>
        <li>🤝 <strong>Networking:</strong> Connect with fellow developers, share experiences, and build lasting professional relationships</li>
        <li>💻 <strong>Live Coding:</strong> Interactive coding sessions and Q&A with experienced developers</li>
        <li>🍕 <strong>Food & Drinks:</strong> Complimentary pizza and beverages will be provided</li>
      </ul>
      
      <h3>Schedule</h3>
      <ul>
        <li>6:00 PM - Registration & Networking</li>
        <li>6:30 PM - Welcome & Introductions</li>
        <li>7:00 PM - Main Presentation: "Building Scalable Apps with Next.js 14"</li>
        <li>8:00 PM - Lightning Talks & Community Showcase</li>
        <li>8:30 PM - Open Networking & Discussions</li>
        <li>9:30 PM - Event Wrap-up</li>
      </ul>
      
      <h3>What to Bring</h3>
      <p>Just bring yourself and your enthusiasm for learning! If you have a laptop, feel free to bring it for the interactive sessions, but it's not required.</p>
    `,
    image: "/placeholder.jpg",
    category: "tech",
    location: "Tech Hub, Downtown",
    fullAddress: "123 Innovation Street, Tech Hub Building, Floor 5, Downtown District",
    date: "2024-02-15",
    time: "18:00",
    endTime: "21:30",
    members: 45,
    maxMembers: 100,
    organizer: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Senior Full-Stack Developer with 8+ years of experience in React and Node.js. Passionate about building developer communities and sharing knowledge.",
      company: "TechCorp Solutions",
      email: "sarah.chen@techcorp.com",
      rating: 4.9,
      eventsOrganized: 12,
    },
    price: "Free",
    tags: ["React", "Next.js", "JavaScript", "Web Development", "Networking"],
    attendees: [
      { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40", role: "Frontend Developer" },
      { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40", role: "Full-Stack Developer" },
      { name: "Mike Johnson", avatar: "/placeholder.svg?height=40&width=40", role: "React Developer" },
      { name: "Emily Davis", avatar: "/placeholder.svg?height=40&width=40", role: "UI/UX Developer" },
      { name: "Alex Wilson", avatar: "/placeholder.svg?height=40&width=40", role: "Software Engineer" },
    ],
    requirements: [
      "Basic knowledge of JavaScript",
      "Familiarity with React concepts (helpful but not required)",
      "Laptop (optional for hands-on sessions)",
    ],
    venue: {
      name: "Tech Hub Downtown",
      description:
        "A modern co-working space with state-of-the-art facilities, high-speed internet, and comfortable seating for 150 people.",
      amenities: [
        "Free WiFi",
        "Parking Available",
        "Wheelchair Accessible",
        "Air Conditioning",
        "Projector & Sound System",
      ],
    },
  },
  {
    id: 2,
    slug: "startup-pitch-night",
    title: "Startup Pitch Night",
    description:
      "Watch innovative startups pitch their ideas to investors and fellow entrepreneurs. Great networking event for the business community.",
    fullDescription: `
      <h3>About This Event</h3>
      <p>Join us for an exciting evening where innovative startups will pitch their groundbreaking ideas to a panel of experienced investors and the entrepreneurial community.</p>
      
      <h3>Featured Startups</h3>
      <ul>
        <li>🚀 <strong>EcoTech Solutions:</strong> Sustainable technology for smart cities</li>
        <li>💡 <strong>HealthAI:</strong> AI-powered healthcare diagnostics</li>
        <li>🎓 <strong>EduConnect:</strong> Revolutionary online learning platform</li>
        <li>🛒 <strong>LocalMarket:</strong> Connecting local businesses with customers</li>
      </ul>
      
      <h3>What You'll Get</h3>
      <ul>
        <li>Insights into cutting-edge business ideas</li>
        <li>Networking with investors and entrepreneurs</li>
        <li>Q&A sessions with startup founders</li>
        <li>Complimentary refreshments and networking reception</li>
      </ul>
    `,
    image: "/placeholder.jpg",
    category: "business",
    location: "Innovation Center",
    fullAddress: "456 Business Avenue, Innovation Center, Suite 200",
    date: "2024-02-18",
    time: "19:00",
    endTime: "22:00",
    members: 32,
    maxMembers: 80,
    organizer: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Serial entrepreneur and startup mentor with 15+ years of experience in building and scaling businesses.",
      company: "Venture Partners Inc.",
      email: "michael@venturepartners.com",
      rating: 4.8,
      eventsOrganized: 8,
    },
    price: "$15",
    tags: ["Startups", "Entrepreneurship", "Investing", "Networking", "Business"],
    attendees: [
      { name: "Lisa Anderson", avatar: "/placeholder.svg?height=40&width=40", role: "Angel Investor" },
      { name: "Robert Kim", avatar: "/placeholder.svg?height=40&width=40", role: "Startup Founder" },
      { name: "Maria Garcia", avatar: "/placeholder.svg?height=40&width=40", role: "Business Consultant" },
    ],
    requirements: ["Interest in startups and entrepreneurship", "Business cards for networking (recommended)"],
    venue: {
      name: "Innovation Center",
      description: "A premier venue for business events with modern presentation facilities and networking spaces.",
      amenities: ["Valet Parking", "Full AV Setup", "Catering Kitchen", "Business Lounge", "High-Speed Internet"],
    },
  },
]

interface EventPageProps {
  params: Promise<{ slug: string }>
}

export default function EventPage({ params }: EventPageProps) {
  const { slug } = use(params)
  const [isJoined, setIsJoined] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { theme, setTheme } = useTheme()

  const event = events.find((e) => e.slug === slug)

  if (!event) {
    notFound()
  }

  const categoryInfo = categories.find((c) => c.id === event.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Events</span>
            </Link>

            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              Jamatna
            </Link>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-9 w-9 p-0"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500 border-red-200" : ""}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 relative">
          <Image src={"/placeholder.jpg"} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-6 left-6">
            <Badge className={`mb-4 ${categoryInfo?.color}`}>{categoryInfo?.name}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex items-center text-white/90 space-x-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {event.time} - {event.endTime}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Event Details</h2>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-lg max-w-none dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: event.fullDescription }}
                />
              </CardContent>
            </Card>

            {/* Tabs for additional info */}
            <Tabs defaultValue="attendees" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="attendees">Attendees ({event.attendees.length})</TabsTrigger>
                <TabsTrigger value="venue">Venue</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="attendees" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Who s Coming</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.attendees.map((attendee, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700"
                        >
                          <Avatar>
                            <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                            <AvatarFallback>
                              {attendee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{attendee.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{attendee.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="venue" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Venue Information</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{event.venue.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{event.venue.description}</p>

                      <div className="flex items-start space-x-2 mb-4">
                        <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                          <p className="text-gray-600 dark:text-gray-400">{event.fullAddress}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Amenities</h5>
                        <div className="flex flex-wrap gap-2">
                          {event.venue.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">What You Need</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {event.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* RSVP Card */}
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.price === "Free" ? "Free" : event.price}
                  </div>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
                    <Users className="h-5 w-5 mr-2" />
                    {event.members} / {event.maxMembers} spots filled
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      style={{ width: `${(event.members / event.maxMembers) * 100}%` }}
                    />
                  </div>
                </div>

                <Button
                  className={`w-full mb-4 ${
                    isJoined
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  }`}
                  onClick={() => setIsJoined(!isJoined)}
                >
                  {isJoined ? "Cancel RSVP" : "Join Event"}
                </Button>

                <Separator className="my-4" />

                {/* Event Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-5 w-5 mr-3 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        {event.time} - {event.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 mr-3 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                      <p className="text-sm">{event.fullAddress}</p>
                    </div>
                  </div>

                  {event.price !== "Free" && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-5 w-5 mr-3 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Price</p>
                        <p className="text-sm">{event.price}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Card */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Organized by</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                    <AvatarFallback>
                      {event.organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{event.organizer.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.organizer.company}</p>

                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {event.organizer.rating} ({event.organizer.eventsOrganized} events)
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{event.organizer.bio}</p>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
