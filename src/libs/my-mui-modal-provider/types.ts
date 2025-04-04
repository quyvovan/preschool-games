import { ComponentType } from 'react';

export type ModalComponentProps<P> = Omit<P, 'open'>;

export interface IOptions {
  rootId?: string;
  destroyOnClose?: boolean;
}

export interface IElementProps {
  open?: boolean;
  [key: string]: any;
}

export interface IStateElement {
  component: ComponentType<any>;
  props?: IElementProps;
  options?: IOptions;
}

export interface IState {
  [id: string]: IStateElement;
}

export interface IShowModalFnOutput<P> {
  id: string;
  show: () => void;
  hide: () => void;
  update: (newProps: Partial<ModalComponentProps<P>>) => void;
  destroy: () => void;
}

export type RenderModalFn = <P extends IElementProps>(
  component: ComponentType<P>,
  props?: ModalComponentProps<P>,
  options?: IOptions
) => IShowModalFnOutput<P>;

export type ShowModalFn = RenderModalFn;

export type HideModalFn = (id: string) => void;

export type UpdateModalFn = <P extends IElementProps>(
  id: string,
  props: Partial<ModalComponentProps<P>>
) => void;

export type DestroyModalFn = (id: string) => void;

export type DestroyModalsByRootIdFn = (rootId: string) => void;

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
