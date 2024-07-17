export const convertToWebP = (file: any) => {
    const name = file?.target?.files?.[0]?.name
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img: any = new Image();
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0);
  
          canvas.toBlob((blob: any) => {
            const convertedFile = new File([blob], `${name}-${Date.now()}.webp`, {
              type: "image/webp",
            });
            resolve(convertedFile);
          }, "image/webp");
        };
  
        img.src = reader.result;
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file.target.files[0]);
    });
  };