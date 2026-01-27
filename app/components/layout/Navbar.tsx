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
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Heart, Menu, ShoppingCart, User } from "lucide-react";
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
  <div className="flex gap-2 items-center">
    <div className="h-9 w-20 bg-gray-200 rounded-md animate-pulse"></div>
    <div className="h-9 w-24 bg-gray-200 rounded-md animate-pulse"></div>
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
    <section
      className={cn(
        "py-4 shadow-sm dark:bg-gray-800 dark:shadow-gray-800",
        className,
      )}
    >
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tighter dark:text-gray-100">
              KIXO SHOP
            </span>
          </Link>

          {/* Navigation Links - Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item, pathName))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons - Right */}
          <div className="flex gap-2">
            {status === "loading" ? (
              <LoadingSkeleton />
            ) : status === "unauthenticated" ? (
              <>
                <ThemeToggle />
                <Button asChild variant="outline" size="sm">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Link className="relative" href="/wishlist">
                  {wishlistDetails && wishlistDetails.count > 0 && (
                    <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono  bg-red-500 text-white ">
                      {wishlistDetails.count}
                    </Badge>
                  )}
                  <Heart className="size-6 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors" />
                </Link>
                <Link className="relative" href="/cart">
                  {cartDetails && cartDetails.numOfCartItems > 0 && (
                    <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono bg-red-500 text-white ">
                      {cartDetails?.numOfCartItems}
                    </Badge>
                  )}
                  <ShoppingCart className="size-6 dark:text-gray-300" />
                </Link>

                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <User className="size-6 cursor-pointer dark:text-gray-300" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/allorders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      SignOut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tighter dark:text-gray-100">
                KIXO SHOP
              </span>
            </Link>
            <Sheet modal={false}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto dark:bg-gray-800">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <span className="text-lg font-semibold tracking-tighter dark:text-gray-100">
                        KIXO SHOP
                      </span>
                    </Link>
                  </SheetTitle>
                  <div className="flex justify-end">
                    <ThemeToggle />
                  </div>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <div className="flex flex-col gap-3">
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "text-md font-semibold dark:text-gray-300",
                          pathName === item.url &&
                            "underline dark:text-gray-100",
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    {status === "loading" ? (
                      <div className="flex flex-col gap-3">
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
                      </div>
                    ) : status === "unauthenticated" ? (
                      <div className="flex flex-col gap-3">
                        <Button asChild variant="outline" size="sm">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={auth.signup.url}>
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center  gap-4">
                        <Link className="relative" href="/wishlist">
                          {wishlistDetails && wishlistDetails.count > 0 && (
                            <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono bg-red-500 text-white">
                              {wishlistDetails.count}
                            </Badge>
                          )}
                          <Heart className="size-6 dark:text-gray-300" />
                        </Link>

                        <Link className="relative" href="/cart">
                          {cartDetails && (
                            <Badge className="absolute -top-1/2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono bg-red-500 text-white">
                              {cartDetails?.numOfCartItems}
                            </Badge>
                          )}
                          <ShoppingCart className="size-6 dark:text-gray-300" />
                        </Link>

                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger>
                            <User className="size-6 cursor-pointer dark:text-gray-300" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href="/allorders">My Orders</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => signOut({ callbackUrl: "/login" })}
                            >
                              SignOut
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, pathName: string) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className={cn(
          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors dark:hover:bg-gray-600 hover:text-accent-foreground",
          pathName === item.url && "underline",
        )}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none  dark:hover:text-accent-foreground dark:hover:bg-gray-800"
      href={item.url}
    >
      <div className="text-foreground dark:text-gray-300">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold dark:text-gray-100">
          {item.title}
        </div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground dark:text-gray-400">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar };
