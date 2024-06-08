// export const setRemainingTime = (time) => ({
//     type: 'SET_REMAINING_TIME',
//     payload: time,
//   });
  
//   export const decrementTime = () => {
//     return (dispatch, getState) => {
//       const { remainingTime } = getState();
//       const newTime = remainingTime > 0 ? remainingTime - 1 : 0;
//       localStorage.setItem('remainingTime', newTime);
//       dispatch(setRemainingTime(newTime));
//     };
//   };
  