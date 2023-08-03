'use client';

import { StarIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

interface FavoriteButtonProps {
    size: 'sm' | 'md' | 'lg',
    color: boolean,
    onClickButton: any
  }

const FavoriteButton = ({ size, color, onClickButton }: FavoriteButtonProps) => {
  return (
    <IconButton aria-label='favorite'onClick={onClickButton} size={size} isRound={true} colorScheme={color ? 'blue' : 'gray'} icon={<StarIcon />} />
  );
};

export default FavoriteButton;
