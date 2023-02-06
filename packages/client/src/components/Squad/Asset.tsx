import { FC } from "react";
import { useForm } from "react-hook-form";

import { useLighthouse } from "../../hooks/useLighthouse";
import { useAsset } from "../../hooks/useAsset";

// interface Metadata {
//   name: string;
//   description: string;
//   power: number;
//   energy: number;
// }

interface AssetProps extends Asset {
  // id: string;
  // image: string;
  // metadata: Metadata;
  actionsEnabled: boolean;
}

export const Asset: FC<AssetProps> = (asset) => {
  const { proposeUpdate, voteOnProposal } = useAsset(asset);
  const { encryptFile, applyAccessConditions } = useLighthouse();

  const { register, handleSubmit } = useForm<{
    image: string;
  }>({
    shouldUseNativeValidation: true,
  });

  async function onSubmit(values: { image: any }) {
    console.log("On Submit", values);
    const { image } = values;

    try {
      const encryptedFile = await encryptFile(image);
      await applyAccessConditions(encryptedFile, [
        {
          id: 1,
          chain: "hyperspace",
          contractAddress: asset.squadId,
          method: "balanceOf",
          returnValueTest: {
            comparator: ">",
            value: 0,
          },
          standardContractType: "ERC1155",
        },
      ]);
      await proposeUpdate(asset.id, encryptedFile);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="card card-side flex aspect-[3/4] flex-col items-center justify-between gap-3 bg-slate-800 px-4 py-3 shadow-xl">
      <div className="flex w-full items-center justify-around">
        <h4 className="text-lg font-bold">Rank 4</h4>
        <h4 className="text-xl font-bold">Value: 0.01 FIL</h4>
      </div>

      <div className="flex w-full flex-col items-center justify-around">
        <figure className="w-200 mask mask-squircle">
          <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
        </figure>
        <ul className="avatar-group -space-x-6">
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
          <figure className="mask mask-hexagon w-16">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Movie" />
          </figure>
        </ul>
        <p className="text-lg font-light">Asset Name</p>
        <p className="text-center ">
          Short description about asset and metadata
        </p>
      </div>

      <div className="flex flex-col gap-6 py-3">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            className="file-input-bordered file-input-primary file-input w-full max-w-xs"
            {...register("image", { required: true })}
          />
          <div
            className="max-w-36 tooltip tooltip-top "
            data-tip="A Cherished Decentralized Memory Awaits"
          >
            <button className="btn-secondary btn" type="submit">
              Propose Update
            </button>
          </div>
        </form>
        {/* <div
          className="max-w-36 tooltip tooltip-top "
          data-tip="What are you waiting for?"
        >
          <div className="dropdown">
            <label tabIndex={0} className="wide btn-primary btn">
              Vote For Proposal
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li onClick={}>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </li>
  );
};
