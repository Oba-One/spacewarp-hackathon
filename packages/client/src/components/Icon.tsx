import { FC } from "react";
import { Tooltip } from "react-tippy";

interface IconProps {
  title: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
  listItem?: boolean;
  className?: string;
}

export const Icon: FC<IconProps> = ({ title, Svg, size, color, listItem }) => {
  if (listItem) {
    <li className="grid place-items-center">
      <Tooltip title={title} position="bottom" html={<Svg />} />
    </li>;
  }
  return (
    <div>
      <Tooltip title={title} position="bottom" html={<Svg />} />
    </div>
  );
};
