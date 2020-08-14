export default interface ICacheProvider {
    save(key: string, valur: string): Promise<void>;
    recover(key: string): Promise<string>;
    invalidate(key: string): Promise<void>;
}
