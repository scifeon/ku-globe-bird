import { StringUtils } from "@scifeon/core";

export class ModalEditSamplesDataAPI {
    /**
     * Load image for the given javascript file object.
     *
     * @param file File object.
     * @returns Base64 encoded image data.
     */
    public async loadImageFile(file: File): Promise<string> {
        return new Promise(resolve => {
            const reader = new FileReader();

            reader.onloadend = async event => {
                const imageData = StringUtils.toBase64(reader.result as string, true);

                resolve(imageData);
            };

            reader.readAsBinaryString(file);
        });
    }
}
