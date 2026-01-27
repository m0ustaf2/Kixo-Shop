import NavigationButton from "@/app/components/shared/ViewBtn";
import { ShoppingCart, Sparkles } from "lucide-react";

export default function EmptyCartState() {
  return (
    <div className="dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute -top-4 -right-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-400 dark:text-yellow-300" />
            </div>
            <div className="absolute -bottom-2 -left-4 animate-bounce delay-150">
              <Sparkles className="w-4 h-4 text-pink-400 dark:text-pink-300" />
            </div>
            <div className="w-32 h-32 bg-linear-to-br from-red-500 to-pink-600 dark:from-red-700 dark:to-pink-800 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <ShoppingCart
                className="w-16 h-16 text-white"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Looks like you have not added anything to your cart yet. Start
            exploring our amazing products!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex w-min sm:max-w-3xs mx-auto">
          <NavigationButton title={"Start Shopping"} href={"/"} />
        </div>
      </div>
    </div>
  );
}
