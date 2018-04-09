import { observable, computed, action } from 'mobx';
import Message from './Message';

class MessageList {
    @observable messages = [];
    @computed
    get count() {
        return this.messages.length;
    }

    @action
    addMessage(title, type) {
        this.messages.push(new Message(title, type));
    }

    @action
    removeMessage(index) {
        return this.messages.splice(index, 1);
    }
}

export default MessageList;
