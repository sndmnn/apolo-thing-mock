import { v4 } from 'uuid';

export default class Device {
  constructor({
    type, description, room, actionHandler,
  }) {
    this.id = v4();
    this.type = type;
    this.description = description;
    this.room = room;
    this.actionHandler = actionHandler;
  }
}
