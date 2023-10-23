// Menu.js
import Link from "next/link";
import { BsSearchHeart } from "react-icons/bs";
import { TfiLayoutListPost } from "react-icons/tfi";
import { AiFillHome } from "react-icons/ai";
import {
  BiSolidUserCircle,
  BiSolidUserX,
  BiSolidUserCheck,
} from "react-icons/bi";
import { useAuth } from "../components/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Image } from "@nextui-org/react";

export default function Menu() {
  const { isLogged, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
    console.log("User Logged out!!");
  };

  const GoToCreatePostClick = () => {
    if (isLogged) router.push("/creationpost");
    else {
      toast.error("You must be logged in to create a post.");
      router.push("#");
    }
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex gap-8 justify-end font-bold">
        <Link href="/" className="gap-2 text-neutral-700 m-auto ml-0">
          {
            <Image
              src="/logo/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-none"
            />
          }
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-2 text-neutral-700"
        >
          <BsSearchHeart />
          <span>Explore</span>
        </Link>

        <a
          className="flex items-center gap-2 text-neutral-700"
          href="#"
          onClick={GoToCreatePostClick}
        >
          <TfiLayoutListPost />
          <span>Create Post</span>
        </a>

        {isLogged ? (
          <>
            <button
              className="flex items-center gap-2 text-pink-700"
              onClick={handleLogout}
            >
              <BiSolidUserCheck />
              <span className="font-bold">Log Out</span>{" "}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="flex items-center gap-2 text-teal-400"
            >
              <BiSolidUserX />
              <span>Log In</span>
            </Link>
            <Link
              href="/registration"
              className="flex items-center gap-2 text-amber-400"
            >
              <BiSolidUserCircle />
              <span className="font-bold">Sign up</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
