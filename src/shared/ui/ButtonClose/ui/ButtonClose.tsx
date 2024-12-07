import React, { FC } from 'react';
import { Button } from '@nextui-org/button';

interface Props {
  onPress: () => void;
}

export const ButtonClose: FC<Props> = ({ onPress }) => {
  return (
    <Button
      isIconOnly
      color="primary"
      variant="bordered"
      className="absolute right-2 top-2 h-6 w-6 !min-w-6"
      onPress={onPress}
    >
      ✕
    </Button>
  );
};
