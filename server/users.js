// helper functions to manage users : Joining In, Signing Out, Removing Users, Getting Users, Adding Users, Keeping Track of what users are in which room ...

const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();       // trim() : is to remove starting and ending spaces in a word
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if(existingUser) {
        return { error: 'Username is taken'};
    }

    const user = {id, name, room};

    users.push(user);

    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {                     // If we find the user to remove
        return users.splice(index, 1)[0];       // Reomve that user from the users array
    }
}

const getUser = (id) => users.find((user) => user.id === id);       // Return the user with the corresponding ID

const getUsersInRoom = () => users.filter((user) => user.room === room);    // get the users in a sppecific room


module.exports = { addUser, removeUser, getUser, getUsersInRoom }