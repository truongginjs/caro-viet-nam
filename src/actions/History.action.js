import { CHANGE_SORT, JUMP_TO } from '../constants/action-types';

export const changeSort= isAscending => ({ type: CHANGE_SORT, isAscending })

export const jumpTo= step => ({ type: JUMP_TO, step })