#!/usr/bin/env bash

# Usage:
#   PATH_TO_UNITY_BUILDS=~/code/spacewarp/build UNITY_BUILD_NAME=20230203 PATH_TO_REACT_BUILD=~/code/spacewarp/spacewarp-hackathon/packages/client/public/unity ~/code/spacewarp/spacewarp-hackathon/scripts/copy-unity.sh
echo "-------- Copying Unity build :: $(date +%T)"
PATH_TO_UNITY_BUILD=${PATH_TO_UNITY_BUILDS}/${UNITY_BUILD_NAME}/Build
echo "-------- From (unity): ${PATH_TO_UNITY_BUILD}"
echo "-------- To (react): ${PATH_TO_REACT_BUILD}"

rm ${PATH_TO_REACT_BUILD}/game.data
rm ${PATH_TO_REACT_BUILD}/game.framework.js
rm ${PATH_TO_REACT_BUILD}/game.wasm
rm ${PATH_TO_REACT_BUILD}/game.loader.js

# TODO - Add check for build and throw exit 1 if doesnt exist, this means the build failed with Unity
gzip -dk ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.data.gz
gzip -dk ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.framework.js.gz
gzip -dk ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.wasm.gz
cp ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.data ${PATH_TO_REACT_BUILD}/game.data
cp ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.framework.js ${PATH_TO_REACT_BUILD}/game.framework.js
cp ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.wasm ${PATH_TO_REACT_BUILD}/game.wasm
cp ${PATH_TO_UNITY_BUILD}/${UNITY_BUILD_NAME}.loader.js ${PATH_TO_REACT_BUILD}/game.loader.js
echo "-------- Move build completed :: $(date +%T)"