export interface DataInStorageI<T> {
	newData: T;
}

export interface StorageDriverI {
	fieldName: string;
}

export type StorageDriverR<T> = {
	writeDataInStorage: WriteDataInStorage<T>;
		// method that write data in storage in saved field
	eraseDataInStorage(): void;
		// method that erase all storage in saved field
	addDataInStorage: AddDataInStorage<T>;
		// pull data to the storage in saved field
	getDataInStorage: GetDataInStorage<T>;
		// get all data from storage throw JSON.parse(rawData)
};

export type WriteDataInStorage<T> = ({ newData }: DataInStorageI<T>) => void;
export type AddDataInStorage<T> = ({ newData }: DataInStorageI<T>) => void;
export type GetDataInStorage<T> = () => T | null;
