
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { wishlistClient } from "@/lib/apollo/wishlistClient";
import { 
  IS_IN_WISHLIST, 
  ADD_TO_WISHLIST, 
  REMOVE_FROM_WISHLIST,
  GET_WISHLIST 
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
  disabled?: boolean;
}

const WishlistButton = ({ gameId, userId, gameTitle, variant = "default", disabled = false }: WishlistButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: wishlistData, loading: checkingWishlist, refetch } = useQuery<IsInWishlistQuery, IsInWishlistVariables>(
    IS_IN_WISHLIST,
    {
      client: wishlistClient,
      variables: { userId, gameId },
      errorPolicy: 'all',
      skip: !userId || !gameId
    }
  );

  const [addToWishlist, { loading: adding }] = useMutation<AddToWishlistMutation, AddToWishlistVariables>(
    ADD_TO_WISHLIST,
    {
      client: wishlistClient,
      onCompleted: () => {
        toast.success(`${gameTitle} added to wishlist!`);
        refetch();
      },
      onError: (error) => {
        console.error('Add to wishlist error:', error);
        toast.error('Failed to add to wishlist');
      },
      refetchQueries: [
        { query: GET_WISHLIST, variables: { userId } }
      ]
    }
  );

  const [removeFromWishlist, { loading: removing }] = useMutation<RemoveFromWishlistMutation, RemoveFromWishlistVariables>(
    REMOVE_FROM_WISHLIST,
    {
      client: wishlistClient,
      onCompleted: () => {
        toast.success(`${gameTitle} removed from wishlist`);
        refetch();
      },
      onError: (error) => {
        console.error('Remove from wishlist error:', error);
        toast.error('Failed to remove from wishlist');
      },
      refetchQueries: [
        { query: GET_WISHLIST, variables: { userId } }
      ]
    }
  );

  const isInWishlist = wishlistData?.isInWishlist || false;
  const isLoading = checkingWishlist || adding || removing;

  const handleToggleWishlist = async () => {
    if (isLoading || disabled || !userId || !gameId) return;

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

  // Don't render if essential props are missing
  if (!userId || !gameId) {
    return null;
  }

  if (variant === "icon") {
    return (
      <Button
        onClick={handleToggleWishlist}
        variant="outline"
        size="icon"
        disabled={isLoading || disabled}
        className={`
          transition-all duration-300 border-purple-400 hover:bg-purple-400 hover:text-white
          ${isAnimating ? 'animate-pulse scale-110' : ''}
          ${isInWishlist ? 'bg-purple-600 text-white border-purple-600' : 'text-purple-400'}
          ${(isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isInWishlist ? (
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
      disabled={isLoading || disabled}
      className={`
        transition-all duration-300 border-purple-400 hover:bg-purple-400 hover:text-white
        ${isAnimating ? 'animate-pulse scale-105' : ''}
        ${isInWishlist ? 'bg-purple-600 text-white border-purple-600' : 'text-purple-400'}
        ${(isLoading || disabled) ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          {isInWishlist ? 'Removing...' : 'Adding...'}
        </>
      ) : isInWishlist ? (
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
