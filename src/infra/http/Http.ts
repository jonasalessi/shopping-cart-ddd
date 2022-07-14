export default interface Http {
  listen(port: number): Promise<void>;
  route(method: string, url: string, callback: any): Http;
}
