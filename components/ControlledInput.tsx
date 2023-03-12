import React, { FC } from 'react';
import { Controller, ControllerProps } from 'react-hook-form';

import { Input, InputProps } from '../ui/Input';

type ControlledInputProps = Omit<ControllerProps, 'render'> & {
  inputProps: InputProps;
};

export const ControlledInput: FC<ControlledInputProps> = ({
  inputProps,
  ...rest
}) => {
  return (
    <Controller
      {...rest}
      render={({
        fieldState: { error, invalid },
        field: { onChange, ...field },
      }) => (
        <Input
          {...inputProps}
          error={error?.message}
          isInvalid={inputProps.isInvalid || invalid}
          onChangeText={onChange}
          {...field}
        />
      )}
    />
  );
};
