import express from 'express';
import { transformTextToUppercase } from './transformText/transformText';
import { inputFilePath, mockDataByActionType, outputFilePath } from './mockData';
import MyEventEmitter from './onlineStore/eventEmitter';

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

transformTextToUppercase(inputFilePath, outputFilePath);

const eventEmitter = new MyEventEmitter();

eventEmitter.emit(MyEventEmitter.ADD, mockDataByActionType[MyEventEmitter.ADD]);
eventEmitter.emit(MyEventEmitter.BUY, mockDataByActionType[MyEventEmitter.BUY]);
eventEmitter.emit(MyEventEmitter.REMOVE, mockDataByActionType[MyEventEmitter.REMOVE]);
eventEmitter.emit(MyEventEmitter.CHECKOUT, mockDataByActionType[MyEventEmitter.CHECKOUT]);
