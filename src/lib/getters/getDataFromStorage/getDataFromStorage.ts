import { GetDataFromStorageI, GetDataFromStorageR } from '../../../DataTypes/App/lib/getters/getDataFromStorage/GetDataFromStorage';
import { WriteDataInStorageI, WriteDataInStorageR } from '../../../DataTypes/App/lib/getters/getDataFromStorage/WriteDataInStorage';
import { EraseDataInStorageR } from '../../../DataTypes/App/lib/getters/getDataFromStorage/EraseDataInStorage';
import convertToLocalStorage from '../../converters/localStorage/convertToLocalStorage';
import convertFromLocalStorage from '../../converters/localStorage/convertFromLocalStorage';

const getDataFromStorage = <T>({ fieldName }: GetDataFromStorageI): GetDataFromStorageR<T> => {
	const _ = {
		dataInStorage: null,
		writeDataInStorage: ({ newData }: WriteDataInStorageI<T>): WriteDataInStorageR => {
			localStorage.setItem(fieldName, convertToLocalStorage(newData));
		},
		eraseDataInStorage: (): EraseDataInStorageR => {
			localStorage.removeItem(fieldName);
		},
	};

	const rawData = localStorage.getItem(fieldName);

	if (!rawData) return _;

	return {
		..._,
		dataInStorage: convertFromLocalStorage<T>(rawData),
	};
};

export default getDataFromStorage;
