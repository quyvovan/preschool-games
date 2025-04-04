import { rxRemoveCharacter } from './regex';
import { IProductCategory } from '@/types';
import { NextRouter } from 'next/router';

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param router
 * @param path
 */
export const handleURLQueries = (
  router: NextRouter,
  path: string | undefined
): boolean => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query);

    return (
      router.asPath.includes(path) &&
      router.asPath.includes(router.query[arr[0]] as string) &&
      path !== '/'
    );
  }

  return false;
};
export function hasChildrenItemMenu(item: any) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  return children.length !== 0;
}

export function charContainsVowel(char: string) {
  return /[aeiou]/.test(char?.toLowerCase());
}

export const secondToTime = (time: number) => {
  const data = time;
  if (time >= 60) {
    const m = Math.floor(data / 60);
    const s = data - m * 60;
    if (time % 60 === 0) {
      return `${m}:00`;
    }
    if (s < 10) {
      return `${m}:0${s}`;
    }
    return `${m}:${s}`;
  }
  if (time < 10) {
    return `00:0${time}`;
  }
  return `00:${time}`;
};
export const normalizePhoneNumber = (value: String) => {
  // return nothing if no value
  if (!value) return value;

  // only allows 0-9 inputs
  const currentValue = value.replace(/[^\d]/g, '');

  // returns: "xxx xxx xxx"
  return `${currentValue.slice(0, 3)} ${currentValue.slice(
    3,
    6
  )} ${currentValue.slice(6, 9)}`;
};

export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

// One time slot every 30 minutes.
// ex: ['00:00', '00:30', '01:00', '01:30', ...]
export const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) =>
    `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
      index % 2 === 0 ? '00' : '30'
    }`
);
export const convertToCategoriesWithLevel = (
  productCategories: IProductCategory[]
) =>
  productCategories.map((categoryList) => {
    // Category level 1
    const categories: string[] = [categoryList.name || ''];

    // Category level 2
    let childCategory = categoryList.child;
    if (childCategory?.name) {
      categories.push(childCategory.name);

      // Category level 3
      childCategory = childCategory.child;
      if (childCategory?.name) {
        categories.push(childCategory.name);
      }

      return categories.join(' > ');
    }
    return categories[0];
  }) || [];

/**
 * Format time slots to number
 * @param timeSlot - Time slot in format 'hh:mm', ex: '00:00', '00:30', '01:00', ...
 * @returns Number of hours, ex: 0, 0.5, 1, 1.5, ...
 * @example formatTimeSlotsToNumber('00:30') =>  0.5
 */

export const formatTimeSlotsToNumber = (timeSlot: string) => {
  const [hour, minute] = timeSlot.split(':');
  return Number(hour) + Number(minute) / 60;
};

export const formatQuantity = (quantity: number) =>
  quantity.toLocaleString('en-US');

export const removeRXCharacter = (text: string) => {
  return text.replace(rxRemoveCharacter, '');
};

export const isScrollToBottom = (
  scrollTop: number,
  scrollHeight: number,
  offsetHeight: number,
  offsetBottomToTrigger?: number
) => {
  return (
    scrollTop <= scrollHeight - offsetHeight &&
    scrollTop >= scrollHeight - offsetHeight - (offsetBottomToTrigger ?? 0)
  );
};
