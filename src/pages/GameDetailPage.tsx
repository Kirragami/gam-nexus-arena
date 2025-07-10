import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Calendar,
  Monitor,
  Gamepad2,
  AlertCircle,
  Play,
  Download
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GET_GAME_BY_ID } from "@/graphql/games";
import { GetGameQuery, GetGameVariables } from "@/types/graphql";
import { gameClient } from "@/lib/apollo/gameClient";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import WishlistButton from "@/components/WishlistButton";
import Layout from "@/components/Layout";
import { INITIATE_PAYMENT } from "@/graphql/payment";
import { InitiatePaymentMutation, InitiatePaymentVariables } from "@/types/graphql";
import { paymentClient } from "@/lib/apollo/paymentClient";
import { useToast } from "@/hooks/use-toast";

const GameDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();

  const { data, loading, error } = useQuery<GetGameQuery, GetGameVariables>(GET_GAME_BY_ID, {
    client: gameClient,
    variables: { id: id! },
    skip: !id,
    errorPolicy: 'all'
  });

  const game = data?.game;

  const [initiatePayment, { loading: paymentLoading }] = useMutation<InitiatePaymentMutation, InitiatePaymentVariables>(
    INITIATE_PAYMENT,
    {
      client: paymentClient,
      onCompleted: (data) => {
        if (data.initiatePayment.success) {
          toast({
            title: "Payment Initiated",
            description: `Payment ID: ${data.initiatePayment.paymentId}`,
          });
          console.log('Payment initiated successfully:', data.initiatePayment);
        } else {
          toast({
            title: "Payment Failed",
            description: data.initiatePayment.message,
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: "Payment Error",
          description: error.message,
          variant: "destructive",
        });
        console.error('Payment error:', error);
      }
    }
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePurchase = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase games",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!game) {
      toast({
        title: "Error",
        description: "Game information not available",
        variant: "destructive",
      });
      return;
    }

    console.log('Initiating payment for game:', game.title, 'User:', user.id);
    
    try {
      await initiatePayment({
        variables: {
          input: {
            userId: user.id,
            gameId: game.id
          }
        }
      });
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation Skeleton */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center border-b border-slate-700">
          <Skeleton className="h-8 w-32 bg-slate-700" />
          <Skeleton className="h-8 w-24 bg-slate-700" />
        </nav>

        <div className="container mx-auto px-6 py-8">
          <Skeleton className="h-8 w-24 mb-6 bg-slate-700" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-96 bg-slate-700 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-12 bg-slate-700" />
              <Skeleton className="h-32 bg-slate-700" />
              <Skeleton className="h-16 bg-slate-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Game not found</h3>
            <p className="text-gray-400 mb-4">The game you're looking for doesn't exist or couldn't be loaded.</p>
            <Button onClick={() => navigate('/browse')} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Back to Browse
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const allImages = [
    ...(game.imageUrl ? [game.imageUrl] : []),
    // ...(game.screenshots || [])
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/browse')}
          className="mb-6 text-white hover:text-purple-400 hover:bg-slate-800/50 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-scale-in">
          {/* Image Display */}
          <div className="text-6xl mb-4 text-center">
            {game.imageUrl ? (
              <img
                src={game.imageUrl}
                alt={game.title}
                className="w-30 h-30 mx-auto object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="space-y-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold text-white mb-2">{game.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-white ml-1 font-semibold">{game.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(game.releaseDate)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                  {game.category}
                </Badge>
                {game.platforms.map((platform) => (
                  <Badge key={platform} variant="outline" className="border-gray-600 text-gray-300">
                    <Monitor className="h-3 w-3 mr-1" />
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price and Purchase */}
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm animate-scale-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-purple-400">
                    {formatPrice(game.price)}
                  </span>
                  {game.price > 0 && (
                    <Badge className="bg-green-600 text-white">
                      On Sale
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handlePurchase}
                    disabled={paymentLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-pulse" />
                    {paymentLoading ? 'Processing...' : 'Buy Now'}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Trailer
                    </Button>
                    <WishlistButton
                      gameId={game.id}
                      userId={user?.id!}
                      gameTitle={game.title}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm animate-fade-in">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">About This Game</h3>
                <p className="text-gray-300 leading-relaxed">{game.description}</p>
              </CardContent>
            </Card>

            {/* System Requirements */}
            {game.systemRequirements && (
              <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm animate-fade-in">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">System Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-2">Minimum</h4>
                      <div className="space-y-1 text-sm text-gray-300">
                        <p><span className="text-white"></span> {game.systemRequirements}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-2">Recommended</h4>
                      <div className="space-y-1 text-sm text-gray-300">
                        <p><span className="text-white"></span> {game.systemRequirements}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameDetailPage;
