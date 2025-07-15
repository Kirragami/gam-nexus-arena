
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to Gam
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover, play, and connect with the ultimate gaming experience. 
            Join millions of gamers in the most advanced gaming platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              <Link to="/signup">Start Gaming</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white py-3 px-8 rounded-full transition-all duration-300">
              <Link to="/browse">Explore Games</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-400">Experience games with zero lag and ultra-fast loading times.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-pink-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Compete & Win</h3>
              <p className="text-gray-400">Join tournaments and climb the leaderboards to earn rewards.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-cyan-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Connect</h3>
              <p className="text-gray-400">Meet gamers worldwide and build your gaming community.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Coming Soon Section */}
      {/* <section className="container mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 backdrop-blur-sm border border-purple-500/20">
          <h2 className="text-4xl font-bold text-white mb-4">Games Library Coming Soon</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            We're preparing an incredible collection of games for you. 
            Sign up now to be the first to access our gaming universe!
          </p>
          <Button size="lg" asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full">
            <Link to="/signup">Get Early Access</Link>
          </Button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center border-t border-slate-700">
        <p className="text-gray-400">© 2025 Gam. All rights reserved. Made by Kirra</p>
      </footer>
      </div>
    </Layout>
  );
};

export default HomePage;
