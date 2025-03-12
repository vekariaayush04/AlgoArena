import React, { ReactNode } from "react";
import { Button } from "../ui/button";

export const PrimaryButton = ({
  variant,
  children
}: {
  variant: "Blue" | "Normal"
//   content : string,
  children : ReactNode
}) => {
    const map = {
        "Blue" : "bg-[#3259E8] text-white hover:bg-[#3259E8]",
        "Normal" : "bg-primary dark:bg-primary text-content-secondary dark:text-content-secondary border-border dark:border-border border"
    }
  return (
    <Button className={` h-full  text-md ${map[variant]}`}>
      {children}
    </Button>
  );
};
