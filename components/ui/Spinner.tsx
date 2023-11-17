import styles from './Spinner.module.css';

export const Spinner = () => {
    return (
        <div className={ `${ styles.container } fadeIn` }>
            <span className={ styles.content }></span>
        </div>
    )
}