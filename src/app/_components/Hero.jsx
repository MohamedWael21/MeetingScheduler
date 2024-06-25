import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="hidden lg:block">
        <Image
          src="/profile1.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-36"
          alt="profile picture"
        />
        <Image
          src="/profile2.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute left-16 top-48"
          alt="profile picture"
        />
        <Image
          src="/profile3.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute left-36 bottom-20"
          alt="profile picture"
        />
        <Image
          src="/profile4.png"
          width={100}
          height={100}
          className="h-[100px] object-cover rounded-full absolute right-16 bottom-32"
          alt="profile picture"
        />
      </div>
      <div className="max-w-2xl text-center">
        <h2 className="font-bold text-[60px] text-slate-700">
          Easy scheduling ahead
        </h2>
        <h2 className="mt-5 text-xl text-slate-500">
          Scheduly is your scheduling automation platform for eliminating the
          back-and-forth emails to find the perfect time — and so much more.
        </h2>
        <div className="flex flex-col gap-4 mt-5">
          <h3 className="text-sm">Sign Up free with Google and Facebook</h3>
          <div className="flex justify-center gap-8">
            <Button className="flex gap-4 p-7">
              <Image src="/google.png" width={30} height={30} alt="google" />
              Sign up with Google
            </Button>
            <Button className="flex gap-4 p-7">
              <Image src="/facebook.png" width={30} height={30} alt="google" />
              Sign up with Facebook
            </Button>
          </div>
          <hr />
          <h2>
            <Link href="" className="text-primary">
              Sign up Free with Email.
            </Link>{" "}
            No Credit Card required
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Hero;
