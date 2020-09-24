import React from "react";
import "./Button.scss";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import classNames from "classnames";

export enum ButtonTheme {
  primary = "primary",
  secondary = "secondary",
}

interface ButtonProps {
  route: string;
  theme?: ButtonTheme;
  label?: string;
  icon: IconType;
}
const Button = ({ label, route, theme, icon: Icon }: ButtonProps) => {
  return (
    <Link to={route} className={classNames("ev-button", theme)}>
      <Icon />
      {label && <p className="title">{label}</p>}
    </Link>
  );
};

export default Button;
