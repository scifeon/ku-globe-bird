import { ReadStream } from "fs";
import { Base64 } from "js-base64";

export default class ModalEditSamplesDataAPI {
    public async loadImageFile(file: File): Promise<Base64> {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onloadend = async event => {
                const imageData = Base64.btoa(reader.result);

                resolve(imageData);
            }

            reader.readAsBinaryString(file);
        });
    }
}
