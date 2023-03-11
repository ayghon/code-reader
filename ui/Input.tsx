import {
  Box,
  FormControl,
  IInputProps,
  Input as NBInput,
  WarningOutlineIcon,
} from 'native-base';
import { FC } from 'react';

export type InputProps = IInputProps & {
  label: string;
  error?: string;
};

export const Input: FC<InputProps> = ({
  error,
  label,
  isRequired,
  ...rest
}) => {
  return (
    <Box alignItems="center">
      <FormControl isRequired={isRequired} isInvalid={!!error}>
        <FormControl.Label>{label}</FormControl.Label>
        <NBInput isRequired={isRequired} isInvalid={!!error} {...rest} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
