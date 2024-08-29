import React, { createContext, useContext, useReducer, useEffect } from 'react';
import localforage from 'localforage';

// Create the context
const GlobalStateContext = createContext();

// Define the initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  OTP: '',
  MatchOtp: '', // Example OTP
};

// Define a reducer
const globalStateReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'SIGNUP':
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    case 'SET_OTP':
      return { ...state, OTP: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  // Load state from localforage on initial render
  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await localforage.getItem('localState');
        if (savedState) {
          // console.log('Loaded state from localforage:', savedState);
          dispatch({ type: 'LOAD_STATE', payload: savedState });
        } else {
          console.log('No saved state found in localforage.');
        }
      } catch (e) {
        console.error('Failed to load state from localforage:', e);
      }
    };

    loadState();
  }, []);

  // Save state to localforage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await localforage.setItem('localState', state);
        // console.log('State saved to localforage:', state);
      } catch (e) {
        console.error('Failed to save state to localforage:', e);
      }
    };

    saveState();
  }, [state]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};


// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import localforage from 'localforage';

// // Create the context
// const GlobalStateContext = createContext();

// // Define the initial state
// const initialState = {
//   isAuthenticated: true,
//   user: {
//     "address"
//       :
//       "Village DHAURAHRA post BHADAR",
//     "email"
//       :
//       "ashwanimaurya197@gmail.com",
//     "mobile"
//       :
//       "7080637366",
//     "name"
//       :
//       "Ashwani maurya",
//     "otp"
//       :
//       214510,
//     "user_id"
//       :
//       1049801
//   },
//   OTP: '',
//   MatchOtp: '', // Example OTP
// };

// // Define a reducer
// const globalStateReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, isAuthenticated: true, user: action.payload };
//     case 'SIGNUP':
//       return { ...state, isAuthenticated: true, user: action.payload };
//     case 'LOGOUT':
//       return { ...state, isAuthenticated: false, user: null };
//     case 'SET_OTP':
//       return { ...state, OTP: action.payload };
//     case 'LOAD_STATE':
//       return { ...state, ...action.payload };
//     default:
//       return state;
//   }
// };

// // Create a provider component
// export const GlobalStateProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(globalStateReducer, initialState);

//   // Load state from localforage on initial render
//   useEffect(() => {
//     const loadState = async () => {
//       try {
//         const savedState = await localforage.getItem('globalState');
//         if (savedState) {
//           console.log('Loaded state from localforage:', savedState);
//           dispatch({ type: 'LOAD_STATE', payload: savedState });
//         } else {
//           console.log('No saved state found in localforage.');
//         }
//       } catch (e) {
//         console.error('Failed to load state from localforage:', e);
//       }
//     };

//     loadState();
//   }, []);

//   // Save state to localforage whenever it changes
//   useEffect(() => {
//     const saveState = async () => {
//       try {
//         await localforage.setItem('globalState', state);
//         console.log('State saved to localforage:', state);
//       } catch (e) {
//         console.error('Failed to save state to localforage:', e);
//       }
//     };

//     saveState();
//   }, [state]);

//   return (
//     <GlobalStateContext.Provider value={{ state, dispatch }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// // Custom hook to use the global state
// export const useGlobalState = () => {
//   const context = useContext(GlobalStateContext);
//   if (context === undefined) {
//     throw new Error('useGlobalState must be used within a GlobalStateProvider');
//   }
//   return context;
// };
