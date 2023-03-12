import { Center, Spinner } from 'native-base';
import React from 'react';

export const ScreenLoader = () => {
  return (
    <Center height="90%">
      <Spinner />
    </Center>
  );
};
