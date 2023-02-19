import { createSlice } from '@reduxjs/toolkit';
import { NameSpaceStore } from 'src/constant';
import { ControlElement } from 'src/types/state';

const initialState: ControlElement = {
  cost: true,
  rating: false,
  date: false,
  asc: true,
  desc: false,
  from: '',
  to: '',
  acoustic: false,
  electric: false,
  ukulele: false,
  four: false,
  six: false,
  seven: false,
  twelve: false
};

export const controlElement = createSlice({
  name: NameSpaceStore.ControlElement,
  initialState,
  reducers: {
    changeCost(state) {
      state.cost = !state.cost;
      state.date = false;
      state.rating = false;
    },
    changeRating(state) {
      state.rating = !state.rating;
      state.date = false;
      state.cost = false
    },
    changeDate(state) {
      state.date = !state.date;
      state.cost = false;
      state.rating = false;
    },
    changeAsc(state) {
      state.asc = !state.asc;
    },
    changeDesc(state) {
      state.desc = !state.desc;
    },
    changeFrom(state, action) {
      state.from = action.payload;
    },
    changeTo(state, action) {
      state.to = action.payload;
    },
    changeAcoustic(state) {
      state.acoustic = !state.acoustic;
    },
    changeElectric(state) {
      state.electric = !state.electric;
    },
    changeUkulele(state) {
      state.ukulele = !state.ukulele;
    },
    changeFour(state) {
      state.four = !state.four;
    },
    changeSix(state) {
      state.six = !state.six;
    },
    changeSeven(state) {
      state.seven = !state.seven;
    },
    changeTwelve(state) {
      state.twelve = !state.twelve;
    },
    setInitial(state) {
      state.cost = true;
      state.rating = false;
      state.date = false;
      state.asc = true;
      state.desc = false;
      state.from = '';
      state.to = '';
      state.acoustic = false;
      state.electric = false;
      state.ukulele = false;
      state.four = false;
      state.six = false;
      state.seven = false;
      state.twelve = false;
    },
  },
});

export const {
  changeCost,
  changeRating,
  changeDate,
  changeAsc,
  changeDesc,
  changeFrom,
  changeTo,
  changeAcoustic,
  changeElectric,
  changeUkulele,
  changeFour,
  changeSix,
  changeSeven,
  changeTwelve,
  setInitial
} = controlElement.actions;
