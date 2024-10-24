import { atom } from "recoil";

export const AllCourseAtom = atom({
    key:"allcourses",
    default:null,
})
export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (initial value)
});
export const myCourses = atom({
    key: 'myCourses', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (initial value)
});