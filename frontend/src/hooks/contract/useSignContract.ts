import { useState } from "react";
import { signContract } from "../../services/contractService";
import { signBase64WithNCALayer } from "../../services/ncalayerService";
import { toast } from "react-toastify";

export const useSignContract = () => {
  const [signing, setSigning] = useState(false);

  const sign = async (id: string, fileUrl: string) => {
    try {
      setSigning(true);

      const res = await fetch(fileUrl);
      const blob = await res.blob();

      const base64 = await blobToBase64(blob);
      const signature = await signBase64WithNCALayer(base64);
      await signContract(id, signature);

      toast.success("Документ подписан!");
    } catch (err) {
      console.error("Ошибка при подписании:", err);
      toast.error("Ошибка при подписании");
    } finally {
      setSigning(false);
    }
  };

  return { sign, signing };
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (base64) resolve(base64);
      else reject("Ошибка преобразования");
    };
  });
};
