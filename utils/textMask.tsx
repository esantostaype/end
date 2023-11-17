import React, { forwardRef, Ref } from 'react';
import InputMask from 'react-input-mask';

interface TextMaskCustomProps {
  inputRef: Ref<HTMLInputElement>;
  mask: string;
  maskChar: string | null;
}

const TextMaskCustom = (props: TextMaskCustomProps, ref: Ref<HTMLInputElement>) => {
  const { inputRef, mask, maskChar, ...other } = props;

  return (
    <InputMask
      {...other}
      mask={mask}
      maskChar={maskChar}
      ref={(inputMaskRef) => {
        if (inputMaskRef) {
          // Aquí puedes acceder a la instancia de ReactInputMask si es necesario
          // inputMaskRef es del tipo ReactInputMask
        }
      }}
    />
  );
};

export default forwardRef((props, ref) => <TextMaskCustom {...props} inputRef={ref} />);
