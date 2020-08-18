import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
    [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
    private cache: ICacheData = {};

    public async save(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cache[key];

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data);

        return parsedData;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = await this.client.keys(`${prefix}:*`);

        const pipeline = this.client.pipeline();

        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec();
    }
}
