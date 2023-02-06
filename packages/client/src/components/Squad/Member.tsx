import { FC } from "react";

export const Member: FC<Member> = ({
  id,
  collectiblesEarned,
  avatar,
  name,
}) => {
  return (
    <li className="card card-side flex aspect-[4/1] items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
      <figure className="mask mask-hexagon w-16">
        <img
          src={avatar ?? "https://picsum.photos/seed/picsum/200/200"}
          alt="Member Avatar"
        />
      </figure>
      <div className="flex h-full flex-col items-center justify-between gap-1 py-1">
        <div
          className="max-w-36 tooltip tooltip-top "
          data-tip="0xd16e8e62405472c0f880d7eab0d79fe9db9c427456f870f7f38d155644cf74f6"
        >
          <p className="w-24 text-base line-clamp-1">
            {(name || id) ??
              "0xd16e8e62405472c0f880d7eab0d79fe9db9c427456f870f7f38d155644cf74f6"}
          </p>
        </div>
        <div className="max-w-36 tooltip tooltip-top " data-tip="Coming Soon">
          <button className="btn-accent btn ">Play</button>
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-between gap-1 py-1">
        <p className="text-center text-sm font-bold">Collectibles Earned</p>
        <p className="text-2xl font-semibold">{collectiblesEarned}</p>
      </div>
    </li>
  );
};
