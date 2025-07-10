
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Game } from "@/types/graphql";
import WishlistButton from "@/components/WishlistButton";

interface WishlistGameCardProps {
  game: Game;
  userId: string;
  index: number;
  onPurchase: (game: Game) => void;
}

const WishlistGameCard = ({ game, userId, index, onPurchase }: WishlistGameCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <Card 
      className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Link to={`/game/${game.id}`}>
            <img
              src={game.imageUrl || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'}
              alt={game.title}
              className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="absolute top-4 right-4">
            <WishlistButton
              gameId={game.id}
              userId={userId}
              gameTitle={game.title}
              variant="icon"
            />
          </div>
        </div>
        
        <div className="p-6">
          <Link to={`/game/${game.id}`}>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {game.title}
            </h3>
          </Link>
          
          <p className="text-gray-300 mb-4 line-clamp-2">
            {game.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-semibold">{game.rating.toFixed(1)}</span>
            </div>
            <Badge className="bg-purple-600 text-white">
              {game.category}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-purple-400">
              {formatPrice(game.price)}
            </span>
            <Button
              size="sm"
              onClick={() => onPurchase(game)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishlistGameCard;
