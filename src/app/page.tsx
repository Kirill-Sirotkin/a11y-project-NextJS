import TopBar from '@/components/TopBar';

export default async function Home() {
  return (
    <main className="
      flex flex-col h-full
    ">
      <TopBar />
      <div className="
        flex flex-1 flex-col gap-8
        items-center justify-center
        text-4xl font-bold  
      ">
        A11Y REPORT
        <div className="
          text-2xl font-normal
        ">
          Check your website for accessibility issues!
        </div>
      </div>
    </main>
  );
}
