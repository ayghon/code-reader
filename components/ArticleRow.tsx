import { IStackProps, Row } from 'native-base';
import React, { FC } from 'react';

import { ArticleLabelCell } from './article-list/ArticleLabelCell';
import { ArticlePriceCell } from './article-list/ArticlePriceCell';

type ArticleRowProps = IStackProps & {
  label: string;
  price: number;
  id: string;
};

export const ArticleRow: FC<ArticleRowProps> = ({
  label,
  price,
  id,
  ...rest
}) => {
  return (
    <Row {...rest}>
      <ArticleLabelCell label={label} id={id} />
      <ArticlePriceCell price={price} id={id} />
    </Row>
  );
};
