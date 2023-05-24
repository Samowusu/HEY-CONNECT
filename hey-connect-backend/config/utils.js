export const filterSensitiveFields = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    picturePath: user.picturePath,
    location: user.location,
    occupation: user.occupation,
    viewedProfile: user.viewedProfile,
    impressions: user.impressions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    __v: user.__v,
  };
};
