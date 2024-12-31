import Redirect from "@/components/Redirect";
import { getServerSession } from "next-auth"

export default async function Dashboard() {
  const session = await getServerSession();

  if(!session || !session.user) {
    return <Redirect to={"/"} />
  }

  return <div>
    Dashboard Page - 
    <h1>{JSON.stringify(session)}</h1>
  </div>
}
