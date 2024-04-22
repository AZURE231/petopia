export const getTimeAgo = (createdAt: string): string => {
  const currentTime = new Date();
  const sentTime = new Date(createdAt);
  const timeDifference = Math.abs(currentTime.getTime() - sentTime.getTime());
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (minutesAgo < 60) {
    return `${minutesAgo} phút`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} giờ`;
  } else {
    return `${daysAgo} ngày`;
  }
};
