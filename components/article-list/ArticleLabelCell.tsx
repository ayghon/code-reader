import { Flex, Text } from 'native-base';
import React, { FC } from 'react';

type ArticleLabelCellProps = {
  label: string;
  id: string;
};

export const ArticleLabelCell: FC<ArticleLabelCellProps> = ({ label, id }) => {
  return (
    <Flex direction="row" width="65%" alignItems="center">
      <Text>{label}</Text>
      <Text fontSize={11} color="text.400" marginLeft={2}>
        {id}
      </Text>
    </Flex>
  );
};
