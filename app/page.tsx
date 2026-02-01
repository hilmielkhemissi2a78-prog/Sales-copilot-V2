export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-red-500">TEST ULTRA SIMPLE</h1>
      <p className="mt-4 text-xl">Si tu vois ce texte rouge, le problème vient du client.</p>
      <p className="mt-4 text-zinc-400">Si tu vois PAS ça, le problème est dans layout.tsx ou global.css</p>
      
      <div className="mt-8 p-4 bg-zinc-900 rounded">
        <p>Timestamp serveur: {new Date().toISOString()}</p>
      </div>
    </div>
  );
}
