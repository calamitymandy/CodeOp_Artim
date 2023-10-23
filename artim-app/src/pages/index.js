import { PostsList } from "./PostsList";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-row justify-between place-items-start mt-32 mb-32">
        <div className="flex flex-col ml-32 mt-20 items-center">
          <Link
            href={`/registration`}
            className="w-32 bg-amber-300 text-white font-extrabold py-2 px-8 rounded-md hover:bg-amber-500 mb-4 drop-shadow-md transition ease-in-out duration-100"
          >
            Join us
          </Link>
          <h3 className="text-neutral-500">Already have an account?</h3>
          <Link
            href="/login"
            className="text-pink-500 font-extrabold"
          >
            <span className="font-bold underline">Log in here</span>
          </Link>
        </div>

        <div className="mr-8">
          <h2 className="mb-6 text-right text-7xl font-bold font-alegreya-sans">
            Find your
          </h2>
          <h2 className="text-right text-7xl font-bold text-pink-500">
            inspiration
          </h2>
        </div>
      </div>
      <PostsList />
    </main>
  );
}
