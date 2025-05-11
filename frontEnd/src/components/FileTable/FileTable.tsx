import React from 'react';
import { type FileData } from '../../requests/file/interface/FileData';
import FileRow from '../FileRow/FileRow';
import './style.css';

interface FileTableProps {
  files: FileData[];
  onDelete: (id: string) => Promise<void>;
  onRename: (id: string) => Promise<void>;
  downloadFile: (token: string) => Promise<FileData>;
  rename: { [id: string]: string };
  setRename: React.Dispatch<React.SetStateAction<{ [id: string]: string }>>;
}

const FileTable: React.FC<FileTableProps> = ({
  files,
  onDelete,
  onRename,
  downloadFile,
  rename,
  setRename,
}) => {
  if (files.length === 0) {
    return <p className="empty-state-message">Nenhum arquivo encontrado. Faça um upload para começar!</p>;
  }

  return (
    <div className="files-table">
      <div className="table-header-row">
        <div className="table-header-cell">📄 Nome</div>
        <div className="table-header-cell">📦 Tamanho</div>
        <div className="table-header-cell text-center">⬇️ Baixar</div>
        <div className="table-header-cell text-center">🗑️ Excluir</div>
        <div className="table-header-cell text-center">✏️ Renomear</div>
      </div>

      {files.map((file) => (
        <FileRow
          key={file.id}
          file={file}
          onDelete={onDelete}
          onDownload={downloadFile}
          onRename={onRename}
          renameInputValue={rename[file.id!] || ''}
          onRenameInputChange={(value) =>
            setRename((prev) => ({ ...prev, [file.id!]: value }))
          }
        />
      ))}
    </div>
  );
};

export default FileTable;