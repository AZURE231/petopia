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
      this._initRequest(resolve, reject);
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
  _initRequest(
    resolve: (value: { default: string }) => void,
    reject: (reason?: any) => void
  ) {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open(
      'POST',
      'https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b',
      true
    );
    xhr.responseType = 'json';

    xhr.onload = () => {
      const response = xhr.response;
      if (!response || response.error) {
        reject(
          response && response.error ? response.error.message : 'Upload failed'
        );
      } else {
        resolve({
          default: response.data.url,
        });
      }
    };

    xhr.onerror = () => {
      reject('Upload failed');
    };
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(
    resolve: (value: { default: string }) => void,
    reject: (reason?: any) => void
  ) {
    const xhr = this.xhr!;
    const loader = this.loader;

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
