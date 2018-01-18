// export function countTotalUserVotes(posters, uid) {
//   return Object.keys(posters).reduce( (prev, curr) => {
//     const votes = posters[curr].votes || {};
//     return (prev + countItemsValues(votes, uid));
//   }, 0);
// }

export function countItemsValues(obj, val) {
  if (!obj && typeof(obj) !== 'undefined') {
    return Object.keys(obj).reduce((prev, curr) => obj[curr] === val ? prev + 1 : 0 , 0)
  }
  else {
    return 0;
  }
}

export function extractVotes(uid, posters) {
  return Object.keys(posters).reduce((prev, curr) => {
    let total = prev;
    if (posters[curr].votes) {
      const theseVotes = posters[curr].votes;
      const uids = Object.keys(theseVotes).filter(vote => theseVotes[vote] === uid);
      total = prev.concat(uids);
    }
    return total;
  }, []);
  // return votes;
}
