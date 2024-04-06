import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

export default function BankHome() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <PoolForm />
      </div>
    </div>
  );
}
