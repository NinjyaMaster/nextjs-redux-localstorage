import Image from "next/image";

import InputComponentV1 from "./components/InputComponentV1";
import InputComponentV2 from "./components/InputComponentV2";
import InputComponentV3 from "./components/InputComponentV3";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <br />
      <InputComponentV1 />
      <br />
      <InputComponentV2 />
      <br />
      <InputComponentV3 />
    </main>
  );
}
