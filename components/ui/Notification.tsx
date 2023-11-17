import { FC } from 'react';
import styles from './Notification.module.css';
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../Icons';

type NotificationType = 'error' | 'warning' | 'success' | 'info';

interface Props {
    message: string;
    type: NotificationType;
}

export const Notification:FC<Props> = ({ message, type }) => {

    const getIcon = () => {
        switch ( type ) {
            case 'error':
                return <ErrorIcon height={ 22 } width={ 22 } />;
            case 'warning':
                return <WarningIcon height={ 22 } width={ 22 } />;
            case 'success':
                return <SuccessIcon height={ 22 } width={ 22 } />;
            case 'info':
                return <InfoIcon height={ 22 } width={ 22 } />;
            default:
                return null;
        }
    };

    const wrapperClass = `${ styles.wrapper } ${ styles[`${ type }`]}`;

    return (
        <div className={ wrapperClass }>
            <div className={ styles.content }>
                <div className={ styles.icon }>
                    { getIcon() }
                </div>
                <p>{ message }</p>
            </div>
        </div>
    );
};
