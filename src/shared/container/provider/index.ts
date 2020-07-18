import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageprovider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageprovider);
