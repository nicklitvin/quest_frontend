import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import { PreloadedState, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { data_store, preferences } from "../Store";

// describe("test", () => {
//     it("sd", () => {
//         const tree : any = renderer.create(<App/>).toJSON();
//         console.log(tree.children[0].children);
//         expect(2 + 2).toEqual(4);
//     })
// })