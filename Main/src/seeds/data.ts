

const usernames = [
    'Anshu'
  ];
  
  const thoughtBodies = [
        'The power of positive thinking',
      ];
  
  const possibleReactions = [
    '👍',
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random username
  const getRandomUsername = () => getRandomArrItem(usernames);
  
  // Now, get random thoughts with the correct required fields
  const getRandomThoughts = (int: number) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      const username = getRandomUsername(); 
      results.push({
        username: username, 
        thoughtText: getRandomArrItem(thoughtBodies), 
      });
    }
    return results;
  };
  
  // Get reactions for thoughts (optional, if needed for another part of the system)
  const getThoughtReactions = (int: number) => {
    if (int === 1) {
      return getRandomArrItem(possibleReactions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(possibleReactions),
        username: getRandomUsername(),
      });
    }
    return results;
  };
  
  export { getRandomUsername, getRandomThoughts, getThoughtReactions };
  