import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";
import LogoImage from "../assets/logos.png"

const Navbar = () => {
  const { user, loading, logout } = useUserStore();
  const {setTheme} = useThemeStore();
  const { cart } = useCartStore();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to={"/"}>
        <div className="flex  items-center">
        <img className="w-20 h-20"  src={LogoImage}/>
          <h1 className="font-bold md:font-extrabold text-2xl">
            Foodie Faster
          </h1>
        </div> 
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order/status"}>Order</Link>

            {user?.admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>Dashboard</MenubarTrigger>
                  <MenubarContent>
                    <Link to={"/admin/restaurant"}>
                      <MenubarItem>Restaurant</MenubarItem>
                    </Link>
                    <Link to={"/admin/menu"}>
                      <MenubarItem>Menu</MenubarItem>
                    </Link>
                    <Link to={"/admin/orders"}>
                      <MenubarItem>Orders</MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to={"/cart"} className="relative cursor-pointer">
              <ShoppingCart />
              {cart?.length > 0 && (
                <Button
                  size={"icon"}
                  className="absolute -inset-y-3 left-2 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-500"
                >
                  {cart?.length}
                </Button>
              )}
            </Link>
            <div>
              <Avatar>
                <AvatarImage  src={user?.profilePicture} alt="profile-picture"/>
                <AvatarFallback>VH</AvatarFallback>
              </Avatar>
            </div>
            <div>
              {loading ? (
                <Button className="bg-orange hover:bg-hoverOrange">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </Button>
              ) : (
                <Button
                  onClick={logout}
                  className="bg-orange hover:bg-hoverOrange"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          {/* {Mobile responsive} */}
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  const {setTheme} = useThemeStore();
  const {cart} = useCartStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200 "
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <SheetClose asChild>
              <Link to="/">Foodie Faster</Link>
            </SheetClose>
          </SheetTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <SheetClose asChild>
                <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              </SheetClose>
              <SheetClose asChild>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              </SheetClose>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <SheetClose asChild>
            <Link
              to={"/profile"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <User />
              <span>Profile</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={"/order/status"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <HandPlatter />
              <span>Order</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              to={"/cart"}
              className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
            >
              <ShoppingCart />
              <span>Cart <span className="font-extrabold text-red-500"> ({cart.length})</span></span>
            </Link>
          </SheetClose>
          {user?.admin && (
            <>
              <SheetClose asChild>
                <Link
                  to={"/admin/menu"}
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                >
                  <SquareMenu />
                  <span>Menu</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to={"/admin/restaurant"}
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                >
                  <UtensilsCrossed />
                  <span>Restaurant</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to={"/admin/orders"}
                  className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium"
                >
                  <PackageCheck />
                  <span>Restaurant Orders</span>
                </Link>
              </SheetClose>
            </>
          )}
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>VH</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{user?.fullName}</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange">
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-orange hover:bg-hoverOrange"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
