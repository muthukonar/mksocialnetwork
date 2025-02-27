const usernames = [
    'Muthu', 'Priya', 'Shivu', 'Anshu', 'Raj', 'Rahul', 'Sara', 'Sarath',
    'Surya', 'Sai', 'Sathya', 'Sathish', 'Sathvik', 'Sathya'
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random username
  const getRandomUsername = () => getRandomArrItem(usernames);
  
  // Generate random friends array
  const getRandomFriends = (count: number) => {
    const friends = new Set<string>();
    while (friends.size < count) {
      friends.add(getRandomUsername());
    }
    return Array.from(friends);
  };
  
  export { getRandomUsername, getRandomFriends };
  