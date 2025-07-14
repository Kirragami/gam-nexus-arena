
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Calendar, 
  Monitor, 
  Gamepad2, 
  Play,
  Download 
} from "lucide-react";
import { Game } from "@/types/graphql";
import { Link } from "react-router-dom";

interface LibraryGameCardProps {
  game: Game;
}

const LibraryGameCard = ({ game }: LibraryGameCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 animate-scale-in group">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          {game.imageUrl && !imageError ? (
            <img
              src={game.imageUrl}
              alt={game.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
              <Gamepad2 className="h-16 w-16 text-purple-400" />
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-600 text-white">
              Owned
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Link 
              to={`/game/${game.id}`}
              className="block group-hover:text-purple-400 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                {game.title}
              </h3>
            </Link>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white ml-1 text-sm font-medium">
                  {game.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(game.releaseDate)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                {game.category}
              </Badge>
              {game.platforms.slice(0, 2).map((platform) => (
                <Badge 
                  key={platform} 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 text-xs"
                >
                  <Monitor className="h-3 w-3 mr-1" />
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2">
            {game.description}
          </p>

          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
            >
              <Play className="h-4 w-4 mr-2" />
              Play Now
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LibraryGameCard;
