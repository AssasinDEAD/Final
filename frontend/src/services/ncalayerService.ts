import { NCALayerClient } from "ncalayer-js-client";

export const signBase64WithNCALayer = async (base64: string): Promise<string> => {
  const client = new NCALayerClient();

  try {
    await client.connect();

    const signature = await client.basicsSignCMS(
      NCALayerClient.basicsStorageAll,    
      base64,                             
      NCALayerClient.basicsCMSParamsDetached,
      NCALayerClient.basicsSignerSignAny,    
    );

    return signature;
  } catch (error) {
    console.error("Ошибка при подписании:", error);
    throw error;
  }
};
