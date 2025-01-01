import Redirect from "@/components/Redirect";
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if(!session || !session.user) {
    return <Redirect to={"/signin"} />
  }

  return <div>
    Dashboard Page - 
    <h1>{JSON.stringify(session)}</h1>
  </div>
}
