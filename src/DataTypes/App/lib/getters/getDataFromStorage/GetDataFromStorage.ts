import { WriteDataInStorageI, WriteDataInStorageR } from './WriteDataInStorage';
import { EraseDataInStorageR } from './EraseDataInStorage';

export interface GetDataFromStorageI {
	fieldName: string;
}

export type WriteDataInStorage<T> = ({ newData }: WriteDataInStorageI<T>) => WriteDataInStorageR

export type GetDataFromStorageR<T> = {
	dataInStorage: T | null;
	writeDataInStorage: WriteDataInStorage<T>;
	eraseDataInStorage: () => EraseDataInStorageR;
};
