import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadInvoice } from "utils/invoiceService";

interface Props {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  onUploadSuccess?: (invoice: any) => void;
  onUploadError?: (error: any) => void;
  onUploadEnd?: () => void;
}

export function FileUpload({ onFilesSelected, onUploadSuccess, onUploadError, onUploadEnd, maxFiles = 5, accept = {
  'application/pdf': ['.pdf'],
  'image/*': ['.png', '.jpg', '.jpeg', '.gif']
} }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Update local state with selected files
    setFiles(acceptedFiles);
    setFileRejections(rejectedFiles);
    // Call the callback with the selected files
    onFilesSelected(acceptedFiles);
    
    // Automatically start upload if there are accepted files
    if (acceptedFiles.length > 0) {
      handleUpload(acceptedFiles);
    }
  }, [onFilesSelected]);
  
  const handleUpload = async (filesToUpload: File[]) => {
    if (filesToUpload.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Upload one file at a time
      // In a real application, you might want to handle multiple files
      const file = filesToUpload[0];
      
      // Set up progress tracker
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 5;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 200);
      
      // Upload the file using the invoiceService utility
      const result = await uploadInvoice(file);
      
      // Clear the progress interval
      clearInterval(progressInterval);
      
      if (result) {
        // Update progress to 100% on success
        setUploadProgress(100);
        
        // Reset files state after successful upload
        setTimeout(() => {
          setFiles([]);
          setFileRejections([]);
          setUploadProgress(0);
        }, 2000); // Clear after 2 seconds so user can see the 100%
        
        // Call the success callback with the new invoice data
        if (onUploadSuccess) {
          onUploadSuccess(result);
        }
      } else {
        // Call the error callback if no result returned
        if (onUploadError) {
          onUploadError(new Error('Échec du téléchargement. Veuillez réessayer.'));
        }
      }
    } catch (error) {
      console.error('File upload error:', error);
      // Call the error callback with the error
      if (onUploadError) {
        onUploadError(error instanceof Error ? error : new Error('Erreur lors du téléchargement'));
      }
    } finally {
      setIsUploading(false);
      if (onUploadEnd) {
        onUploadEnd();
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject, open } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    noClick: false,
    noKeyboard: false
  });

  // Format the accepted file types for display
  const acceptedFileTypes = "PDF, JPG, JPEG, PNG, GIF";

  return (
    <div className="w-full">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow-md group ${isDragActive ? 'border-[#42A5F5] bg-blue-50 scale-[1.01]' : 'border-[#42A5F5] bg-white'} ${isDragReject ? 'border-red-500 bg-red-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-all group-hover:scale-110 group-hover:bg-blue-100">
          <span role="img" aria-label="folder" className="text-4xl text-[#42A5F5] group-hover:animate-bounce">📁</span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Glissez-déposez vos factures ici</h2>
        <p className="text-gray-600 mb-2 text-center">ou cliquez pour sélectionner</p>
        <p className="text-sm text-gray-500 mb-4 text-center">Formats acceptés: {acceptedFileTypes}</p>
        {isDragReject && (
          <p className="text-sm text-red-500 font-medium mt-2">Certains fichiers ne sont pas acceptés. Vérifiez le format.</p>
        )}
        <button 
          type="button"
          onClick={open}
          disabled={isUploading}
          className={`mt-2 px-4 py-2 bg-[#42A5F5] text-white rounded-md font-medium transition-all shadow-sm hover:shadow ${isUploading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
        >
          {isUploading ? `Téléchargement... ${uploadProgress}%` : 'Parcourir les fichiers'}
        </button>
        
        {isUploading && uploadProgress > 0 && (
          <div className="w-full max-w-md mt-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#42A5F5] transition-all duration-300 ease-in-out" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-gray-500">{Math.round(uploadProgress)}%</p>
              {uploadProgress === 100 && (
                <p className="text-xs text-green-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Téléchargement terminé
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {fileRejections.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md shadow-sm">
          <p className="text-sm font-medium text-red-700 mb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Fichiers rejetés:
          </p>
          <ul className="text-sm text-red-600 space-y-1 list-disc pl-5">
            {fileRejections.map(({ file, errors }, index) => (
              <li key={index}>
                {file.name} - {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {files.length > 0 && !isUploading && (
        <div className="mt-4 w-full">
          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {files.length} fichier{files.length > 1 ? 's' : ''} sélectionné{files.length > 1 ? 's' : ''}:
          </p>
          <ul className="text-sm text-gray-600 space-y-1 bg-white rounded-md p-3 border border-gray-200 shadow-sm divide-y divide-gray-100">
            {files.map((file, index) => (
              <li key={index} className="flex items-center py-2 first:pt-0 last:pb-0">
                <span className="mr-2">
                  {file.type.includes('pdf') ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}