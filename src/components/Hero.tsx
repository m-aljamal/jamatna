import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Globe, Shield, Star, Zap } from "lucide-react";

export default function Hero() {

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-300 dark:bg-teal-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-orange-300 dark:bg-orange-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Join thousands of event enthusiasts
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            Where{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Connections
            </span>
            <br />
            Come to Life
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover amazing events, meet like-minded people, and create
            unforgettable memories. From tech meetups to art galleries, find
            your tribe and expand your horizons.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Globe className="w-5 h-5 text-emerald-600 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Global Events
              </span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Shield className="w-5 h-5 text-teal-600 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Verified Organizers
              </span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
              <Star className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Premium Experience
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Search events, topics, or locations..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-4 text-lg rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-white dark:bg-slate-800 shadow-lg"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Search className="mr-2 h-5 w-5" />
              Explore Events
            </Button>

            {/* {isSignedIn && (
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Event
              </Button>
            )} */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Active Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Community Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Cities Worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
