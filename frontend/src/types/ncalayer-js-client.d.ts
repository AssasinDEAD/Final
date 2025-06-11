declare module "ncalayer-js-client" {
  export class NCALayerClient {
    basicsSignCMS(basicsStorageAll: any, base64: string, basicsCMSParamsDetached: any, basicsSignerSignAny: any) {
      throw new Error("Method not implemented.");
    }
    static basicsStorageAll(basicsStorageAll: any, base64: string, basicsCMSParamsDetached: any, basicsSignerSignAny: any) {
      throw new Error("Method not implemented.");
    }
    static basicsCMSParamsDetached(basicsStorageAll: any, base64: string, basicsCMSParamsDetached: any, basicsSignerSignAny: any) {
      throw new Error("Method not implemented.");
    }
    static basicsSignerSignAny(basicsStorageAll: any, base64: string, basicsCMSParamsDetached: any, basicsSignerSignAny: any) {
      throw new Error("Method not implemented.");
    }
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getKeyInfo(): Promise<{ alias: string } | null>;
    signBase64(params: {
      base64: string;
      alias: string;
      isDetached?: boolean;
    }): Promise<string>;
  }
}
