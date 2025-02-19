import React from "react";
import BurgerIcon from "src/assets/burger.svg?react";
import PlusIcon from "src/assets/plus.svg?react";
import { cn } from "src/shared/lib/css";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: "list" | "add" | "null";
  color?: "green" | "grey" | "ghost" | "white";
  children: React.ReactNode;
}

export function Button({ children, icon = "null", color = "ghost", className, ...props }: ButtonProps) {
  return (
    <button className={cn(styles.button, className, styles[color], styles[icon], {
      [styles["with-icon"]]: icon !== "null",
      [styles.standard]: icon === "null",
    })} {...props}>
      {icon === "add" && <PlusIcon />}
      {icon === "list" && <BurgerIcon />}
      <span>{children}</span>
    </button>
  )
}