import Image from "next/image";

export default async function Home() {
  return (
    <div className="min-h-full">
      <div className="min-h-screen grid grid-cols-2">
        <div className="flex items-center p-8 bg-[#121212]">
          <Image
            src="/images/vec.jpeg"
            alt="Description"
            width={500}
            height={600}
          />
        </div>
        <div className="flex justify-center items-center text-3xl font-bold bg-[#333333] #708090">
          <p className="max-w-[500px]"> Welcome to see the attendance that we are strugling to maintain </p>
        </div>
      </div>
    </div>
  );
}
