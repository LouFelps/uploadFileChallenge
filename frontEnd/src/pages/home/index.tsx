import { useState, useEffect, useRef } from 'react';
import { createFile, listFiles, deleteFile, downloadFile, updateFile } from '../../requests/file/FileRequest';
import type { FileData } from '../../requests/file/interface/FileData';
import './style.css';
import FileUploadSection from '../../components/FileUploadSection/FileUploadSection';
import FileTable from '../../components/FileTable/FileTable';

export default function Home() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rename, setRename] = useState<{ [id: string]: string }>({});

  const fetchFiles = async () => {
    try {
      const data = await listFiles();
      setFiles(data);
    } catch (error) {
      console.error("Erro ao listar arquivos:", error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await createFile(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchFiles();
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFile(id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Erro ao excluir arquivo:", error);
    }
  };

  const handleRename = async (id: string) => {
    const newName = rename[id];
    if (!newName) return;
    try {
      const updated = await updateFile(id, { filename: newName });
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, filename: updated.filename } : f))
      );
      setRename((prev) => ({ ...prev, [id]: '' }));
    } catch (error) {
      console.error("Erro ao renomear arquivo:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>Upload de Arquivos</h1>

        <FileUploadSection
          selectedFile={selectedFile}
          onFileChange={setSelectedFile}
          fileInputRef={fileInputRef}
          onUpload={handleUpload}
        />
        <hr />
        <h2>📁 Arquivos Enviados</h2>

        <FileTable
          files={files}
          onDelete={handleDelete}
          onRename={handleRename}
          downloadFile={downloadFile}
          rename={rename}
          setRename={setRename}
        />

      </div>
    </div>
  );
}