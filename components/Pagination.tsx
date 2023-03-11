import { MaterialIcons } from '@expo/vector-icons';
import { Button, Column, Icon, Row, Select, Text } from 'native-base';
import { FC } from 'react';

type PaginationProps = {
  itemsPerPage: number;
  page: number;
  total: number;
  onChange: (page: number) => void;
  pageOptions: number[];
  onPageOptionsChange: (option: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  onPageOptionsChange,
  total,
  page,
  pageOptions,
  itemsPerPage,
  onChange,
}) => {
  const totalPages = Math.floor(total / itemsPerPage);

  const displayValues = {
    page: page + 1,
    totalPages: totalPages + 1,
    total,
  };

  return (
    <Column space={4} justifyContent="space-around" padding={2}>
      <Row space={2} alignItems="center">
        <Text fontSize={11}>Rows per page</Text>
        <Select
          selectedValue={itemsPerPage.toString()}
          onValueChange={(itemValue) => onPageOptionsChange(parseInt(itemValue, 10))}
          width={12}
          dropdownIcon={<Icon as={MaterialIcons} name="keyboard-arrow-down" />}>
          {pageOptions.map((option) => (
            <Select.Item label={option.toString()} value={option.toString()} />
          ))}
        </Select>
        <Text fontSize={11}>
          {displayValues.page}-{displayValues.totalPages} of {displayValues.total}
        </Text>
      </Row>
      <Row space={2} justifyContent="center">
        <Button
          _pressed={{
            backgroundColor: 'gray.200',
          }}
          variant="ghost"
          size={10}
          onPress={() => onChange(0)}
          disabled={page === 1}>
          <Icon as={MaterialIcons} name="skip-previous" size={12} />
        </Button>
        <Button
          _pressed={{
            backgroundColor: 'gray.200',
          }}
          variant="ghost"
          size={10}
          onPress={() => onChange(page - 1)}
          disabled={page === 1}>
          <Icon as={MaterialIcons} name="navigate-before" size={12} />
        </Button>
        <Button
          _pressed={{
            backgroundColor: 'gray.200',
          }}
          variant="ghost"
          size={10}
          onPress={() => onChange(page + 1)}
          disabled={page === totalPages}>
          <Icon as={MaterialIcons} name="navigate-next" size={12} />
        </Button>
        <Button
          _pressed={{
            backgroundColor: 'gray.200',
          }}
          variant="ghost"
          size={10}
          onPress={() => onChange(totalPages)}
          disabled={page === totalPages}>
          <Icon as={MaterialIcons} name="skip-next" size={12} />
        </Button>
      </Row>
    </Column>
  );
};
