const forumMessages = [
    {
        id: 0,
        message: 'Message entré manuellement',
        author: 'Javascript',
        likes: 0,
    },
];

function getAll() {
    return forumMessages;
}

function incLike(id) {
    for (let msg of forumMessages) {
        if (msg.id === id) {
            msg.likes++;
            break;
        }
    }
}

function addMessage(obj) {
    forumMessages.push({
        id: forumMessages.length + 1,
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