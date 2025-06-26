

import Categories from "@/components/Categories";
import EventList from "@/components/EventList";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const categories = [
  {
    id: "all",
    name: "All Events",
    color: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  },
  {
    id: "tech",
    name: "Technology",
    color:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  },
  {
    id: "business",
    name: "Business",
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
  {
    id: "health",
    name: "Health & Wellness",
    color: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
  },
  {
    id: "arts",
    name: "Arts & Culture",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  {
    id: "sports",
    name: "Sports",
    color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  },
  {
    id: "food",
    name: "Food & Drink",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  },
];

const events = [
  {
    id: 1,
    title: "React & Next.js Developers Meetup",
    description:
      "Join us for an evening of learning about the latest in React and Next.js development. We'll have talks from industry experts and networking opportunities.",
    image: "/placeholder.svg?height=200&width=400",
    category: "tech",
    location: "Tech Hub, Downtown",
    date: "2024-02-15",
    time: "18:00",
    members: 45,
    maxMembers: 100,
    organizer: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: "Free",
    slug: "react-nextjs-developers-meetup",
  },
  {
    id: 2,
    title: "Startup Pitch Night",
    description:
      "Watch innovative startups pitch their ideas to investors and fellow entrepreneurs. Great networking event for the business community.",
    image: "/placeholder.svg?height=200&width=400",
    category: "business",
    location: "Innovation Center",
    date: "2024-02-18",
    time: "19:00",
    members: 32,
    maxMembers: 80,
    organizer: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: "$15",
    slug: "startup-pitch-night",
  },
  {
    id: 3,
    title: "Morning Yoga in the Park",
    description:
      "Start your day with a peaceful yoga session in the beautiful Central Park. All levels welcome. Bring your own mat.",
    image: "/placeholder.svg?height=200&width=400",
    category: "health",
    location: "Central Park",
    date: "2024-02-20",
    time: "07:00",
    members: 28,
    maxMembers: 50,
    organizer: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: "$10",
    slug: "morning-yoga-park",
  },
  {
    id: 4,
    title: "Local Art Gallery Opening",
    description:
      "Celebrate the opening of our new contemporary art exhibition featuring local artists. Wine and appetizers will be served.",
    image: "/placeholder.svg?height=200&width=400",
    category: "arts",
    location: "Modern Art Gallery",
    date: "2024-02-22",
    time: "18:30",
    members: 67,
    maxMembers: 120,
    organizer: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: "Free",
    slug: "local-art-gallery-opening",
  },
  {
    id: 5,
    title: "Weekend Basketball Tournament",
    description:
      "Join our friendly basketball tournament. Teams of 5 players each. Prizes for winners and great fun for everyone!",
    image: "/placeholder.svg?height=200&width=400",
    category: "sports",
    location: "Community Sports Center",
    date: "2024-02-24",
    time: "10:00",
    members: 24,
    maxMembers: 40,
    organizer: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: "$20",
    slug: "weekend-basketball-tournament",
  },
  {
    id: 6,
    title: "Wine Tasting Evening",
    description:
      "Discover exquisite wines from around the world with our sommelier. Learn about wine pairing and enjoy delicious appetizers.",
    image: "/placeholder.svg?height=200&width=400",
    category: "food",
    location: "The Wine Cellar",
    date: "2024-02-25",
    time: "19:30",
    members: 18,
    maxMembers: 30,
    organizer: {
      name: "Sophie Martin",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    price: "$45",
    slug: "wine-tasting-evening",
  },
];

const queryClient = getQueryClient();
void queryClient.prefetchQuery(trpc.categories.getAll.queryOptions());

export default function HomePage() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
        <Header />
        <Hero /> 

        <Categories />

        <EventList events={events} categories={categories} />
      </div>
    </HydrationBoundary>
  );
}
