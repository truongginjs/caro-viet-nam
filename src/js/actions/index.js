// src/js/actions/index.js

import { ADD_CARO,  JUMP_STEP } from "../constants/action-types";

export const addCaro = (index) => ({ type: ADD_CARO, index });

export const jumpStep = (index) => ({ type: JUMP_STEP, index })
