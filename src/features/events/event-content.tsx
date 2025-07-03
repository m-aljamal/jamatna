"use client";

import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Calendar,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  MessageCircle,
  Reply,
  Send,
  Star,
  ThumbsUp,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

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


  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Frontend Developer",
      },
      content:
        "This looks like an amazing event! I'm really excited about the Next.js 14 updates session. Has anyone attended similar meetups by this organizer before?",
      timestamp: "2024-02-10T14:30:00Z",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 2,
          user: {
            name: "Sarah Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Event Organizer",
          },
          content:
            "Hi Alex! Thanks for your interest. This is our 5th meetup this year and we always focus on practical, hands-on content. Looking forward to seeing you there!",
          timestamp: "2024-02-10T15:45:00Z",
          likes: 8,
          isLiked: false,
          isOrganizer: true,
        },
      ],
    },
    {
      id: 3,
      user: {
        name: "Maria Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Full Stack Developer",
      },
      content: "Quick question - will there be parking available at the venue? I'm driving from the suburbs.",
      timestamp: "2024-02-11T09:15:00Z",
      likes: 5,
      isLiked: true,
      replies: [
        {
          id: 4,
          user: {
            name: "David Kim",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Attendee",
          },
          content: "There's a parking garage right next to the building. It's about $10 for the evening.",
          timestamp: "2024-02-11T10:20:00Z",
          likes: 3,
          isLiked: false,
        },
      ],
    },
    {
      id: 5,
      user: {
        name: "Jennifer Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "UI/UX Designer",
      },
      content: "Love the focus on performance optimization! Will the slides be shared after the event?",
      timestamp: "2024-02-12T16:20:00Z",
      likes: 7,
      isLiked: false,
      replies: [],
    },
  ])


  const handleLikeComment = (commentId: number, isReply = false, parentId?: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (!isReply && comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        } else if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  }
                : reply,
            ),
          }
        }
        return comment
      }),
    )
  }

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyContent, setReplyContent] = useState("")


  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Attendee",
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [],
    }

    setComments((prev) => [comment, ...prev])
    setNewComment("")
  }

  const handleAddReply = (parentId: number) => {
    if (!replyContent.trim()) return

    const reply = {
      id: Date.now(),
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Attendee",
      },
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false,
    }

    setComments((prev) =>
      prev.map((comment) => (comment.id === parentId ? { ...comment, replies: [...comment.replies, reply] } : comment)),
    )

    setReplyingTo(null)
    setReplyContent("")
  }

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
                <TabsTrigger value="discussion">Discussion ({comments.length})</TabsTrigger>
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

              <TabsContent value="discussion" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2 text-emerald-600" />
                        Discussion ({comments.length})
                      </h3>
                      <Select defaultValue="newest">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                          <SelectItem value="popular">Most Liked</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Comment Form */}
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Share your thoughts about this event..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[80px] resize-none border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {newComment.length}/500 characters
                            </span>
                            <Button
                              size="sm"
                              disabled={!newComment.trim()}
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                              onClick={() => {
                                // Add comment logic here
                                handleAddComment()
                              }}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="space-y-4">
                          {/* Main Comment */}
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                              <AvatarFallback>
                                {comment.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{comment.user.name}</h4>
                                    {comment.user.isOrganizer && (
                                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs">
                                        Organizer
                                      </Badge>
                                    )}
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {comment.user.role}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(comment.timestamp).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.content}</p>
                                <div className="flex items-center space-x-4">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`h-8 px-3 ${comment.isLiked ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "text-gray-500"}`}
                                    onClick={() => {
                                      handleLikeComment(comment.id)
                                    }}
                                  >
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {comment.likes}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-3 text-gray-500 hover:text-emerald-600"
                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                  >
                                    <Reply className="h-4 w-4 mr-1" />
                                    Reply
                                  </Button>
                                </div>
                              </div>

                              {/* Reply Form */}
                              {replyingTo === comment.id && (
                                <div className="mt-3 ml-4">
                                  <div className="flex items-start space-x-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                                      <AvatarFallback>You</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <Textarea
                                        placeholder={`Reply to ${comment.user.name}...`}
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="min-h-[60px] resize-none text-sm"
                                      />
                                      <div className="flex justify-end space-x-2 mt-2">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            setReplyingTo(null)
                                            setReplyContent("")
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          size="sm"
                                          disabled={!replyContent.trim()}
                                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                          onClick={() => {
                                            handleAddReply(comment.id)
                                          }}
                                        >
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="mt-4 ml-4 space-y-3">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start space-x-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage
                                          src={reply.user.avatar || "/placeholder.svg"}
                                          alt={reply.user.name}
                                        />
                                        <AvatarFallback>
                                          {reply.user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1 min-w-0">
                                        <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                                          <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center space-x-2">
                                              <h5 className="font-medium text-gray-900 dark:text-white text-sm">
                                                {reply.user.name}
                                              </h5>
                                              {reply.isOrganizer && (
                                                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-xs">
                                                  Organizer
                                                </Badge>
                                              )}
                                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {reply.user.role}
                                              </span>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                              {new Date(reply.timestamp).toLocaleDateString()}
                                            </span>
                                          </div>
                                          <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                                            {reply.content}
                                          </p>
                                          <div className="flex items-center space-x-3">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className={`h-6 px-2 text-xs ${reply.isLiked ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" : "text-gray-500"}`}
                                              onClick={() => {
                                                handleLikeComment(reply.id, true, comment.id)
                                              }}
                                            >
                                              <ThumbsUp className="h-3 w-3 mr-1" />
                                              {reply.likes}
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Load More Comments */}
                    <div className="text-center pt-4">
                      <Button variant="outline" className="bg-transparent">
                        Load More Comments
                      </Button>
                    </div>
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
