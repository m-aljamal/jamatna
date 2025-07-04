import React from "react";
import { Card } from "./ui/card";
import { CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { Calendar, Heart, MapPin, Share2, Users } from "lucide-react";
import Link from "next/link";

export default function EventCard({
  event,
  categories,
}: {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    members: number;
    maxMembers: number;
    price: string;
    category: string;
    image?: string;
    slug: string;
    organizer: {
      name: string;
      avatar?: string;
    };
  };
  categories: { id: string; name: string; color?: string }[];
}) {
  return (
    <Link href={`/event/${event.slug}`} key={event.id} className="group">
      <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-white dark:bg-slate-800 cursor-pointer h-full">
        <div className="relative h-64">
          <Image
            src={"/placeholder.jpg"}
            alt={event.title}
            fill
            className="object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 left-4">
            <Badge
              className={`${
                categories.find((c) => c.id === event.category)?.color
              } shadow-lg`}
            >
              {categories.find((c) => c.id === event.category)?.name}
            </Badge>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
              onClick={(e) => e.preventDefault()}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
        </CardHeader>

        <CardContent className="space-y-3 flex-1">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            {event.location}
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            {event.members} / {event.maxMembers} members
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={event.organizer.avatar || "/placeholder.svg"}
                  alt={event.organizer.name}
                />
                <AvatarFallback>
                  {event.organizer.name.split(" ").map((n) => n[0])}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                by {event.organizer.name}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold"
            >
              {event.price}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
