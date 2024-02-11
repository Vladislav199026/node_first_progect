import { EActionType } from '../enum/enum';
import EventEmitter from './eventEmitter';

export const eventEmitter = new EventEmitter();

eventEmitter.on(EActionType.ADD, (data) => {
    console.log('Add to cart:', data);
});

eventEmitter.on(EActionType.BUY, (data) => {
    console.log('Buy product:', data);
});

eventEmitter.on(EActionType.REMOVE, (data) => {
    console.log('Remove from cart:', data);
});

eventEmitter.on(EActionType.CHECKOUT, (data) => {
    console.log('Checkout:', data);
});