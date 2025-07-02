"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Star,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const colors = {
  Technology: "bg-blue-100 text-blue-800",
  Health: "bg-green-100 text-green-800",
  Finance: "bg-yellow-100 text-yellow-800",
  Education: "bg-purple-100 text-purple-800",
  Sports: "bg-red-100 text-red-800",
  Music: "bg-pink-100 text-pink-800",
  Art: "bg-orange-100 text-orange-800",
  Food: "bg-teal-100 text-teal-800",
  Travel: "bg-indigo-100 text-indigo-800",
  Other: "bg-gray-100 text-gray-800",
};

export default function EventContent() {
  const { slug } = useParams<{ slug: string }>();

  const trpc = useTRPC();
  const { data: event } = useSuspenseQuery(
    trpc.events.getBySlug.queryOptions({ slug })
  );
  const attendees = [
    {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Frontend Developer",
    },
    {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Full-Stack Developer",
    },
    {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "React Developer",
    },
    {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "UI/UX Developer",
    },
    {
      name: "Alex Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Software Engineer",
    },
  ];

  const venue = {
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
  };
  const requirements = [
    "Interest in startups and entrepreneurship",
    "Business cards for networking (recommended)",
  ];

  const tags = [
    "React",
    "Next.js",
    "JavaScript",
    "Web Development",
    "Networking",
  ];

  const organizer = {
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Serial entrepreneur and startup mentor with 15+ years of experience in building and scaling businesses.",
    company: "Venture Partners Inc.",
    email: "michael@venturepartners.com",
    rating: 4.8,
    eventsOrganized: 8,
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 relative">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40" />
          <div className="absolute bottom-6 left-6">
            <Badge
              className={`mb-4 ${
                colors[event.categoryName as keyof typeof colors]
              }`}
            >
              {event.categoryName}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {event.title}
            </h1>
            <div className="flex items-center text-white/90 space-x-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {event.startTime} - {event.endTime}
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Event Details
                </h2>
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
                <TabsTrigger value="attendees">
                  {/* todo: get attendees */}
                  Attendees ({10})
                </TabsTrigger>
                <TabsTrigger value="venue">Venue</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="attendees" className="mt-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Who s Coming
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* todo gat attendees */}
                      {attendees.map((attendee, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700"
                        >
                          <Avatar>
                            <AvatarImage
                              src={attendee.avatar || "/placeholder.svg"}
                              alt={attendee.name}
                            />
                            <AvatarFallback>
                              {attendee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {attendee.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {attendee.role}
                            </p>
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Venue Information
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {venue.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {venue.description}
                      </p>

                      <div className="flex items-start space-x-2 mb-4">
                        <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {event.location}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {event.location}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                          Amenities
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {venue.amenities.map((amenity, index) => (
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      What You Need
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {requirement}
                          </span>
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
                    {event.price}
                  </div>
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
                    <Users className="h-5 w-5 mr-2" />
                    {45} / {event.maxMembers} spots filled
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      style={{
                        width: `${(45 / event.maxMembers) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <Button
                  className={`w-full mb-4 ${
                    // update to chick the user if joined
                    true
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  }`}
                  //   onClick={() => setIsJoined(!isJoined)}
                >
                  {/* {isJoined ? "Cancel RSVP" : "Join Event"} */}
                  {true ? "Cancel RSVP" : "Join Event"}
                </Button>

                <Separator className="my-4" />

                {/* Event Quick Info */}
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-5 w-5 mr-3 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        {event.startTime} - {event.endTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5 mr-3 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {event.location}
                      </p>
                      <p className="text-sm">{event.location}</p>
                    </div>
                  </div>

                  {event.price !== 0 && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-5 w-5 mr-3 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Price
                        </p>
                        <p className="text-sm">{event.price}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Organized by
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={organizer.avatar || "/placeholder.svg"}
                      alt={organizer.name}
                    />
                    <AvatarFallback>
                      {organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {organizer.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {organizer.company}
                    </p>

                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                        {organizer.rating} ({organizer.eventsOrganized} events)
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {organizer.bio}
                    </p>

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
  );
}
