// "use client";
// import { useCart } from "@/app/Context/CartContext";
// import { useWishlist } from "@/app/Context/WishlistContext";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { cn } from "@/lib/utils";
// import { Heart, Menu, ShoppingCart, User } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ThemeToggle } from "../shared/Theme-toggle";

// const Links = [
//   {
//     path: "/",
//     label: "Home",
//   },
//   {
//     path: "/products",
//     label: "Products",
//   },
//   {
//     path: "/categories",
//     label: "Categories",
//   },
//   {
//     path: "/brands",
//     label: "Brands",
//   },
// ];

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface NavbarProps {
//   className?: string;
//   menu?: MenuItem[];
//   auth?: {
//     login: {
//       title: string;
//       url: string;
//     };
//     signup: {
//       title: string;
//       url: string;
//     };
//   };
// }

// const LoadingSkeleton = () => (
//   <div className="flex gap-2 items-center">
//     <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse"></div>
//     <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
//   </div>
// );

// const Navbar = ({
//   menu = Links.map((link) => ({ title: link.label, url: link.path })),
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Sign up", url: "/register" },
//   },
//   className,
// }: NavbarProps) => {
//   const pathName = usePathname();
//   const { data: session, status } = useSession();
//   const { cartDetails } = useCart();
//   const { wishlistDetails } = useWishlist();
//   return (
//     <section
//       className={cn(
//         "py-4 shadow-sm dark:bg-gray-800 dark:shadow-gray-800",
//         className,
//       )}
//     >
//       <div className="container mx-auto">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           {/* Logo - Left */}
//           <Link href="/" className="flex items-center gap-2">
//             <span className="text-lg font-semibold tracking-tighter dark:text-gray-100">
//               KIXO SHOP
//             </span>
//           </Link>

//           {/* Navigation Links - Center */}
//           <div className="absolute left-1/2 -translate-x-1/2">
//             <NavigationMenu>
//               <NavigationMenuList>
//                 {menu.map((item) => renderMenuItem(item, pathName))}
//               </NavigationMenuList>
//             </NavigationMenu>
//           </div>

//           {/* Auth Buttons - Right */}
//           <div className="flex gap-2">
//             {status === "loading" ? (
//               <LoadingSkeleton />
//             ) : status === "unauthenticated" ? (
//               <>
//                 <ThemeToggle />
//                 <Button asChild variant="outline" size="sm">
//                   <Link href={auth.login.url}>{auth.login.title}</Link>
//                 </Button>
//                 <Button asChild size="sm">
//                   <Link href={auth.signup.url}>{auth.signup.title}</Link>
//                 </Button>
//               </>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <ThemeToggle />
//                 <Link className="relative" href="/wishlist">
//                   {wishlistDetails && wishlistDetails.count > 0 && (
//                     <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono  bg-red-500 text-white ">
//                       {wishlistDetails.count}
//                     </Badge>
//                   )}
//                   <Heart className="size-6 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors" />
//                 </Link>
//                 <Link className="relative" href="/cart">
//                   {cartDetails && cartDetails.numOfCartItems > 0 && (
//                     <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono bg-red-500 text-white ">
//                       {cartDetails?.numOfCartItems}
//                     </Badge>
//                   )}
//                   <ShoppingCart className="size-6 dark:text-gray-300" />
//                 </Link>

//                 <DropdownMenu modal={false}>
//                   <DropdownMenuTrigger>
//                     <User className="size-6 cursor-pointer dark:text-gray-300" />
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent>
//                     <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem>
//                       <Link href="/profile">Profile</Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem>
//                       <Link href="/allorders">My Orders</Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem
//                       className="cursor-pointer"
//                       onClick={() => signOut({ callbackUrl: "/login" })}
//                     >
//                       SignOut
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             )}
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2">
//               <span className="text-lg font-semibold tracking-tighter dark:text-gray-100">
//                 KIXO SHOP
//               </span>
//             </Link>
//             <Sheet modal={false}>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto dark:bg-gray-800">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <Link href="/" className="flex items-center gap-2">
//                       <span className="text-lg font-semibold tracking-tighter dark:text-gray-100">
//                         KIXO SHOP
//                       </span>
//                     </Link>
//                   </SheetTitle>
//                   <div className="flex justify-end">
//                     <ThemeToggle />
//                   </div>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <div className="flex flex-col gap-3">
//                     {menu.map((item) => (
//                       <Link
//                         key={item.title}
//                         href={item.url}
//                         className={cn(
//                           "text-md font-semibold dark:text-gray-300",
//                           pathName === item.url &&
//                             "underline dark:text-gray-100",
//                         )}
//                       >
//                         {item.title}
//                       </Link>
//                     ))}
//                   </div>

//                   <div className="border-t dark:border-gray-700 pt-4">
//                     {status === "loading" ? (
//                       <div className="flex flex-col gap-3">
//                         <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
//                         <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
//                       </div>
//                     ) : status === "unauthenticated" ? (
//                       <div className="flex flex-col gap-3">
//                         <Button asChild variant="outline" size="sm">
//                           <Link href={auth.login.url}>{auth.login.title}</Link>
//                         </Button>
//                         <Button asChild size="sm">
//                           <Link href={auth.signup.url}>
//                             {auth.signup.title}
//                           </Link>
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center  gap-4">
//                         <Link className="relative" href="/wishlist">
//                           {wishlistDetails && wishlistDetails.count > 0 && (
//                             <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono bg-red-500 text-white">
//                               {wishlistDetails.count}
//                             </Badge>
//                           )}
//                           <Heart className="size-6 dark:text-gray-300" />
//                         </Link>

//                         <Link className="relative" href="/cart">
//                           {cartDetails && (
//                             <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono bg-red-500 text-white">
//                               {cartDetails?.numOfCartItems}
//                             </Badge>
//                           )}
//                           <ShoppingCart className="size-6 dark:text-gray-300" />
//                         </Link>

//                         <DropdownMenu modal={false}>
//                           <DropdownMenuTrigger>
//                             <User className="size-6 cursor-pointer dark:text-gray-300" />
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent>
//                             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>
//                               <Link href="/profile">Profile</Link>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Link href="/allorders">My Orders</Link>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               className="cursor-pointer"
//                               onClick={() => signOut({ callbackUrl: "/login" })}
//                             >
//                               SignOut
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem, pathName: string) => {
//   if (item.items) {
//     return (
//       <NavigationMenuItem key={item.title}>
//         <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//         <NavigationMenuContent className="bg-popover text-popover-foreground">
//           {item.items.map((subItem) => (
//             <NavigationMenuLink asChild key={subItem.title} className="w-80">
//               <SubMenuLink item={subItem} />
//             </NavigationMenuLink>
//           ))}
//         </NavigationMenuContent>
//       </NavigationMenuItem>
//     );
//   }

//   return (
//     <NavigationMenuItem key={item.title}>
//       <NavigationMenuLink
//         href={item.url}
//         className={cn(
//           "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-gray-600 hover:text-accent-foreground",
//           pathName === item.url && "underline",
//         )}
//       >
//         {item.title}
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const SubMenuLink = ({ item }: { item: MenuItem }) => {
//   return (
//     <Link
//       className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none  dark:hover:text-accent-foreground dark:hover:bg-gray-800"
//       href={item.url}
//     >
//       <div className="text-foreground dark:text-gray-300">{item.icon}</div>
//       <div>
//         <div className="text-sm font-semibold dark:text-gray-100">
//           {item.title}
//         </div>
//         {item.description && (
//           <p className="text-sm leading-snug text-muted-foreground dark:text-gray-400">
//             {item.description}
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// };

// export { Navbar };

"use client";
import { useCart } from "@/app/Context/CartContext";
import { useWishlist } from "@/app/Context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Heart,
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Package,
  UserCircle,
  Sparkles,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../shared/Theme-toggle";

const Links = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/products",
    label: "Products",
  },
  {
    path: "/categories",
    label: "Categories",
  },
  {
    path: "/brands",
    label: "Brands",
  },
];

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const LoadingSkeleton = () => (
  <div className="flex gap-3 items-center">
    <div className="h-10 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
    <div className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
  </div>
);

const Navbar = ({
  menu = Links.map((link) => ({ title: link.label, url: link.path })),
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const { cartDetails } = useCart();
  const { wishlistDetails } = useWishlist();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-between h-16">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="size-6 text-red-500 dark:text-red-400 absolute -top-1 -right-1 animate-pulse" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-clip-text text-transparent group-hover:from-red-600 group-hover:via-pink-600 group-hover:to-red-600 transition-all">
                KIXO
              </span>
            </div>
            <span className="text-xl font-light text-gray-700 dark:text-gray-300">
              SHOP
            </span>
          </Link>

          {/* Navigation Links - Center */}
          <div className="flex items-center gap-1">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  pathName === item.url
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100",
                )}
              >
                {item.title}
                {pathName === item.url && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {status === "loading" ? (
              <LoadingSkeleton />
            ) : status === "unauthenticated" ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="font-medium"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium shadow-lg shadow-red-500/30"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <Heart className="size-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  {wishlistDetails && wishlistDetails.count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1.5 text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white dark:border-gray-900 shadow-lg">
                      {wishlistDetails.count}
                    </Badge>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <ShoppingCart className="size-5 text-gray-700 dark:text-gray-300 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
                  {cartDetails && cartDetails.numOfCartItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1.5 text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white dark:border-gray-900 shadow-lg">
                      {cartDetails.numOfCartItems}
                    </Badge>
                  )}
                </Link>

                {/* User Menu */}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative h-9 w-9 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 p-0"
                    >
                      <User className="size-4 text-white" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session?.user?.name || "My Account"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session?.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <UserCircle className="mr-2 size-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/allorders" className="cursor-pointer">
                        <Package className="mr-2 size-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      <LogOut className="mr-2 size-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="flex lg:hidden items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              KIXO
            </span>
            <span className="text-lg font-light text-gray-700 dark:text-gray-300">
              SHOP
            </span>
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2">
            {status === "authenticated" && (
              <>
                <Link href="/wishlist" className="relative p-2">
                  <Heart className="size-5 text-gray-700 dark:text-gray-300" />
                  {wishlistDetails && wishlistDetails.count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1 text-[10px] font-bold bg-gradient-to-r from-red-500 to-pink-500 border border-white dark:border-gray-900">
                      {wishlistDetails.count}
                    </Badge>
                  )}
                </Link>

                <Link href="/cart" className="relative p-2">
                  <ShoppingCart className="size-5 text-gray-700 dark:text-gray-300" />
                  {cartDetails && cartDetails.numOfCartItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full px-1 text-[10px] font-bold bg-gradient-to-r from-red-500 to-pink-500 border border-white dark:border-gray-900">
                      {cartDetails.numOfCartItems}
                    </Badge>
                  )}
                </Link>
              </>
            )}

            <Sheet modal={false}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 overflow-y-auto dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800"
              >
                <SheetHeader className="space-y-4 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        KIXO
                      </span>
                      <span className="text-xl font-light dark:text-gray-100">
                        SHOP
                      </span>
                    </Link>
                  </SheetTitle>
                  <ThemeToggle />
                </SheetHeader>

                <div className="flex flex-col gap-6 py-6">
                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-1">
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "px-4 py-3 rounded-lg font-medium transition-colors",
                          pathName === item.url
                            ? "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>

                  {/* Auth Section */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                    {status === "loading" ? (
                      <div className="flex flex-col gap-3">
                        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
                        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"></div>
                      </div>
                    ) : status === "unauthenticated" ? (
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline" className="w-full">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg shadow-red-500/30"
                        >
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 mb-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {session?.user?.name || "My Account"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {session?.user?.email}
                          </p>
                        </div>

                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Link href="/profile">
                            <UserCircle className="mr-2 size-4" />
                            Profile
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Link href="/allorders">
                            <Package className="mr-2 size-4" />
                            My Orders
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                          onClick={() => signOut({ callbackUrl: "/login" })}
                        >
                          <LogOut className="mr-2 size-4" />
                          Sign Out
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
