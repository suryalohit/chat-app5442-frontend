export const initialState = {
    user: null,
    room:null,
    roomlist:[],
    start:null
  };
  
  export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ROOM:"SET_ROOM",
    ADD_ROOM_TO_ROOMLIST:"ADD_ROOM_TO_ROOMLIST",
    START:"START"
  };
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user,
        };
        case actionTypes.SET_ROOM:
        return {
          ...state,
          room: action.room,
        };
        case actionTypes.START:
        return {
          ...state,
          start: action.start,
        };
        case actionTypes.ADD_ROOM_TO_ROOMLIST:
          return {
            ...state,
            roomlist: state.roomlist.concat(action.roomlist),
         
          };
    
      default:
        return state;
    }
  };
  
  export default reducer;
  