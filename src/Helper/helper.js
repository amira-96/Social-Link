
  // دالة لعرض الصورة
   export   function handleFileInputImage(e,setImageFile,setImagePreview) {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }
