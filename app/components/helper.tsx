import { Code } from "@nextui-org/react";
import { HelpCircle } from "react-feather";

export const Helper = ({
  command,
  text,
}: {
  command: string;
  text: string;
}) => (
  <div className="mt-5 flex flex-row items-center justify-center bg-gray-100 shadow-md p-5 rounded-lg">
    <HelpCircle className="mr-2" color="grey" />
    <Code className="mr-2">{command}</Code>
    <p className="text-gray-500">{text}</p>
  </div>
);
