import { Button, Quote } from "@radix-ui/themes";
import toast from "react-hot-toast";

function Home() {
  const click = () => {
    toast.success("Hello world!");
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Quote className="w-1/2 text-center">
        There's a passage I got memorized. Ezekiel 25:17. 'The path of the
        righteous man is beset on all sides by the inequities of the selfish and
        the tyranny of evil men
      </Quote>
    </div>
  );
}

export default Home;
