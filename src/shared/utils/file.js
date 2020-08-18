import axios from "axios";

let mimeList = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".txt": "text/plain",
  ".pdf": "application/pdf"
};

export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getMimeType(extention) {
  Object.keys(mimeList).forEach(key => {
    if (key == extention) {
      return mimeList[key];
    }
  });
  return "";
}

export function downloadFile(fileId, fileName, extention) {
  axios({
    url: `/files/download?id=${fileId}`,
    method: "GET",
    responseType: "blob"
  })
    .then(
      response => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: extention })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
      },
      err => {
        console.log({ err });
      }
    )
    .catch(err => {
      console.log({ err });
    });
}
