export function getDateDifference(dateA: Date, dateB: Date, diffIn = 'day') {
  switch (diffIn) {
    case 'day':
      return getDateDifferenceInDay(dateA, dateB);
    default:
      throw new Error(`date difference in ${diffIn} is not implemented yet.`);
  }
}

function getDateDifferenceInDay(dateA: Date, dateB: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
  const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export function getDateAfter(day: number) {
  const date = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000);
  return date;
}
