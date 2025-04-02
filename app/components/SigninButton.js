"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SigninButton() {
  const { data: session } = useSession();

  return (
    <div>
      <p>hello</p>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("github")}>Sign in with GitHub</button>
      )}
    </div>
  );
}
