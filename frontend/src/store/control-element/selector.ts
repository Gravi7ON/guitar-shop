import { NameSpaceStore } from 'src/constant';
import { ControlElement, State } from 'src/types/state';

export const getControlElement = (state: State): ControlElement => state[NameSpaceStore.ControlElement];
