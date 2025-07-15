
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { OWNS_GAME } from "@/graphql/inventory";
import { INITIATE_PAYMENT } from "@/graphql/payment";
import { inventoryClient } from "@/lib/apollo/inventoryClient";
import { paymentClient } from "@/lib/apollo/paymentClient";
import {
  OwnsGameQuery,
  OwnsGameVariables,
  InitiatePaymentMutation,
  InitiatePaymentVariables
} from "@/types/graphql";

interface GameOwnershipButtonProps {
  gameId: string;
  gameTitle: string;
  disabled?: boolean;
}

const GameOwnershipButton = ({ gameId, gameTitle, disabled = false }: GameOwnershipButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if user owns the game
  const { data: ownershipData, loading: checkingOwnership } = useQuery<OwnsGameQuery, OwnsGameVariables>(
    OWNS_GAME,
    {
      client: inventoryClient,
      variables: { userId: user?.id || '', gameId },
      skip: !user?.id || !gameId,
      errorPolicy: 'all',
      pollInterval: 5000
    }
  );

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

    if (!gameId) {
      toast({
        title: "Error",
        description: "Game information not available",
        variant: "destructive",
      });
      return;
    }

    setIsAnimating(true);
    console.log('Initiating payment for game:', gameTitle, 'User:', user.id);
    
    try {
      await initiatePayment({
        variables: {
          input: {
            userId: user.id,
            gameId: gameId
          }
        }
      });
    } catch (error) {
      console.error('Payment initiation failed:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
      
    }
  };

  const isOwned = ownershipData?.ownsGame || false;
  const isLoading = checkingOwnership || paymentLoading;

  // Don't render if essential props are missing
  if (!gameId) {
    return null;
  }

  if (isOwned) {
    return (
      <Button
        disabled
        className={`
          w-full bg-green-600 text-white font-semibold py-3 text-lg cursor-default
          ${isAnimating ? 'animate-pulse scale-105' : ''}
        `}
      >
        <CheckCircle className="h-5 w-5 mr-2" />
        Already in Library
      </Button>
    );
  }

  return (
    <Button
      onClick={handlePurchase}
      disabled={isLoading || disabled}
      className={`
        w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
        text-white font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 
        hover:shadow-lg hover:shadow-purple-500/25 group
        ${isAnimating ? 'animate-pulse scale-105' : ''}
        ${(isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-pulse" />
          Buy Now
        </>
      )}
    </Button>
  );
};

export default GameOwnershipButton;
