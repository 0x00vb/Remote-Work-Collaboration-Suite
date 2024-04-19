

exports.validateFileUpload = (file) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx', '.xls', '.xlsx'];
    const fileExtension = file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2);
  
    if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      return 'Invalid file type. Only images, PDFs, and document files are allowed.';
    }
  
    if (file.size > 5 * 1024 * 1024) {
      return 'File size exceeds the maximum limit of 5MB.';
    }
  
    return null;
  };