#!/usr/bin/env bash
GAME_ROOT="./packages/unity"
PATH_TO_UNITY_BUILD="./packages/unity/builds/web/Build"
PATH_TO_REACT_BUILD="./packages/client/public/unity"
echo "--- Beginning to build the frontend"
rm -rf $PATH_TO_UNITY_BUILD
echo "-------- Web build started :: $(date +%T)"
/Applications/Unity/Hub/Editor/2021.3.17f1/Unity.app/Contents/MacOS/Unity -quit -batchmode -logFile stdout.log -projectPath "$pwd/$GAME_ROOT/" -executeMethod WebBuilder.build
echo "-------- Web build completed :: $(date +%T)"
echo "-------- Unzip & Move build started :: $(date +%T)"
rm -rf $PATH_TO_REACT_BUILD
mkdir $PATH_TO_REACT_BUILD
# TODO - Add check for build and throw exit 1 if doesnt exist, this means the build failed with Unity
gzip -dk $PATH_TO_UNITY_BUILD/web.data.gz
gzip -dk $PATH_TO_UNITY_BUILD/web.framework.js.gz
gzip -dk $PATH_TO_UNITY_BUILD/web.wasm.gz
mv $PATH_TO_UNITY_BUILD/web.data $PATH_TO_REACT_BUILD/game.data
mv $PATH_TO_UNITY_BUILD/web.framework.js $PATH_TO_REACT_BUILD/game.framework.js
mv $PATH_TO_UNITY_BUILD/web.wasm $PATH_TO_REACT_BUILD/game.wasm
cp $PATH_TO_UNITY_BUILD/web.loader.js $PATH_TO_REACT_BUILD/game.loader.js
echo "-------- Move build completed :: $(date +%T)"