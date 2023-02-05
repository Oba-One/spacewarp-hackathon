import { AvatarGenerator } from "random-avatar-generator";

export const avatarGenerator = new AvatarGenerator();

// Simply get a random avatar
export const playerAvatar = avatarGenerator.generateRandomAvatar();

// Optionally specify a seed for the avatar. e.g. for always getting the same avatar for a user id.
// With seed 'avatar', always returns https://avataaars.io/?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Blue01&clotheType=Hoodie&eyeType=EyeRoll&eyebrowType=RaisedExcitedNatural&facialHairColor=Blonde&facialHairType=BeardMagestic&hairColor=Black&hatColor=White&mouthType=Sad&skinColor=Yellow&topType=ShortHairShortWaved
// generator.generateRandomAvatar("avatar");
