import prisma  from "@repo/db/prisma"


export default async function Home() {
  let users = await prisma.user.findMany();
  console.log(users);
  
  return (
    <div className="bg-black text-white">
      <h1 className="">Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          
        </div>
      ))}
    </div>
  );
}


