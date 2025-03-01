import { Spinner } from "@nextui-org/spinner";

function SuspenseContent() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner color="#4b108d" style={{ width: "180px", height: "180px" }} />
    </div>
  );
}

export default SuspenseContent;
