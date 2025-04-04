import { equals } from 'rambda';
import React, {
  ClassAttributes,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import defaultImage from '../../../public/images/image.png';

type ImageProps = ClassAttributes<HTMLImageElement> &
  React.ImgHTMLAttributes<HTMLImageElement> & {
    defaultSrc?: string;
  };

const ImageComponent = ({
  alt,
  src,
  defaultSrc,
  style,
  ...props
}: ImageProps) => {
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImageSrc(src || '');
  }, [src]);

  const isMounted = true;

  const onLoadImageError = useCallback(() => {
    if (defaultSrc && isMounted) {
      setImageSrc(defaultSrc);
    }
  }, [defaultSrc, isMounted]);

  const onLoadStart = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <img
        alt={alt}
        src={imageSrc}
        onError={onLoadImageError}
        onLoad={onLoadStart}
        style={{
          display: 'block',
          ...style,
        }}
        {...props}
      />
      {loading && (
        <img
          {...props}
          // @ts-ignore
          alt={`${alt + 1}`}
          src={defaultImage.src}
          style={{
            position: 'absolute',
            height: props?.height,
            width: props?.width,
          }}
        />
      )}
    </>
  );
};

export const Image = memo(ImageComponent, equals);
