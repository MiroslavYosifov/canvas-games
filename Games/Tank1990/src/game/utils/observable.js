export class ObserverList {
    constructor() {
        this.observerList = [];
    }

    add(obj) {
        return this.observerList.push(obj);
    }

    count() {
        return this.observerList.length;
    }

    get(index) {
        if (index > -1 && index < this.observerList.length) {
            return this.observerList[index];
        }
    }

    indexOf(obj, startIndex) {
        let i = startIndex;

        while (i < this.observerList.length) {
            if (this.observerList[i] === obj) {
                return i;
            }
            i++;
        }

        return -1;
    }

    removeAt(index) {
        this.observerList.splice(index, 1);
    }
}

export class Subject {
    constructor() {
        this.observers = new ObserverList();
    }
  
    addObserver(observer) {
        this.observers.add(observer);
    }
  
    removeObserver(observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0));
    }
  
    trigger(context) {
        const observerCount = this.observers.count();
        for (let i = 0; i < observerCount; i++) {
            this.observers.get(i).update(context);
        }
    }
}

export class Observer {
    constructor() {}
    update() {
        console.log('observer');
    }
}
