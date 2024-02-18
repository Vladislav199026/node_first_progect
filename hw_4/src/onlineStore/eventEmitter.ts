import EventEmitter from 'events'
import { EActionType } from '../enum/enum';
import { IEventData } from '../interface/interface';
class MyEventEmitter extends EventEmitter {
  constructor() {
      super();
      this.registerHandlers();
  }

  static ADD = EActionType.ADD;
  static BUY = EActionType.BUY;
  static REMOVE = EActionType.REMOVE;
  static CHECKOUT = EActionType.CHECKOUT;

  private registerHandlers(): void {
      this.on(MyEventEmitter.ADD, (data: IEventData) => {
          console.log('Add to cart:', data);
      });

      this.on(MyEventEmitter.BUY, (data: IEventData) => {
          console.log('Buy product:', data);
      });

      this.on(MyEventEmitter.REMOVE, (data: IEventData) => {
          console.log('Remove from cart:', data);
      });

      this.on(MyEventEmitter.CHECKOUT, (data: IEventData) => {
          console.log('Checkout:', data);
      });
  }
}

export default MyEventEmitter;