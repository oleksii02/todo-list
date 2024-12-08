import React, { FC } from 'react';
import { Button } from '@nextui-org/button';
import { EscapeIcon } from '@/shared/ui/Icon';

interface Props {
  onPress: () => void;
}

export const ButtonClose: FC<Props> = ({ onPress }) => {
  return (
    <Button
      isIconOnly
      color="primary"
      variant="bordered"
      className="absolute right-2 top-2 h-6 w-6 !min-w-6 rounded-lg"
      onPress={onPress}
    >
      <EscapeIcon coror="pramery" width={20} height={20}/>
    </Button>
  );
};
