import { StorageDriverR, StorageDriverI, DataInStorageI } from './StorageDriver.D';
import convertToLocalStorage from '../../converters/localStorage/convertToLocalStorage';
import convertFromLocalStorage from '../../converters/localStorage/convertFromLocalStorage';

const storageDriver = <T extends Object | []>({ fieldName }: StorageDriverI): StorageDriverR<T> => {
	const writeDataInStorage = ({ newData }: DataInStorageI<T>): void => {
		localStorage.setItem(fieldName, convertToLocalStorage(newData));
	};

	const eraseDataInStorage = (): void => {
		localStorage.removeItem(fieldName);
	};

	const addDataInStorage = ({ newData }: DataInStorageI<T>): void => {
		const rawData = localStorage.getItem(fieldName);
		let data = null;
		if (rawData) data = convertFromLocalStorage<T>(rawData);

		if (!data) {
			writeDataInStorage({ newData });
			return;
		}

		if (typeof data !== typeof newData)
			throw new TypeError('DataTypes is not match. Try to write\n', { cause: newData });

		if (Array.isArray(newData)) {
			if (!data) data = [] as T;
			if (Array.isArray(data)) writeDataInStorage({ newData: [...data, ...newData] as T });
			return;
		}

		if (typeof newData === 'object') {
			if (!data) data = {} as T;
			Object.assign(data, newData);
			writeDataInStorage({ newData: data as T });
			return;
		}
	};

	const getDataInStorage = (): T | null => {
		const rawData = localStorage.getItem(fieldName);
		if (!rawData) return null;
		return convertFromLocalStorage<T>(rawData);
	};

	return { writeDataInStorage, eraseDataInStorage, getDataInStorage, addDataInStorage };
};

export default storageDriver;
