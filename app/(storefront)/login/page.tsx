import LoginClient from "./LoginClient";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: {
    callbackUrl?: string;
  };
}) {
  return (
    <LoginClient
      googleEnabled={Boolean(
        process.env.GOOGLE_CLIENT_ID &&
          process.env.GOOGLE_CLIENT_SECRET
      )}
      callbackUrl={
        searchParams?.callbackUrl ||
        "/admin"
      }
    />
  );
}
