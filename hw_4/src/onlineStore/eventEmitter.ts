type EventHandler = (data: any) => void;

class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  public on(eventName: string, handler: EventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler);
  }

  public emit(eventName: string, eventData: any): void {
    const handlers = this.events[eventName];

    if (handlers) {
      handlers.forEach(handler => {
        handler(eventData);
      });
    }
  }
}

export default EventEmitter;
