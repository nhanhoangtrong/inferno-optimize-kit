import styles from './Message.scss';

const getMessageBgColor = (type) => {
    switch (type) {
        case 'info':
            return styles.info;
        case 'success':
            return styles.success;
        case 'warning':
            return styles.warning;
        case 'error':
            return styles.error;
        default:
            return '';
    }
};

const Message = ({ message }) => {
    const bgClass = getMessageBgColor(message.type);

    return (
        <div className={styles.message + ' ' + bgClass}>
            Message: {message.title}
        </div>
    );
};

export default Message;
