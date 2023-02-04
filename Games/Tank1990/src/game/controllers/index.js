import { STATE } from '../state.js';
import { InputHandler }  from './inputHandler.js';
import { ShotCommand, FlashCommand, UpCommand, DownCommand, LeftCommand, RightCommand } from './commands.js';

export const shotCommand = new ShotCommand(new InputHandler('f'), STATE);
export const flashCommand = new FlashCommand(new InputHandler(' '), STATE);
export const upCommand = new UpCommand(new InputHandler('ArrowUp'), STATE);
export const downCommand = new DownCommand(new InputHandler('ArrowDown'), STATE);
export const leftCommand = new LeftCommand(new InputHandler('ArrowLeft'), STATE);
export const rightCommand = new RightCommand(new InputHandler('ArrowRight'), STATE);