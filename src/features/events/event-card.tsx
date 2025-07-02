import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin, Share2, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventWithDetails } from "./types";

interface Props {
  event: EventWithDetails;
}

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

export default function EventCard({ event }: Props) {
  return (
    <Link href={`/event/${event.slug}`} className="group">
      <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg bg-white dark:bg-slate-800 cursor-pointer h-full pt-0">
        <CardImage
          alt="Event Image"
          src={event.image || "/placeholder.jpg"}
          category={event.categoryName}
        />

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
            {new Date(event.startDate).toLocaleDateString()} at{" "}
            {event.startTime}
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-red-500" />
            {event.location}
          </div>

          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            {/* todo fix static number  */}
            {5} / {event.maxMembers} members
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={"/placeholder.svg"} alt={"Mohamad"} />
                <AvatarFallback>
                  {"Mohammad".split(" ").map((n) => n[0])}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                by {"Mohammad"}
              </span>
            </div>
            {/* <div className="flex items-center space-x-2">
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
            </div> */}
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

const CardImage = ({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: EventWithDetails["categoryName"];
}) => {
  return (
    <div className="relative h-64 ">
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-4 left-4">
        <Badge
          className={`
          ${colors[category as keyof typeof colors]} 
          shadow-lg`}
        >
          {category}
        </Badge>
      </div>
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
          //   onClick={(e) => e.preventDefault()}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm"
          //   onClick={(e) => e.preventDefault()}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
