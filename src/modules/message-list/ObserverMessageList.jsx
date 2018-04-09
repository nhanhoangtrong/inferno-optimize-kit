import { observer, inject } from 'inferno-mobx';
import ObserverMessage from './ObserverMessage';

const MessageList = ({ messageList }) => (
    <div>
        <h1>Message list:</h1>
        {messageList.messages.map((msg, i) => (
            <ObserverMessage key={i} message={msg} />
        ))}
        <button
            onClick={() => {
                messageList.addMessage(Math.random().toString(), 'info');
            }}>
            Add Message
        </button>
        <button
            onClick={() => {
                messageList.removeMessage(messageList.count - 1);
            }}>
            Remove Message
        </button>
    </div>
);

export default inject(['messageList'])(observer(MessageList));
