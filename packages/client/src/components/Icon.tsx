import { FC } from "react";
import { Tooltip } from "react-tippy";

interface IconProps {
  title: string;
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  color?: string;
  active?: boolean;
  listItem?: boolean;
  className?: string;
}

export const iconStyles =
  "relative h-12 w-12 m-1 before:absolute before:rounded-full beforehover:bg-slate-700";

export const Icon: FC<IconProps> = ({ title, Svg, size, color, listItem }) => {
  if (listItem) {
    <li className={`${iconStyles} grid place-items-center`}>
      {/* <Tooltip title={title} position="bottom" html={<Svg />} /> */}
    </li>;
  }
  return (
    <div className={`${iconStyles} grid place-items-center`}>
      {/* <Tooltip title={title} position="bottom" html={<Svg />} /> */}
    </div>
  );
};
