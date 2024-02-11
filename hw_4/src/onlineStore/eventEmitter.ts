import { IEventData } from '../interface/interface';

type EventHandler = (data: IEventData) => void;

class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  public on(eventName: string, handler: EventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler);
  }

  public emit(eventName: string, eventData: IEventData): void {
    const handlers = this.events[eventName];

    if (handlers) {
      handlers.forEach(handler => {
        handler(eventData);
      });
    }
  }
}

export default EventEmitter;
