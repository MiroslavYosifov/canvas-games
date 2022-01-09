class Participant {
    constructor(name) {
        this.name = name;
        this.chatroom = null;
    }
    send(message, to) {
        this.chatroom.send(message, this, to);
    }
    receive(message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
}


class Chatroom  {
    constructor() {
        this.participants = {};
    } 

    register (participant) {
        this.participants[participant.name] = participant;
        participant.chatroom = this;
    }

    send (message, from, to) {
        if (to) {                      // single message
            to.receive(message, from);
        } else {                       // broadcast message
            for (key in this.participants) {
                if (this.participants[key] !== from) {
                    this.participants[key].receive(message, from);
                }
            }
        }
    }
};

function run() {

    var yoko = new Participant("Yoko");
    var john = new Participant("John");
    var paul = new Participant("Paul");
    var ringo = new Participant("Ringo");

    var chatroom = new Chatroom();
    chatroom.register(yoko);
    chatroom.register(john);
    chatroom.register(paul);
    chatroom.register(ringo);

    yoko.send("All you need is love.");
    yoko.send("I love you John.");
    john.send("Hey, no need to broadcast", yoko);
    paul.send("Ha, I heard that!");
    ringo.send("Paul, what do you think?", paul);
}