import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function EmptyCartState() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="absolute -bottom-2 -left-4 animate-bounce delay-150">
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
            <div className="w-32 h-32 bg-linear-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <ShoppingCart
                className="w-16 h-16 text-white"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Looks like you have not added anything to your cart yet. Start
            exploring our amazing products!
          </p>
        </div>
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="group bg-linear-to-r from-red-500 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2">
            <Link href={"/"}> Start Shopping </Link>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
