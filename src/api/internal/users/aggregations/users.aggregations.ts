export const getUser = () => {
  return [
    {
      $lookup: {
        from: 'roles',
        localField: 'role',
        foreignField: '_id',
        as: 'role',
      },
    },
    {
      $unwind: {
        path: '$role',
      },
    },
    {
      $project: {
        id: 1,
        email: 1,
        date_created: 1,
        nickname: 1,
        role: '$role.role',
        active: 1,
      },
    },
  ];
};
