"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserWishlist } from "../services/wishlist.service";

interface WishlistProduct {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
}

interface WishlistData {
  count: number;
  data: WishlistProduct[];
}

interface IWishlistContext {
  wishlistDetails: WishlistData | null;
  setWishlistDetails: React.Dispatch<React.SetStateAction<WishlistData | null>>;
  getWishlistDetails: () => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<IWishlistContext | null>(null);

export function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistDetails, setWishlistDetails] = useState<WishlistData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  async function getWishlistDetails() {
    setIsLoading(true);
    try {
      const result = await getUserWishlist();
      if (result.success && result.data) {
        setWishlistDetails(result.data);
      } else {
        setWishlistDetails(null);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistDetails(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchWishlistDetails = async () => {
      await getWishlistDetails();
    };

    fetchWishlistDetails();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistDetails,
        setWishlistDetails,
        getWishlistDetails,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within WishlistContextProvider");
  }
  return context;
}
