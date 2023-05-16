import { createSlice } from "@reduxjs/toolkit";

import { EnderecoType } from "../../Types";

let data: EnderecoType = {};

const slice = createSlice({
  name: 'Endereco',
  initialState: { data },
  reducers: {
    setEndereco(state, action) {
      state.data = {...action.payload};
    }
  }
});

export const { setEndereco } = slice.actions;
export default slice.reducer;