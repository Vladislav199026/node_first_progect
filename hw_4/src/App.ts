import express from 'express';
import { transformTextToUppercase } from './transformText/transformText';
import { inputFilePath, mockDataByActionType, outputFilePath } from './mockData';
import { eventEmitter } from './onlineStore/subscriber';
import { EActionType } from './enum/enum';

const app = express();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

transformTextToUppercase(inputFilePath, outputFilePath);

eventEmitter.emit(EActionType.ADD, mockDataByActionType[EActionType.ADD]);
eventEmitter.emit(EActionType.BUY, mockDataByActionType[EActionType.BUY]);
eventEmitter.emit(EActionType.REMOVE, mockDataByActionType[EActionType.REMOVE]);
eventEmitter.emit(EActionType.CHECKOUT, mockDataByActionType[EActionType.CHECKOUT]);
