import { observable } from 'mobx';

class Message {
    @observable id = Math.random().toString();
    @observable title = '';
    @observable type = 'info'; // Can be 'info', 'warning', 'success', 'error'
    constructor(title, type) {
        this.title = title;
        this.type = type;
    }
}

export default Message;
