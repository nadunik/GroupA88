
export default function ConverttoBase64(file){
    return new Promise((resolve, reject) => {
       const fileReader = new fileReader();
       fileReader.readAsDataURL(file);

       fileReader.onload = () => {
        resolve(fileReader.result)
       }

       fileReader.onerror = (error) =>{
        reject(error)
       }
    })
}