import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col h-screen text-center">
      <Link href="/client" class="flex-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">Launch app as a provider</Link>
      <Link href="/bank" class="flex-auto bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">Launch app as a bank</Link>
    </div>
  );
}
