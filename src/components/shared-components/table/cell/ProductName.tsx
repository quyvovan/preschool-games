import {
  Box,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { memo } from 'react';
import { TLanguages } from '@/types';

interface IProductNameProps {
  primaryLanguage: TLanguages;
  secondaryLanguage: TLanguages | null;
  productName: string;
  productNameSecondary?: string;
  sx?: SxProps<Theme>;
  onlyViLanguage?: boolean;
  extendData?: {
    productImage?: string;
  };
}

const Flag = ({ language }: { language: TLanguages }) => {
  return (
    <Image
      src={`/country/${language}.svg`}
      width={24}
      height={16}
      alt={language}
    />
  );
};

const ProductName = (props: IProductNameProps) => {
  const {
    primaryLanguage,
    secondaryLanguage,
    productName,
    productNameSecondary,
    extendData,
    sx,
    onlyViLanguage,
  } = props;

  const mergedSx: SxProps<Theme> = {
    py: 4,
    ...sx,
  };

  const theme = useTheme();

  const hasSecondaryLanguage = !!secondaryLanguage;

  return (
    <Box sx={mergedSx}>
      <Stack direction="row" gap={2} alignItems="center">
        {extendData?.productImage && (
          <Box
            width={theme.spacing(10)}
            height={theme.spacing(10)}
            sx={{
              position: 'relative',
              '& .product-img': {
                borderRadius: theme.spacing(1.5),
                display: 'block',
                objectFit: 'cover',
              },
            }}
          >
            <Image
              className="product-img"
              src={extendData?.productImage}
              alt=""
              width={40}
              height={40}
              objectFit="contain"
            />
          </Box>
        )}
        <Stack flex={1} gap={hasSecondaryLanguage ? 0.5 : 0}>
          <Stack
            direction="row"
            gap={1}
            alignItems="center"
            minWidth={theme.spacing(6)}
          >
            {hasSecondaryLanguage && (
              <Box
                sx={{
                  width: theme.spacing(6),
                  lineHeight: theme.spacing(1),
                  '& img': {
                    display: 'block',
                  },
                }}
              >
                <Flag language={primaryLanguage} />
              </Box>
            )}

            <Typography
              color={theme.palette.customColors.tableText}
              fontWeight={600}
              className="product-name-primary"
              minWidth={0}
              flex={1}
            >
              {productName}
            </Typography>
          </Stack>

          {hasSecondaryLanguage && !onlyViLanguage && (
            <Stack direction="row" gap={1} alignItems="center">
              <Box
                sx={{
                  width: theme.spacing(6),
                  lineHeight: theme.spacing(1),
                  '& img': {
                    display: 'block',
                  },
                }}
              >
                <Flag language={secondaryLanguage} />
              </Box>
              <Typography
                color={theme.palette.customColors.tableText}
                fontWeight={600}
                className="product-name-secondary"
                minWidth={0}
                flex={1}
              >
                {productNameSecondary || '-'}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default memo(ProductName);
