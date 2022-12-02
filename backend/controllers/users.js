import User from "../models/User.js";

//read
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);

    //use promise.all because making multiple api calls
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    console.log("get", friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status.json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//update
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = User.findById(id);
    const friend = User.findById(friendId);
    if (user.friends.include(friendId)) {
      user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    console.log("add-remove", friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
