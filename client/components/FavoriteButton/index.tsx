'use client';

import { Article } from '@/types/learning';
import { StarIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface FavoriteButtonProps {
  color: string;
  onClickButton: any;
  size: 'sm' | 'md' | 'lg';
}

const FavoriteButton = ({
  color,
  onClickButton,
  size,
}: FavoriteButtonProps) => {
  return (
    <IconButton
      aria-label="favorite"
      onClick={onClickButton}
      size={size}
      isRound={true}
      colorScheme={color}
      icon={<StarIcon />}
    />
  );
};

export default FavoriteButton;
