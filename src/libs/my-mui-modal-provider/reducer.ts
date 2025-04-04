import {
  ActionMap,
  IElementProps,
  IState,
  IStateElement,
  ModalComponentProps,
} from './types';

export enum ActionType {
  Render = 'Render',
  Show = 'SHOW',
  Hide = 'HIDE',
  Update = 'UPDATE',
  Destroy = 'DESTROY',
  DestroyByRootId = 'DESTROY_BY_ROOT_ID',
  Unknown = 'UNKNOWN',
}

interface IPayload {
  [ActionType.Render]: IStateElement & {
    id: string;
  };
  [ActionType.Show]: {
    id: string;
  };
  [ActionType.Hide]: {
    id: string;
  };
  [ActionType.Hide]: {
    id: string;
  };
  [ActionType.Update]: {
    id: string;
    props: ModalComponentProps<IElementProps>;
  };
  [ActionType.Destroy]: {
    id: string;
  };
  [ActionType.DestroyByRootId]: {
    rootId: string;
  };
  [ActionType.Unknown]: undefined;
}

type Action = ActionMap<IPayload>[keyof ActionMap<IPayload>];

export const initialState: IState = {};

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case ActionType.Render: {
      const { id, component, props, options } = action.payload;

      return {
        ...state,
        [id]: {
          component,
          props: {
            ...props,
            open: false,
          },
          options,
        },
      };
    }
    case ActionType.Show: {
      const { id } = action.payload;

      if (!state[id]) {
        return state;
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          props: {
            ...state[id].props,
            open: true,
          },
        },
      };
    }
    case ActionType.Hide: {
      const { id } = action.payload;

      if (!state[id]) {
        return state;
      }

      const { options } = state[id];

      const newState = {
        ...state,
        [id]: {
          ...state[id],
          props: {
            ...state[id].props,
            open: false,
          },
        },
      };

      if (options?.destroyOnClose) {
        delete newState[id];
      }

      return newState;
    }
    case ActionType.Update: {
      const { id, props } = action.payload;

      if (!state[id]) {
        return state;
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          props: {
            ...state[id].props,
            ...props,
          },
        },
      };
    }
    case ActionType.Destroy: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    case ActionType.DestroyByRootId: {
      const { rootId } = action.payload;

      return Object.keys(state)
        .filter((key) => key.split('.')[0] !== rootId)
        .reduce<IState>(
          (acc, key) => ({
            ...acc,
            [key]: state[key],
          }),
          {}
        );
    }
    default:
      throw new Error('Unexpected action');
  }
}

export default reducer;
