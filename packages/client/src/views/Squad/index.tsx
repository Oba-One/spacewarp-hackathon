import React from "react";

import { Nav } from "../../components/Nav";

const Squad: React.FC = () => {
  return (
    <>
      <Nav />
      <section
        id="team"
        className="flex h-full w-full flex-col sm:grid sm:grid-cols-[1fr_minmax(360px,_25%)]"
      >
        <div className="flex h-full flex-col gap-16 overflow-auto py-20 px-8">
          <div className="flex flex-col gap-4 px-4">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold">Your Matches</h2>
              <select className=" select max-w-xs">
                <option disabled selected>
                  Normal
                </option>
                <option>Normal Apple</option>
                <option>Normal Orange</option>
                <option>Normal Tomato</option>
              </select>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
              <li className="card card-side flex aspect-[4/3] flex-col items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
                <div className="flex w-full items-center justify-around">
                  <h4 className="text-lg font-bold">Water Squad</h4>
                  <h4 className="text-2xl font-bold">VS</h4>
                  <h4 className="text-xl font-bold">Fire Squad</h4>
                </div>
                <p className="text-lg font-light">Won by Player 1</p>

                <div className="flex w-full items-center justify-around">
                  <ul className="avatar-group -space-x-6">
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                  </ul>
                  <figure className="w-200 mask mask-squircle">
                    <img
                      src="https://picsum.photos/seed/picsum/200/200"
                      alt="Movie"
                    />
                  </figure>
                  <ul className="avatar-group -space-x-6">
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                  </ul>
                </div>

                <div className=" flex gap-6 py-3">
                  <div
                    className="max-w-36 tooltip tooltip-top "
                    data-tip="A Cherished Decentralized Memory Awaits"
                  >
                    <button className="btn-secondary btn">Upload Stream</button>
                  </div>
                  <div
                    className="max-w-36 tooltip tooltip-top "
                    data-tip="What are you waiting for?"
                  >
                    <button className="wide btn-primary btn">
                      Mint Collectible
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 px-4">
            <div className="flex justify-between">
              <h2 className="text-4xl font-bold">Squad Assets</h2>
              <select className=" select max-w-xs">
                <option disabled selected>
                  Normal
                </option>
                <option>Normal Apple</option>
                <option>Normal Orange</option>
                <option>Normal Tomato</option>
              </select>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
              <li className="card card-side flex aspect-[3/4] flex-col items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
                <div className="flex w-full items-center justify-around">
                  <h4 className="text-lg font-bold">Rank 4</h4>
                  <h4 className="text-xl font-bold">Value: 0.01 FIL</h4>
                </div>

                <div className="flex w-full flex-col items-center justify-around">
                  <figure className="w-200 mask mask-squircle">
                    <img
                      src="https://picsum.photos/seed/picsum/200/200"
                      alt="Movie"
                    />
                  </figure>
                  <ul className="avatar-group -space-x-6">
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                  </ul>
                  <p className="text-lg font-light">Asset Name</p>
                  <p className="text-center ">
                    Short description about asset and metadata
                  </p>
                </div>

                <div className=" flex gap-6 py-3">
                  <div
                    className="max-w-36 tooltip tooltip-top "
                    data-tip="A Cherished Decentralized Memory Awaits"
                  >
                    <button className="btn-secondary btn">
                      Propose Update
                    </button>
                  </div>
                  <div
                    className="max-w-36 tooltip tooltip-top "
                    data-tip="What are you waiting for?"
                  >
                    <button className="wide btn-primary btn">
                      Vot For Proposal
                    </button>
                  </div>
                </div>
              </li>
              <li className="card card-side flex aspect-[3/4] flex-col items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
                <div className="flex w-full items-center justify-around">
                  <h4 className="text-lg font-bold">Water Squad</h4>
                  <h4 className="text-2xl font-bold">VS</h4>
                  <h4 className="text-xl font-bold">Fire Squad</h4>
                </div>
                <p className="text-lg font-light">Won by Player 1</p>

                <div className="flex w-full items-center justify-around">
                  <ul className="avatar-group -space-x-6">
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                  </ul>
                  <figure className="w-200 mask mask-squircle">
                    <img
                      src="https://picsum.photos/seed/picsum/200/200"
                      alt="Movie"
                    />
                  </figure>
                  <ul className="avatar-group -space-x-6">
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                    <figure className="mask mask-hexagon w-16">
                      <img
                        src="https://picsum.photos/seed/picsum/200/200"
                        alt="Movie"
                      />
                    </figure>
                  </ul>
                </div>

                <div className=" flex gap-6 py-3">
                  <div
                    className="max-w-36 tooltip tooltip-top "
                    data-tip="A Cherished Decentralized Memory Awaits"
                  >
                    <button className="btn-secondary btn">Upload Stream</button>
                  </div>
                  <div
                    className="max-w-36 tooltip tooltip-top "
                    data-tip="What are you waiting for?"
                  >
                    <button className="wide btn-primary btn">
                      Mint Collectible
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <aside className="flex flex-col gap-6 py-20 px-4">
          <div className="flex justify-between px-4">
            <h2 className="text-4xl font-bold">Squad Rankings</h2>
          </div>
          <ul className="flex flex-col gap-1">
            <li className="card card-side flex aspect-[4/1] items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
              <figure className="mask mask-hexagon w-16">
                <img
                  src="https://picsum.photos/seed/picsum/200/200"
                  alt="Movie"
                />
              </figure>
              <div className="flex h-full flex-col items-center justify-between gap-1 py-1">
                <div
                  className="max-w-36 tooltip tooltip-top "
                  data-tip="0xd16e8e62405472c0f880d7eab0d79fe9db9c427456f870f7f38d155644cf74f6"
                >
                  <p className="w-24 text-base line-clamp-1">
                    0xd16e8e62405472c0f880d7eab0d79fe9db9c427456f870f7f38d155644cf74f6
                  </p>
                  {/* <button className="btn-primary btn">Challenge</button> */}
                </div>
                <div
                  className="max-w-36 tooltip tooltip-top "
                  data-tip="Coming Soon"
                >
                  <button className="btn-accent btn ">Play</button>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-between gap-1 py-1">
                <p className="text-center text-sm font-bold">
                  Collectibles Earned
                </p>
                <p className="text-lg">5</p>
              </div>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Squad;
