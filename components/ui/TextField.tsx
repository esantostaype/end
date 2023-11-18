import { useState, FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import styles from './TextField.module.css';

interface CountryOption {
    value: string;
    label: string;
}

interface Props {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
    as?: string;
    options?: CountryOption[];
    errors: string | undefined;
    touched: boolean | undefined;
    value?: string;
}

export const TextField:FC<Props> = ({
    label,
    type,
    name,
    placeholder,
    as,
    options,
    errors,
    touched,
    value
}) => {

    const [ isActive, setIsActive ] = useState( false );
    const [ isFilled, setIsFilled ] = useState( false );

    const handleFieldFocus = () => {
        setIsActive(true);
    };

    const handleFieldBlur = () => {
        setIsActive(false);
    };

    const handleFieldChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        setIsFilled(!!e.target.value);
    };

    return (
        <div
            className={
                `${ styles.control }
                ${ isActive ? styles.isActive : '' }
                ${ isFilled ? styles.isFilled : '' }
                ${ value ? styles.isFilled : '' }
                ${ errors && touched ? ( styles.isError ) : ( styles.isValid ) }`
            }
            onFocus={ handleFieldFocus }
            onBlur={ handleFieldBlur }
            onChange={ handleFieldChange }
        >
            <label htmlFor={ name } className={ styles.label }>{ label }</label>
            { as ? (
                <Field as="select" type={ type } name={ name } className={ styles.field } autoComplete="off">
                    { options && options.map(( option ) => (
                        <option key={ option.value } value={ option.value }>
                            { option.label }
                        </option>
                    ))}
                </Field>
            ) : (
                <Field
                    type={ type }
                    name={ name }
                    placeholder={ placeholder }
                    className={ styles.field }
                    autoComplete="off"
                />
            )}
            <ErrorMessage
                name={ name }
                component="spam"
                className={ styles.errors }
            />
        </div>
    );
};