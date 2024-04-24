import { FileLoader } from '@ckeditor/ckeditor5-upload';

class UploadAdapter {
  loader: FileLoader;
  xhr: XMLHttpRequest | null = null;

  constructor(loader: FileLoader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return new Promise<{ default: string }>((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject);
      this._sendRequest();
    });
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open(
      'POST',
      'https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b',
      true
    );
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(
    resolve: (value: { default: string }) => void,
    reject: (reason?: any) => void
  ) {
    const xhr = this.xhr!;
    const loader = this.loader;
    const genericErrorText =
      "Couldn't upload file:" + ` ${loader.file.then((file) => file?.name)}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest() {
    this.loader.file.then((file: File | null) => {
      if (file) {
        const data = new FormData();
        data.append('image', file); // Change "upload" to "image"

        this.xhr!.send(data);
      }
    });
  }
}

function uploadAdapter(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader);
  };
}

export default uploadAdapter;
