import React, { type RefObject } from 'react';
import './style.css';

interface FileUploadSectionProps {
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onUpload: () => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  selectedFile,
  onFileChange,
  fileInputRef,
  onUpload,
}) => {
  return (
    <div className="upload-section">
      <input
        id="file-upload"
        ref={fileInputRef}
        type="file"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="hidden-file-input"
      />

      <label htmlFor="file-upload" className="custom-file-upload-button">
        📂 Escolher Arquivo
      </label>

      {selectedFile ? (
        <span className="selected-file-name">{selectedFile.name}</span>
      ) : (
        <span className="selected-file-name placeholder">Nenhum arquivo escolhido</span>
      )}

      <button
        onClick={onUpload}
        disabled={!selectedFile}
        className="action-button upload-button"
      >
        ⬆️ Enviar Arquivo
      </button>
    </div>
  );
};

export default FileUploadSection;