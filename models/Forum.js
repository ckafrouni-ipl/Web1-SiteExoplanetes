const forum = [
    {
        id: 0,
        message: 'Message entré manuellement',
        author: 'Javascript',
        likes: 0,
    },
];

function getAll() {
    return forum;
}

function incLike(id) {
    for (let msg of forum) {
        if (msg.id === id) {
            msg.likes++;
            break;
        }
    }
}

function addMessage(obj) {
    forum.push({
        id: forum.length + 1,
        message: obj.message,
        author: obj.author,
        likes: 0,
    });
}

module.exports = {
    getAll,
    incLike,
    addMessage,
}