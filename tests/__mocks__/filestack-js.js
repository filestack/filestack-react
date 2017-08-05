const mockPickResult = [
  {
    filename: "186813-background-1600x1200.jpg",
    handle: "qMV4yBGRSiTL7mM1UzlA",
    mimetype: "image/jpeg",
    originalPath: "186813-background-1600x1200.jpg",
    size: 39770,
    source: "local_file_system",
    url: "https://cdn.filestackcontent.com/qMV4yBGRSiTL7mM1UzlA",
    originalFile: {
      name: "186813-background-1600x1200.jpg",
      customName: "186813-background-1600x1200.jpg"
    },
    status: "Stored",
    key: "eak4Dsq9QCi9s7SOKV1A_186813-background-1600x1200.jpg",
    container: "filestack-website-uploads",
  },
];
const mockMetadaResult = {
  mimetype: "image/jpeg",
  uploaded: 1432816978028.804,
  container: "fp-documentation-assets",
  writeable: true,
  filename: "phone.jpg",
  location: "S3",
  key: "9fKltFQHQ36VIjkM5WKt_phone.jpg",
  path: "9fKltFQHQ36VIjkM5WKt_phone.jpg",
  size:150870,
};
const mockStoreUrlResult = {
  container: "filestack-website-uploads",
  url: "https://cdn.filestackcontent.com/HYXDljGcRF29T1dCDzNw",
  filename: "NY_199_E_of_Hammertown_2014.jpg",
  key: "05EgGeDsRUaDA01ApKk9_NY_199_E_of_Hammertown_2014.jpg",
  type: "image/jpeg",
  size: 1033409,
  handle: "HYXDljGcRF29T1dCDzNw",
};
const mockRetrieveResult = {
  mimetype: "text/html",
  uploaded: 1475978840682.282,
  container: "fp-documentation-assets",
  writeable: true,
  filename: "filestack.html",
  location: "S3",
  key: "r8GXa5EDTUCFW1FLdWzL_filestack.html",
  path: "r8GXa5EDTUCFW1FLdWzL_filestack.html",
  size: 251220,
};
const mockTransformResult = 'https://process.filestackapi.com/A1nL8omiAR8W7pHi3cotzz/crop=dim:[600,900,600,600]/vignette=amount:50,blurmode:gaussian/https://d1wtqaffaaj63z.cloudfront.net/images/NY_199_E_of_Hammertown_2014.jpg';
const mockUploadResult = {
  handle: "KL0OM5j9SGuebGJvYC2V",
  url: "https://cdn.filestackcontent.com/KL0OM5j9SGuebGJvYC2V",
  filename: "canva-photo-editor.png",
  size: 1241507,
  mimetype: "image/png",
  key: "ZyiZsSPyTaU9wlwxaAoj_canva-photo-editor.png",
  container: "filestack-website-uploads",
  status: "Stored",
};


const filestack = {
  init: (apikey, security) => {
    return {
      pick: (options)  => {
        return new Promise((resolve, reject) => {
          if(options.wrong) {
            reject('wrong options property');
          }

          resolve(mockPickResult);
        });
      },
      metadata: (handle, options) => {
        return new Promise((resolve, reject) => {
           resolve(mockMetadaResult);
        });
      },
      remove: (handle, security) => {
        return new Promise((resolve, reject) => {
           resolve('removed');
        });
      },
      storeURL: (url, options) => {
        return new Promise((resolve, reject) => {
           resolve(mockStoreUrlResult);
        });
      },
      retrieve: (handle, options) => {
        return new Promise((resolve, reject) => {
           resolve(mockRetrieveResult);
        });
      },
      transform: (url, options) => {
        if (options.wrong) throw 'Error';
        return mockTransformResult;
      },
      upload: (file, options) => {
        return new Promise((resolve, reject) => {
           resolve(mockUploadResult);
        });
      },
    };
  },
};

export default filestack;
