import React from 'react';
import { type FileData } from '../../requests/file/interface/FileData';
import './style.css';

interface FileRowProps {
  file: FileData;
  onDelete: (id: string) => Promise<void>;
  onDownload: (token: string) => Promise<FileData>;
  onRename: (id: string) => Promise<void>;
  renameInputValue: string;
  onRenameInputChange: (value: string) => void;
}

const FileRow: React.FC<FileRowProps> = ({
  file,
  onDelete,
  onDownload,
  onRename,
  renameInputValue,
  onRenameInputChange,
}) => {
  return (
    <div className="table-row">
      <div className="table-cell">{file.filename}</div>
      <div className="table-cell">
        {Math.round((file.size || 0) / 1024)} KB
      </div>
      <div className="table-cell text-center">
        <button
          onClick={() => onDownload(file.downloadToken!)}
          className="table-button download-button"
        >
          Download
        </button>
      </div>
      <div className="table-cell text-center">
        <button
          onClick={() => onDelete(file.id!)}
          className="table-button delete-button"
        >
          Delete
        </button>
      </div>
      <div className="table-cell rename-input-cell">
        <input
          type="text"
          value={renameInputValue}
          placeholder="Novo nome"
          onChange={(e) => onRenameInputChange(e.target.value)}
          className="rename-input"
        />
        <button
          onClick={() => onRename(file.id!)}
          className="table-button rename-button"
        >
          Rename
        </button>
      </div>
    </div>
  );
};

export default FileRow;