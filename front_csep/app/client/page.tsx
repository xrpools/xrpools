import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

export default function ProviderHome() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <Dashboard />
      </div>
    </div>
  );
}
