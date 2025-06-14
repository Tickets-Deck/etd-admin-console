import { LoaderCircleIcon } from "lucide-react";
import React from "react";

type Props = {
  forButton?: boolean;
};

export default function Loader({ forButton }: Props) {
  return (
    <>
      {forButton ? (
        <div className="w-full h-full absolute left-0 top-0 bg-white flex">
          <LoaderCircleIcon className="w-5 h-5 m-auto animate-spin" />
        </div>
      ) : (
        <LoaderCircleIcon className="w-15 h-15 m-auto animate-spin" />
      )}
    </>
  );
}
