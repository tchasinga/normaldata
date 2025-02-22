/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Dashboard from "./dashboard/page";
import Signin from "./(formgroup)/signin/page";

interface RootState {
  user: {
    user: {
      currentUser: any;
    };
  };
}

export default function Home() {
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user.user.currentUser);

  if (!currentUser) {
    router.push('/signin');
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-5">
        {
          currentUser ? <Dashboard /> : <Signin />
        }
    </div>
  );
}