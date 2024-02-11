import { EActionType } from '../enum/enum';
import { IEventData } from '../interface/interface';
import EventEmitter from './eventEmitter';

export const eventEmitter = new EventEmitter();

eventEmitter.on(EActionType.ADD, (data: IEventData) => {
    console.log('Add to cart:', data);
});

eventEmitter.on(EActionType.BUY, (data: IEventData) => {
    console.log('Buy product:', data);
});

eventEmitter.on(EActionType.REMOVE, (data: IEventData) => {
    console.log('Remove from cart:', data);
});

eventEmitter.on(EActionType.CHECKOUT, (data: IEventData) => {
    console.log('Checkout:', data);
});