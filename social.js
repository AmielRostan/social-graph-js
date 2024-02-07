// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++
    const id = this.currentID;
    this.users[id.toString()] = {id: id, name: name};
    this.follows[id.toString()] = new Set();
    return id;
  }

  getUser(userID) {
    const user = this.users[userID];

    if(user != undefined) {
      return user;
    } else {
      return null;
    }
  }

  follow(userID1, userID2) {
    const user1 = this.users[userID1];
    const user2 = this.users[userID2];

    if(user1 === undefined || user2 === undefined) {
      return false;
    } else {
      this.follows[userID1].add(userID2);
      return true;
    }
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    const list = new Set();

    for(let followerID in this.follows) {
      if(this.follows.hasOwnProperty(followerID)) {
        if(this.follows[followerID].has(userID)) {
          list.add(parseInt(followerID));
        }
      }
    }

    return list;
  }

  getRecommendedFollows(userID, degrees) {
    const queue = [[userID]];
    const visited = new Set();

    const recommendations = [];

    while(queue.length > 0) {
      let path = queue.shift();
      let currentNode = path[path.length - 1];

      if(!visited.has(currentNode)) {
        visited.add(currentNode);

        // console.log(`${path.length} contra ${degrees}`)
        // console.log(currentNode)
        if(path.length > 2 && path.length <= degrees + 2) {
          recommendations.push(currentNode);
        }

        let friends = getNeighbors(currentNode, this.follows);

        for(let friend of friends) {
          let pathCopy = [...path];
          pathCopy.push(friend);
          queue.push(pathCopy);
        }
      }
    }

    return recommendations;
  }
}

function getNeighbors(node, graph) {
  return graph[node];
}

module.exports = SocialNetwork;
