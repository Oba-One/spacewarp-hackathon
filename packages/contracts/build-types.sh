#!/usr/bin/env bash
PATH_TO_TYPES="types/ethers-contracts"
echo "--- Rewriting Types"
perl -i -pe's/arguments/args/g' $PATH_TO_TYPES/IncrementSystem.ts
echo "-------- Finished updating typess :: $(date +%T)"
