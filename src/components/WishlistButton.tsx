
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { wishlistClient } from "@/lib/apollo/wishlistClient";
import { 
  IS_IN_WISHLIST, 
  ADD_TO_WISHLIST, 
  REMOVE_FROM_WISHLIST 
} from "@/graphql/wishlist";
import {
  IsInWishlistQuery,
  IsInWishlistVariables,
  AddToWishlistMutation,
  AddToWishlistVariables,
  RemoveFromWishlistMutation,
  RemoveFromWishlistVariables
} from "@/types/graphql";

interface WishlistButtonProps {
  gameId: string;
  userId: string;
  gameTitle: string;
  variant?: "default" | "icon";
}

const WishlistButton = ({ gameId, userId, gameTitle, variant = "default" }: WishlistButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: wishlistData, refetch } = useQuery<IsInWishlistQuery, IsInWishlistVariables>(
    IS_IN_WISHLIST,
    {
      client: wishlistClient,
      variables: { userId, gameId },
      errorPolicy: 'all'
    }
  );

  const [addToWishlist] = useMutation<AddToWishlistMutation, AddToWishlistVariables>(
    ADD_TO_WISHLIST,
    {
      client: wishlistClient,
      onCompleted: () => {
        toast.success(`${gameTitle} added to wishlist!`);
        refetch();
      },
      onError: () => {
        toast.error('Failed to add to wishlist');
      }
    }
  );

  const [removeFromWishlist] = useMutation<RemoveFromWishlistMutation, RemoveFromWishlistVariables>(
    REMOVE_FROM_WISHLIST,
    {
      client: wishlistClient,
      onCompleted: () => {
        toast.success(`${gameTitle} removed from wishlist`);
        refetch();
      },
      onError: () => {
        toast.error('Failed to remove from wishlist');
      }
    }
  );

  const isInWishlist = wishlistData?.isInWishlist || false;

  const handleToggleWishlist = async () => {
    setIsAnimating(true);
    
    try {
      if (isInWishlist) {
        await removeFromWishlist({ variables: { userId, gameId } });
      } else {
        await addToWishlist({ variables: { userId, gameId } });
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    } finally {
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  if (variant === "icon") {
    return (
      <Button
        onClick={handleToggleWishlist}
        variant="outline"
        size="icon"
        className={`
          transition-all duration-300 border-purple-400 hover:bg-purple-400 hover:text-white
          ${isAnimating ? 'animate-pulse scale-110' : ''}
          ${isInWishlist ? 'bg-purple-600 text-white border-purple-600' : 'text-purple-400'}
        `}
      >
        {isInWishlist ? (
          <Heart className="h-4 w-4 fill-current" />
        ) : (
          <HeartOff className="h-4 w-4" />
        )}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleToggleWishlist}
      variant="outline"
      className={`
        transition-all duration-300 border-purple-400 hover:bg-purple-400 hover:text-white
        ${isAnimating ? 'animate-pulse scale-105' : ''}
        ${isInWishlist ? 'bg-purple-600 text-white border-purple-600' : 'text-purple-400'}
      `}
    >
      {isInWishlist ? (
        <>
          <X className="h-4 w-4 mr-2" />
          Remove from Wishlist
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-2" />
          Add to Wishlist
        </>
      )}
    </Button>
  );
};

export default WishlistButton;
