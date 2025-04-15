import IpDisplay from "@/components/ip-display";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-slate-50 to-blue-50">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
          MyIP
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Your IP address at a glance
        </p>
        <IpDisplay />
      </div>
    </main>
  );
}
